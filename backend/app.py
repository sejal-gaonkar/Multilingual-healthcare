
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="HealthSaathi API",
    description="Multilingual Healthcare Navigator",
    version="2.0"
)

# Allow the local frontend to communicate with FastAPI.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


class HealthRequest(BaseModel):
    language: str = "en"
    question: str = Field(min_length=1, max_length=1000)


# General information only. This is not a diagnostic or
# clinically validated emergency-triage system.
GUIDANCE = {
    "fever": {
        "en": (
            "Fever can have many causes, including infections. "
            "Rest, drink fluids, and monitor your temperature and symptoms. "
            "Seek advice from a healthcare professional if the fever persists, "
            "worsens, or concerns you. Seek urgent care for severe symptoms."
        ),
        "hi": (
            "बुखार के कई कारण हो सकते हैं, जिनमें संक्रमण भी शामिल हैं। "
            "आराम करें, पर्याप्त तरल पदार्थ पिएँ और तापमान तथा लक्षणों पर "
            "ध्यान दें। बुखार बना रहे, बढ़े या चिंता हो तो स्वास्थ्य "
            "विशेषज्ञ से सलाह लें। गंभीर लक्षण होने पर तुरंत चिकित्सा सहायता लें।"
        ),
        "kn": (
            "ಜ್ವರಕ್ಕೆ ಸೋಂಕು ಸೇರಿದಂತೆ ಹಲವು ಕಾರಣಗಳಿರಬಹುದು. ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ, "
            "ಸಾಕಷ್ಟು ದ್ರವಗಳನ್ನು ಕುಡಿಯಿರಿ ಮತ್ತು ತಾಪಮಾನ ಹಾಗೂ ಲಕ್ಷಣಗಳನ್ನು ಗಮನಿಸಿ. "
            "ಜ್ವರ ಮುಂದುವರಿದರೆ, ಹೆಚ್ಚಾದರೆ ಅಥವಾ ಆತಂಕವಿದ್ದರೆ ಆರೋಗ್ಯ ತಜ್ಞರನ್ನು "
            "ಸಂಪರ್ಕಿಸಿ. ಗಂಭೀರ ಲಕ್ಷಣಗಳಿದ್ದರೆ ತಕ್ಷಣ ವೈದ್ಯಕೀಯ ಸಹಾಯ ಪಡೆಯಿರಿ."
        ),
    },
    "headache": {
        "en": (
            "Headaches can have different causes. Rest in a quiet place and "
            "drink water if you can. Seek medical advice if the headache "
            "persists or worsens. A sudden, extremely severe headache, or a "
            "headache with weakness, confusion, or difficulty speaking, "
            "requires emergency assessment."
        ),
        "hi": (
            "सिरदर्द के कई कारण हो सकते हैं। शांत जगह पर आराम करें और यदि "
            "संभव हो तो पानी पिएँ। सिरदर्द बना रहे या बढ़े तो चिकित्सकीय "
            "सलाह लें। अचानक बहुत तेज सिरदर्द या इसके साथ कमजोरी, भ्रम अथवा "
            "बोलने में कठिनाई हो तो तुरंत आपातकालीन सहायता लें।"
        ),
        "kn": (
            "ತಲೆನೋವಿಗೆ ಹಲವು ಕಾರಣಗಳಿರಬಹುದು. ಶಾಂತ ಸ್ಥಳದಲ್ಲಿ ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ "
            "ಮತ್ತು ಸಾಧ್ಯವಾದರೆ ನೀರು ಕುಡಿಯಿರಿ. ತಲೆನೋವು ಮುಂದುವರಿದರೆ ಅಥವಾ "
            "ಹೆಚ್ಚಾದರೆ ವೈದ್ಯಕೀಯ ಸಲಹೆ ಪಡೆಯಿರಿ. ಹಠಾತ್ತನೆ ತೀವ್ರ ತಲೆನೋವು ಅಥವಾ "
            "ದೌರ್ಬಲ್ಯ, ಗೊಂದಲ, ಮಾತನಾಡಲು ತೊಂದರೆ ಇದ್ದರೆ ತಕ್ಷಣ ತುರ್ತು ಸಹಾಯ ಪಡೆಯಿರಿ."
        ),
    },
    "hospital_navigation": {
        "en": (
            "To find suitable healthcare, contact a nearby hospital, clinic, "
            "or qualified healthcare professional. Confirm their services "
            "and opening hours before visiting when possible. If symptoms "
            "are severe or life-threatening, seek emergency care immediately."
        ),
        "hi": (
            "उचित स्वास्थ्य सेवा के लिए नज़दीकी अस्पताल, क्लिनिक या योग्य "
            "स्वास्थ्य विशेषज्ञ से संपर्क करें। संभव हो तो जाने से पहले "
            "सेवाओं और समय की पुष्टि करें। गंभीर या जानलेवा लक्षण होने पर "
            "तुरंत आपातकालीन चिकित्सा सहायता लें।"
        ),
        "kn": (
            "ಸೂಕ್ತ ಆರೋಗ್ಯ ಸೇವೆಗಾಗಿ ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆ, ಕ್ಲಿನಿಕ್ ಅಥವಾ ಅರ್ಹ "
            "ಆರೋಗ್ಯ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ. ಸಾಧ್ಯವಾದರೆ ಭೇಟಿ ನೀಡುವ ಮೊದಲು "
            "ಸೇವೆಗಳು ಮತ್ತು ಸಮಯವನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ. ಗಂಭೀರ ಅಥವಾ ಜೀವಕ್ಕೆ "
            "ಅಪಾಯಕಾರಿಯಾದ ಲಕ್ಷಣಗಳಿದ್ದರೆ ತಕ್ಷಣ ತುರ್ತು ವೈದ್ಯಕೀಯ ಸಹಾಯ ಪಡೆಯಿರಿ."
        ),
    },
    "general": {
        "en": (
            "I can provide general health information, but I cannot diagnose "
            "a condition. Please describe your concern more specifically, "
            "or consult a qualified healthcare professional for personal advice."
        ),
        "hi": (
            "मैं सामान्य स्वास्थ्य जानकारी दे सकता हूँ, लेकिन बीमारी का "
            "निदान नहीं कर सकता। कृपया अपनी समस्या के बारे में अधिक स्पष्ट "
            "जानकारी दें या व्यक्तिगत सलाह के लिए योग्य स्वास्थ्य विशेषज्ञ "
            "से संपर्क करें।"
        ),
        "kn": (
            "ನಾನು ಸಾಮಾನ್ಯ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ನೀಡಬಹುದು, ಆದರೆ ರೋಗನಿರ್ಣಯ "
            "ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ. ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ಇನ್ನಷ್ಟು ಸ್ಪಷ್ಟವಾಗಿ ವಿವರಿಸಿ "
            "ಅಥವಾ ವೈಯಕ್ತಿಕ ಸಲಹೆಗಾಗಿ ಅರ್ಹ ಆರೋಗ್ಯ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ."
        ),
    },
    "emergency": {
        "en": (
            "Your message mentions symptoms that may indicate a medical "
            "emergency. Contact your local emergency service or go to the "
            "nearest emergency department immediately. Do not wait for this "
            "app to assess your symptoms."
        ),
        "hi": (
            "आपके संदेश में ऐसे लक्षण हैं जो चिकित्सकीय आपातस्थिति का "
            "संकेत हो सकते हैं। तुरंत स्थानीय आपातकालीन सेवा से संपर्क करें "
            "या नज़दीकी आपातकालीन विभाग जाएँ। इस ऐप के आकलन की प्रतीक्षा न करें।"
        ),
        "kn": (
            "ನಿಮ್ಮ ಸಂದೇಶದಲ್ಲಿರುವ ಲಕ್ಷಣಗಳು ವೈದ್ಯಕೀಯ ತುರ್ತುಸ್ಥಿತಿಯನ್ನು "
            "ಸೂಚಿಸಬಹುದು. ತಕ್ಷಣ ಸ್ಥಳೀಯ ತುರ್ತು ಸೇವೆಯನ್ನು ಸಂಪರ್ಕಿಸಿ ಅಥವಾ "
            "ಹತ್ತಿರದ ತುರ್ತು ಚಿಕಿತ್ಸಾ ವಿಭಾಗಕ್ಕೆ ಹೋಗಿ. ಈ ಅಪ್ಲಿಕೇಶನ್‌ನ "
            "ಮೌಲ್ಯಮಾಪನಕ್ಕಾಗಿ ಕಾಯಬೇಡಿ."
        ),
    },
}

EMERGENCY_PHRASES = [
    "chest pain",
    "difficulty breathing",
    "shortness of breath",
    "can't breathe",
    "cannot breathe",
    "severe bleeding",
    "unconscious",
    "not responding",
    "face drooping",
    "sudden weakness",
    "सांस लेने में कठिनाई",
    "सांस नहीं आ रही",
    "सीने में दर्द",
    "बेहोश",
    "ಉಸಿರಾಡಲು ತೊಂದರೆ",
    "ಉಸಿರಾಡಲಾಗುತ್ತಿಲ್ಲ",
    "ಎದೆ ನೋವು",
    "ಪ್ರಜ್ಞೆ ತಪ್ಪಿ",
]

FEVER_WORDS = ["fever", "temperature", "बुखार", "ಜ್ವರ"]
HEADACHE_WORDS = ["headache", "head pain", "सिरदर्द", "ತಲೆನೋವು"]
NAVIGATION_WORDS = [
    "hospital", "doctor", "clinic", "healthcare service",
    "अस्पताल", "डॉक्टर", "क्लिनिक",
    "ಆಸ್ಪತ್ರೆ", "ವೈದ್ಯರು", "ಕ್ಲಿನಿಕ್",
]


def classify_question(question: str):
    text = question.casefold()

    if any(phrase in text for phrase in EMERGENCY_PHRASES):
        return "possible_emergency", "emergency"

    if any(word in text for word in FEVER_WORDS):
        return "fever", "fever"

    if any(word in text for word in HEADACHE_WORDS):
        return "headache", "headache"

    if any(word in text for word in NAVIGATION_WORDS):
        return "hospital_navigation", "hospital_navigation"

    return "general", "general"


@app.get("/")
def home():
    return {"message": "HealthSaathi API is running!"}


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/api/healthcare")
def healthcare(request: HealthRequest):
    language = request.language.lower()

    if language not in ("en", "hi", "kn"):
        language = "en"

    topic, guidance_key = classify_question(request.question)
    response = GUIDANCE[guidance_key][language]

    return {
        "language": language,
        "question": request.question,
        "topic": topic,
        "urgency": "urgent" if guidance_key == "emergency"
                   else "not_assessed",
        "response": response,
        "disclaimer": (
            "General information only. This app does not provide a "
            "medical diagnosis or replace professional medical care."
        ),
    }