const translations = {

    en: {
        heroTitle: `Healthcare,<br><span>in your language.</span>`,

        heroDescription:
            "Get simple healthcare information, understand your symptoms, and find the right healthcare service.",

        questionLabel:
            "What are you experiencing?",

        placeholder:
            "Example: I have a fever since yesterday...",

        button:
            "✨ Get Healthcare Guidance",

        responseTitle:
            "Your healthcare guidance will appear here",

        responseText:
            "Enter your health concern above to get started.",

        servicesTitle:
            "How can we help?",

        servicesDescription:
            "Access healthcare information and services in one place."
    },

    hi: {
        heroTitle: `स्वास्थ्य सेवा,<br><span>आपकी भाषा में।</span>`,

        heroDescription:
            "सरल स्वास्थ्य जानकारी प्राप्त करें, अपने लक्षणों को समझें और सही स्वास्थ्य सेवा खोजें।",

        questionLabel:
            "आपको क्या परेशानी हो रही है?",

        placeholder:
            "उदाहरण: मुझे कल से बुखार है...",

        button:
            "✨ स्वास्थ्य मार्गदर्शन प्राप्त करें",

        responseTitle:
            "आपका स्वास्थ्य मार्गदर्शन यहां दिखाई देगा",

        responseText:
            "शुरू करने के लिए ऊपर अपनी स्वास्थ्य समस्या लिखें।",

        servicesTitle:
            "हम आपकी कैसे मदद कर सकते हैं?",

        servicesDescription:
            "स्वास्थ्य जानकारी और सेवाओं को एक ही जगह पर प्राप्त करें।"
    },

    kn: {
        heroTitle: `ಆರೋಗ್ಯ ಸೇವೆ,<br><span>ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ.</span>`,

        heroDescription:
            "ಸರಳ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಿರಿ, ನಿಮ್ಮ ಲಕ್ಷಣಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ ಮತ್ತು ಸರಿಯಾದ ಆರೋಗ್ಯ ಸೇವೆಯನ್ನು ಹುಡುಕಿ.",

        questionLabel:
            "ನಿಮಗೆ ಏನು ಸಮಸ್ಯೆ ಆಗುತ್ತಿದೆ?",

        placeholder:
            "ಉದಾಹರಣೆ: ನನಗೆ ನಿನ್ನೆಂದಿನಿಂದ ಜ್ವರ ಇದೆ...",

        button:
            "✨ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ",

        responseTitle:
            "ನಿಮ್ಮ ಆರೋಗ್ಯ ಮಾರ್ಗದರ್ಶನ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ",

        responseText:
            "ಪ್ರಾರಂಭಿಸಲು ಮೇಲಿನ ಬಾಕ್ಸ್‌ನಲ್ಲಿ ನಿಮ್ಮ ಆರೋಗ್ಯ ಸಮಸ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",

        servicesTitle:
            "ನಾವು ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",

        servicesDescription:
            "ಆರೋಗ್ಯ ಮಾಹಿತಿ ಮತ್ತು ಸೇವೆಗಳನ್ನು ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ಪಡೆಯಿರಿ."
    }
};


function changeLanguage() {

    const language =
        document.getElementById("language").value;

    const text = translations[language];

    document.getElementById("hero-title").innerHTML =
        text.heroTitle;

    document.getElementById("hero-description").innerText =
        text.heroDescription;

    document.getElementById("question-label").innerText =
        text.questionLabel;

    document.getElementById("question").placeholder =
        text.placeholder;

    document.getElementById("guidance-button").innerText =
        text.button;

    document.getElementById("response-title").innerText =
        text.responseTitle;

    document.getElementById("response-text").innerText =
        text.responseText;

    document.getElementById("services-title").innerText =
        text.servicesTitle;

    document.getElementById("services-description").innerText =
        text.servicesDescription;
}


function getGuidance() {

    async function getGuidance() {

    const question =
        document.getElementById("question").value.trim();

    const language =
        document.getElementById("language").value;

    const responseTitle =
        document.getElementById("response-title");

    const responseText =
        document.getElementById("response-text");


    // Check if user entered something
    if (question === "") {

        responseTitle.innerText =
            "Please enter your health concern.";

        responseText.innerText =
            "Describe what you are experiencing so we can provide general information.";

        return;
    }


    // Show loading message
    responseTitle.innerText =
        "Analyzing your question...";

    responseText.innerText =
        "Please wait a moment.";


    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/healthcare",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    language: language,
                    question: question
                })
            }
        );


        // Convert backend response to JSON
        const data = await response.json();


        // Display backend response
        responseTitle.innerText =
            "Healthcare Guidance";

        responseText.innerText =
            data.response;


    } catch (error) {

        console.error(error);

        responseTitle.innerText =
            "Connection Error";

        responseText.innerText =
            "Unable to connect to the healthcare server. Please make sure the backend is running.";
    }


    // Scroll to response
    document
        .getElementById("response")
        .scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
}
}