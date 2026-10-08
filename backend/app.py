from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="HealthSaathi API",
    description="Multilingual Healthcare Navigator Backend",
    version="1.0"
)


class HealthRequest(BaseModel):
    language: str
    question: str


@app.get("/")
def home():
    return {
        "message": "HealthSaathi API is running!"
    }


@app.post("/api/healthcare")
def healthcare(request: HealthRequest):

    return {
        "language": request.language,
        "question": request.question,
        "topic": "general",
        "urgency": "normal",
        "response": "Your healthcare question has been received."
    }