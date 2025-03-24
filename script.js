// Countdown Timer
function updateCountdown() {
    const eventDate = new Date('June 7, 2025 09:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(days).padStart(2, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);

// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// FAQ Accordion
const faqs = [ 
    {
        question: "What is HackPrix?",
        answer: "HackPrix is a 36-hour hackathon where students can collaborate, innovate, and build amazing projects."
    },
    {
        question: "Who can participate?",
        answer: "Any college student with a valid ID card can participate in HackPrix 2025."
    },
    {
        question: "What's the team size?",
        answer: "Teams can have 2-4 members. Solo participation is also allowed."
    },
    {
        question:"If your question isn't listed, what's your move?",
        answer:"For assistance, reach out to us at Discord or email us at."
    },
    {
        question:"Will food & stay be provided?",
        answer:"We've got lots of food and snacks for everyone, stay hacky and hydrated.Rooms for resting/sleeping will be arranged at the Campus (separately for opposite genders)."
    }
];

const faqContainer = document.getElementById('faqContainer');
faqs.forEach((faq, index) => {
    const div = document.createElement('div');
    div.className = 'bg-red rounded-lg shadow-sm';
    div.innerHTML = `
        <button class="w-full px-6 py-4 text-left focus:outline-none" onclick="toggleFaq(${index})">
            <div class="flex justify-between items-center">
                <span class="font-semibold">${faq.question}</span>
                <i class="bi bi-chevron-down transition-transform duration-300" id="faqIcon${index}"></i>
            </div>
        </button>
        <div class="px-6 py-4 border-t hidden" id="faqAnswer${index}">
            ${faq.answer}
        </div>
    `;
    faqContainer.appendChild(div);
});

function toggleFaq(index) {
    const answer = document.getElementById(`faqAnswer${index}`);
    const icon = document.getElementById(`faqIcon${index}`);
    answer.classList.toggle('hidden');
    icon.style.transform = answer.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
}

// Chat Bot
let chatOpen = false;

function toggleChat() {
    const chatBot = document.getElementById('chatBot');
    chatOpen = !chatOpen;
    chatBot.style.display = chatOpen ? 'block' : 'none';
}

async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage('user', message);
    userInput.value = '';

    // Call the AI endpoint
    try {
        const response = await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/ai', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer wDSwxwAAKeTUswqV9QgLFjONQ6f1',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [{
                    role: 'user',
                    content: [{
                        type: 'text',
                        text: message
                    }]
                }]
            })
        });

        const data = await response.json();
        appendMessage('bot', data.message);
    } catch (error) {
        appendMessage('bot', 'Sorry, I encountered an error. Please try again later.');
    }
}

function appendMessage(sender, message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `mb-4 ${sender === 'user' ? 'text-right' : 'text-left'}`;
    messageDiv.innerHTML = `
        <div class="${sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100'} inline-block px-4 py-2 rounded-lg max-w-[80%]">
            ${message}
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// // Initialize the page
// updateCountdown();
 

// document.addEventListener("DOMContentLoaded", function () {
//     let slides = document.querySelectorAll(".slide");
//     let index = 0;

//     function showSlide() {
//         slides.forEach((slide, i) => {
//             slide.style.opacity = i === index ? "1" : "0";
//         });
//         index = (index + 1) % slides.length;
//     }

//     setInterval(showSlide, 3000);
// });
