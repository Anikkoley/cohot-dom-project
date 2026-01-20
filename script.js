// let allTask = [];

// if (localStorage.getItem('allTask')) {
//     allTask = JSON.parse(localStorage.getItem('allTask'))
// } else {
//     console.log('Task list is Empty');
// }
const STORAGE_KEY = "allTask";

let allTask = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function addTask(task, details = "") {
    if (!task.trim()) return false;

    allTask.push({ task, details, completed: false });

    localStorage.setItem('allTask', JSON.stringify(allTask));
    renderTask();
    return true;
}


// console.log(local);



const card = document.querySelectorAll('.card');
const fullpage = document.querySelectorAll('.fullElem');
const backbtn = document.querySelectorAll('.fullElem .back');

// console.log(card);



card.forEach((elm) => {
    elm.addEventListener('click', function () {

        // console.log(fullpage ,[elm.id]);
        fullpage[elm.id].style.display = "block"

    })
})

backbtn.forEach((back) => {
    back.addEventListener('click', function () {
        // console.log(back.id);
        fullpage[back.id].style.display = 'none'

    })
})

const addTaskForm = document.querySelector('.left-side form');
const taskInput = document.querySelector('.left-side form input');
const taskDescription = document.querySelector('.left-side form textarea')
const msgBubble = document.querySelector('.right-inner')



addTaskForm.addEventListener('submit', function (elm) {
    elm.preventDefault()
    allTask.push({ task: taskInput.value, details: taskDescription.value })


    localStorage.setItem('allTask', JSON.stringify(allTask))

    taskInput.value = ''
    taskDescription.value = ''
    renderTask();
})


function renderTask() {

    let sum = ''
    allTask.forEach((elm) => {
        sum += `<div class="msg-bubble">
                            <div class="col-1">
                                <h3>${elm.task}</h3>
                                <p>${elm.details}</p>
                            </div>
                            <div class="col-2">
                                <button type="button" class="cmplt-btn">Mark as complete</button>
                            </div>
                        </div>`

    })

    msgBubble.innerHTML = sum;

    document.querySelectorAll('.cmplt-btn').forEach((btn, idx) => {
        btn.addEventListener('click', function () {
            // const index = this.dataset.index;
            allTask.splice(idx, 1)

            localStorage.setItem('allTask', JSON.stringify(allTask))
            renderTask()
        })
    })


}
renderTask();



const tarik = document.querySelector('#date');
const time = document.querySelector('#time');
const country = document.querySelector('#country');

const temparture = document.querySelector('.temparture')
const weather = document.querySelector('.weather-condition')
const precipitation = document.querySelector('.precipitation')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')


const APIKEY = '1d8b7fda039b4d1a967164532252512'

const city = 'kolkata'


async function callAPI() {
    let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${city}`)

    let value = await response.json();

    // console.log(value);

    temparture.innerHTML = `${value.current.temp_c}°C`
    weather.innerHTML = `${value.current.condition.text}`
    precipitation.innerHTML = `Precipitation : ${value.current.precip_mm} mm`
    humidity.innerHTML = `Humidity : ${value.current.humidity} %`
    wind.innerHTML = `Wind : ${value.current.wind_kph} km/h`
    country.innerHTML = `${value.location.name}`

}

callAPI()


let datex = null
function timedate() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsofYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    datex = new Date()
    dayOfIndex = daysOfWeek[datex.getDay()];
    monthOfIndex = monthsofYear[datex.getMonth()]
    yearIndex = datex.getFullYear()
    getHours = datex.getHours()
    getMintues = datex.getMinutes()
    getSeconds = datex.getSeconds()
    getDatex = datex.getDate()
    getMonth = datex.getMonth()
    // getx = datex.
    // console.log(dayOfIndex);

    // time.innerHTML = `${dayOfIndex} , ${getHours} : ${getMintues} : ${getSeconds} `
    let ampm;
    let displayHour;

    if (getHours >= 12) {
        ampm = 'PM';
        displayHour = getHours % 12 || 12;
    } else {
        ampm = 'AM';
        displayHour = getHours % 12 || 12;
    }

    time.innerHTML = `${dayOfIndex}, ${String(getHours).padStart('2', '0')}:${String(getMintues).padStart('2', '0')}:${String(getSeconds).padStart('2', '0')} ${ampm}`;

    tarik.innerHTML = `${getDatex} ${monthOfIndex} ${yearIndex}`


}
setInterval(() => {
    timedate()
}, 1000);
timedate();


let chngBtn = document.querySelector('#theme-button');


let rootElement = document.documentElement
var flag = 0

chngBtn.addEventListener('click', function () {

    // rootElement.style.setProperty('--bg-color', '#5A0E24')
    // rootElement.style.setProperty('--secondary-color', '#76153C')

           if (flag == 0) {
            rootElement.style.setProperty('--bg-color', '#5A0E24')
            rootElement.style.setProperty('--secondary-color', '#76153C')
            rootElement.style.setProperty('--tri1', '#948979')
            rootElement.style.setProperty('--tri2', '#393E46')
            flag = 1
        } else if (flag == 1) {
            rootElement.style.setProperty('--bg-color', '#123458')
            rootElement.style.setProperty('--secondary-color', '#032a4f')
            rootElement.style.setProperty('--tri1', '#D4C9BE')
            rootElement.style.setProperty('--tri2', '#123458')
            flag = 2
        } else if (flag == 2) {
            rootElement.style.setProperty('--bg-color', '#F8F4E1')
            rootElement.style.setProperty('--secondary-color', '#381c0a')
            rootElement.style.setProperty('--tri1', '#FEBA17')
            rootElement.style.setProperty('--tri2', '#74512D')
            flag = 0
        }
})

function dailyPlanner() {
    var dayPlanner = document.querySelector('.day-planner')

    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

    var hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)


    var wholeDaySum = ''
    hours.forEach(function (elem, idx) {

        var savedData = dayPlanData[idx] || ''

        wholeDaySum = wholeDaySum + `<div class="day-planner-time">
    <p>${elem}</p>
    <input id=${idx} type="text" placeholder="..." value=${savedData}>
</div>`
    })

    dayPlanner.innerHTML = wholeDaySum


    var dayPlannerInput = document.querySelectorAll('.day-planner input')

    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            console.log('hello');
            dayPlanData[elem.id] = elem.value

            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    })
}

dailyPlanner()




function motivationalQuote() {
    var motivationQuoteContent = document.querySelector('.quote p')
    var motivationAuthor = document.querySelector('.quote h3')

    async function fetchQuote() {
        let response = await fetch('https://api.allorigins.win/get?url=https://zenquotes.io/api/random')
        let data = await response.json()
        // const jsonData = JSON.parse(data.contents)

        // motivationQuoteContent.innerHTML = jsonData[0].q
        // motivationAuthor.innerHTML = jsonData[0].a
        //    console.log(data);

    }

    fetchQuote()
}

motivationalQuote()


// pomodoro timer


function pomodoroTimer() {


    let timer = document.querySelector('.pomo-timer h1')
    var startBtn = document.querySelector('.pomo-timer .start-timer')
    var pauseBtn = document.querySelector('.pomo-timer .pause-timer')
    var resetBtn = document.querySelector('.pomo-timer .reset-timer')
    var session = document.querySelector('.pomodoro-fullpage .session')
    var isWorkSession = true

    let totalSeconds = 25 * 60
    let timerInterval = null

    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = totalSeconds % 60

        timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
    }

    function startTimer() {
        clearInterval(timerInterval)

        if (isWorkSession) {

            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    isWorkSession = false
                    clearInterval(timerInterval)
                    timer.innerHTML = '05:00'
                    session.innerHTML = 'Take a Break'
                    session.style.backgroundColor = 'var(--blue)'
                    totalSeconds = 5 * 60
                }
            }, 10)
        } else {


            timerInterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    isWorkSession = true
                    clearInterval(timerInterval)
                    timer.innerHTML = '25:00'
                    session.innerHTML = 'Work Session'
                    session.style.backgroundColor = 'var(--green)'
                    totalSeconds = 25 * 60
                }
            }, 10)
        }

    }

    function pauseTimer() {
        clearInterval(timerInterval)
    }
    function resetTimer() {
        totalSeconds = 25 * 60
        clearInterval(timerInterval)
        updateTimer()

    }
    startBtn.addEventListener('click', startTimer)
    pauseBtn.addEventListener('click', pauseTimer)
    resetBtn.addEventListener('click', resetTimer)



}

pomodoroTimer()






// chatbot intrigation


const chatToggle = document.getElementById("chatToggle");
const welcomeModal = document.getElementById("welcomeModal");
const chatbotModal = document.getElementById("chatbotModal");
const startChatButton = document.getElementById("startChatButton");
const darkModeToggle = document.getElementById("darkModeToggle");
const chatClose = document.getElementById('minimizeChat')

function chatOpenClose() {

    chatbotModal.style.display = "none";

    chatToggle.addEventListener("click", () => {
        chatbotModal.style.display = "block";
    })

    chatToggle.addEventListener("dblclick", () => {
        chatbotModal.style.display = "none";
        //   chatVisible = false;
    })
    chatClose.addEventListener("click", () => {
        chatbotModal.style.display = "none";
        // chatVisible = false;
    });

}
chatOpenClose();


function modechng() {

    const html = document.documentElement;

    darkModeToggle.addEventListener("click", function () {
        html.classList.toggle("dark");
        if (html.classList.contains("dark")) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem("theme", "dark");
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem("theme", "light");
        }
    });

}
modechng()

//chat functionality//


const chatWindow = document.getElementById("chatWindow");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
const quickReplies = document.getElementById("quickReplies");



function addMessage(text, isUser) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");

    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    scrollToTopBtn.addEventListener("click", () => {
        chatWindow.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });


    if (isUser) {
        messageDiv.classList.add("message-user");

        messageDiv.innerHTML = `
      <div class="message-bubble-user">
        <p>${text}</p>
        <div class="message-meta message-meta-user">
          <span class="time">${getCurrentTime()}</span>
          <i class="fas fa-check-double delivered"></i>
        </div>
      </div>

      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGWm7kgMH1PEsycRwkyqPcPB1b2NITpD8j2g&s"
        alt="User avatar"
        class="avatar"
      />
    `;
    } else {
        messageDiv.classList.add("message-bot");

        messageDiv.innerHTML = `
      <img
        src="https://www.shutterstock.com/image-vector/chat-bot-ai-customer-service-600nw-1713744196.jpg"
        alt="Bot avatar"
        class="avatar"
      />

      <div class="message-bubble-bot">
        <p>${text}</p>
        <div class="message-meta">
          <span class="time">${getCurrentTime()}</span>
          <i class="fas fa-check delivered"></i>
        </div>
      </div>
    `;
    }

    chatWindow.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.classList.add("visible");
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 10);
}

function showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("message", "typing-message");

    typingDiv.innerHTML = `
    <div class="typing-indicator">
      <div class="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;

    chatWindow.appendChild(typingDiv);

    setTimeout(() => {
        typingDiv.classList.add("visible");
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 10);

    return typingDiv;
}

function removeTypingIndicator(indicator) {
    indicator.classList.remove("visible");

    setTimeout(() => {
        indicator.remove();
    }, 300);
}


// Sample chatbot replies
const greetings = [
    "hello",
    "hi",
    "hlw",
    "hey",
    "whatsapp",
    "what's up",
    "whats up",
    "good morning",
    "goodmorning"
];

function getBotReply(message) {
    message = message.toLowerCase();

    if (greetings.some(greet => message.includes(greet))) {
        return "Hello! How can I help you today? 😊";
    }

    if (message.includes("price") || message.includes("cost")) {
        return "Our pricing depends on the service. Can you tell me what you're looking for?";
    }

    if (message.includes("contact")) {
        return "You can contact us via email or phone. Would you like the details?";
    }

    // 👉 Todo task intent
    if (
        message.includes("add task") ||
        message.includes("todo") ||
        message.includes("to-do") ||
        message.includes("task in my todo")
    ) {
        return "Yes, of course! 😊 Please tell me the task you want to add.";
    }

    if (message.includes("thank")) {
        return "You're welcome! 😊";
    }

    return "I'm not sure I understood that. Can you explain a bit more?";
}


//todo list command handler

function handleChatCommand(message) {
    const msg = message.toLowerCase();

    if (msg.startsWith("add task") || msg.startsWith("todo") || msg.startsWith("task")) {
        const taskText = message
            .replace(/add task|todo|task/i, "")
            .trim();

        if (!taskText) return "❗ Please provide a task name.";

        addTask(taskText);
        return `✅ Task added: "${taskText}"`;
    }

    return null;
}

function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Show user message
    addMessage(message, true);
    userInput.value = "";

    // Show typing indicator
    const typingIndicator = showTypingIndicator();

    setTimeout(() => {
        removeTypingIndicator(typingIndicator);

        // 1️⃣ Check task command first
        const commandReply = handleChatCommand(message);
        if (commandReply) {
            addMessage(commandReply, false);
            return;
        }

        // 2️⃣ Normal chatbot reply
        const botReply = getBotReply(message);
        addMessage(botReply, false);

    }, 1500);
}


function addQuickReply(text) {
    const button = document.createElement("button");
    button.classList.add("quick-reply-btn");
    button.textContent = text;

    button.addEventListener("click", function () {
        // Show user message
        addMessage(text, true);

        // Show typing indicator
        const typingIndicator = showTypingIndicator();

        setTimeout(() => {
            removeTypingIndicator(typingIndicator);

            // 1️⃣ Check task command
            const commandReply = handleChatCommand(text);
            if (commandReply) {
                addMessage(commandReply, false);
                return;
            }

            // 2️⃣ Normal bot reply fallback
            const reply = getBotReply(text);
            addMessage(reply, false);

        }, 800);
    });

    quickReplies.appendChild(button);
}

[
    "add task Buy groceries",
    "add task Finish portfolio website",
    "add task Fix header responsiveness",
    "add task Call client",
    
].forEach(text => addQuickReply(text));

// Event listeners
sendButton.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});
// sendMessage()