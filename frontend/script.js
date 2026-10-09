
const translations = {
    en: {
        heroTitle: `Healthcare,<br><span>in your language.</span>`,
        heroDescription: "Get simple healthcare information, understand your symptoms, and find the right healthcare service.",
        questionLabel: "What are you experiencing?",
        placeholder: "Example: I have a fever since yesterday...",
        button: "✨ Get Healthcare Guidance",
        responseTitle: "Your healthcare guidance will appear here",
        responseText: "Enter your health concern above to get started.",
        servicesTitle: "How can we help?",
        servicesDescription: "Access healthcare information and services in one place."
    },

    hi: {
        heroTitle: `स्वास्थ्य सेवा,<br><span>आपकी भाषा में।</span>`,
        heroDescription: "सरल स्वास्थ्य जानकारी प्राप्त करें, अपने लक्षणों को समझें और सही स्वास्थ्य सेवा खोजें।",
        questionLabel: "आपको क्या परेशानी हो रही है?",
        placeholder: "उदाहरण: मुझे कल से बुखार है...",
        button: "✨ स्वास्थ्य मार्गदर्शन प्राप्त करें",
        responseTitle: "आपका स्वास्थ्य मार्गदर्शन यहाँ दिखाई देगा",
        responseText: "शुरू करने के लिए ऊपर अपनी स्वास्थ्य समस्या लिखें।",
        servicesTitle: "हम आपकी कैसे मदद कर सकते हैं?",
        servicesDescription: "स्वास्थ्य जानकारी और सेवाएँ एक ही जगह पर प्राप्त करें।"
    },

    kn: {
        heroTitle: `ಆರೋಗ್ಯ ಸೇವೆ,<br><span>ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ.</span>`,
        heroDescription: "ಸರಳ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಿರಿ, ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ ಮತ್ತು ಸೂಕ್ತ ಆರೋಗ್ಯ ಸೇವೆಯನ್ನು ಹುಡುಕಿ.",
        questionLabel: "ನಿಮಗೆ ಏನು ತೊಂದರೆಯಾಗುತ್ತಿದೆ?",
        placeholder: "ಉದಾಹರಣೆ: ನನಗೆ ನಿನ್ನೆಯಿಂದ ಜ್ವರ ಇದೆ...",
        button: "✨ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ",
        responseTitle: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶನ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ",
        responseText: "ಪ್ರಾರಂಭಿಸಲು ಮೇಲಿನ ಪೆಟ್ಟಿಗೆಯಲ್ಲಿ ನಿಮ್ಮ ಆರೋಗ್ಯ ಸಮಸ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
        servicesTitle: "ನಾವು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
        servicesDescription: "ಆರೋಗ್ಯ ಮಾಹಿತಿ ಮತ್ತು ಸೇವೆಗಳನ್ನು ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ಪಡೆಯಿರಿ."
    }
};


// Change the interface language
function changeLanguage() {
    const languageElement = document.getElementById("language");

    if (!languageElement) return;

    const language = languageElement.value;
    const text = translations[language] || translations.en;

    const setText = (id, value) => {
        const element = document.getElementById(id);
        if (element) element.innerText = value;
    };

    const setHTML = (id, value) => {
        const element = document.getElementById(id);
        if (element) element.innerHTML = value;
    };

    setHTML("hero-title", text.heroTitle);
    setText("hero-description", text.heroDescription);
    setText("question-label", text.questionLabel);

    const questionInput = document.getElementById("question");
    if (questionInput) questionInput.placeholder = text.placeholder;

    setText("guidance-button", text.button);
    setText("response-title", text.responseTitle);
    setText("response-text", text.responseText);
    setText("services-title", text.servicesTitle);
    setText("services-description", text.servicesDescription);
}


// Send the user's question to the FastAPI backend
async function getGuidance() {
    const questionInput = document.getElementById("question");
    const languageInput = document.getElementById("language");
    const responseTitle = document.getElementById("response-title");
    const responseText = document.getElementById("response-text");
    const responseSection = document.getElementById("response");
    const button = document.getElementById("guidance-button");

    if (
        !questionInput ||
        !languageInput ||
        !responseTitle ||
        !responseText ||
        !button
    ) {
        console.error("A required HTML element is missing.");
        return;
    }

    const question = questionInput.value.trim();
    const language = languageInput.value;

    if (!question) {
        responseTitle.innerText = "Please enter your health concern.";
        responseText.innerText =
            "Describe your question to receive general healthcare information.";
        return;
    }

    button.disabled = true;
    responseTitle.innerText = "Processing your question...";
    responseText.innerText = "Please wait.";

    try {
        const response = await fetch(
            "http://127.0.0.1:8000/api/healthcare",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    language: language,
                    question: question
                })
            }
        );

        if (!response.ok) {
            throw new Error(`Server returned status ${response.status}`);
        }

        const data = await response.json();

        responseTitle.innerText =
            data.topic === "possible_emergency"
                ? "Possible Emergency — Seek Immediate Help"
                : "Healthcare Guidance";

        responseText.innerText =
            data.response || "No response was returned by the server.";

    } catch (error) {
        console.error("Healthcare API error:", error);

        responseTitle.innerText = "Connection Error";
        responseText.innerText =
            "Unable to connect to the healthcare server. " +
            "Make sure FastAPI is running and open the website at " +
            "http://127.0.0.1:5500.";
    } finally {
        button.disabled = false;

        if (responseSection) {
            responseSection.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    }
}


// Voice input
function startVoiceInput() {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert(
            "Voice input is not supported in this browser. Please type your question."
        );
        return;
    }

    const languageElement = document.getElementById("language");
    const questionInput = document.getElementById("question");

    if (!languageElement || !questionInput) return;

    const recognition = new SpeechRecognition();
    const language = languageElement.value;

    recognition.lang = {
        en: "en-IN",
        hi: "hi-IN",
        kn: "kn-IN"
    }[language] || "en-IN";

    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function (event) {
        questionInput.value = event.results[0][0].transcript;
    };

    recognition.onerror = function (event) {
        console.error("Voice recognition error:", event.error);
        alert("Voice input failed. Please type your question.");
    };

    recognition.start();
}


// Initialize the interface
document.addEventListener("DOMContentLoaded", function () {
    changeLanguage();
});