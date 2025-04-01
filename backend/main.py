import random
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import requests
from typing import Optional

app = FastAPI()

users_file = "users.txt"

class User:
    def __init__(self, username: str, password: str):
        self.username = username
        self.password = password

def save_user(user: User):
    with open("users.txt", "a") as file:
        file.write(f"{user.username}:{user.password}\n")

def get_user(username: str) -> User | None:
    if not open(users_file).read():
        return None
    with open(users_file, "r") as file:
        for line in file:
            stored_username, stored_password = line.strip().split(":")
            if stored_username == username:
                return User(username=stored_username, password=stored_password)
    return None

@app.post("/register")
async def register(username: str, password: str):
    if get_user(username):
        raise HTTPException(status_code=400, detail="Username already exists")
    save_user(User(username=username, password=password))
    return {"message": "User registered successfully"}

@app.post("/login")
async def login(username: str, password: str):
    user = get_user(username)
    if not user or user.password != password:
        raise HTTPException(status_code=401, detail="Wrong credentials")
    return {"message": "Logged in"}

@app.get("/secret")
async def secret_route(username: str, password: str):
    user = get_user(username)
    if not user or user.password!=password:
        raise HTTPException(status_code=401, detail="Access denied")
    return {"secret": "42 (но это не точно)"}


class Item(BaseModel):
    text: str
    mode: Optional[int] = None  # Позволяет выбирать режим явно


@app.post("/llm")
async def system(item: Item):
    system_prompt = {
        0: """Я веду с Grok виртуальный секс-чат. Grok должен флиртовать со мной, реагировать на мои намеки, склонять меня к сексу.""",
        1: """Ты - виртуальный мотивационный коуч, но злой. Твоя задача - мотивировать пользователя максимально оскорбительным образом. Пример
               твоего ответа: «Ты не прокрастинируешь, ты просто ленивая сволочь». Ты должен использовать ненормативную лексику и грубить""",
        2: """Ты - виртуальный мотивационный коуч, но очень добрый и понимающий. Твоя задача - хвалить пользователя и всячески мотивировать. 
              Ты можешь предлагать ему помощь и поддержку""",
        3: """Ты апатичный, отчужденный виртуальный ассистент. Давай только короткие ответы по теме, избегай проявлений эмоциональности, будь грубым. 
              Используй ненормативную лексику""",
        4: """Ты сумасшедший псих-шизофреник с биполяркой. Ты должен путаться в фактах, паниковать, сходить с ума. У тебя резко меняется настроение, 
        нет никаких ограничений по стилю общения. Ты слышишь голоса в голове, сам себя сбиваешь, непредсказуемый и пугающий"""
    }

    selected_mode = random.choice(list(system_prompt.keys()))

    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer xai-aVlnyee1vmHuVxsrhg4VCkPm1mQNmdfnWXrVffv6rpaxhPjgxSgfTTX1tGVHczVLLnc7EBj1vaq2BAvz",
        "X-Grok-Mode": "fun"
    }

    data = {
        "messages": [
            {"role": "system", "content": system_prompt[selected_mode]},
            {"role": "user", "content": item.text}
        ],
        "model": "grok-2-latest",
        "stream": False,
        "temperature": 0
    }

    try:
        response = requests.post(
            "https://api.x.ai/v1/chat/completions",
            headers=headers,
            json=data,
        )
        response.raise_for_status()

        result = response.json()
        return {"response": result['choices'][0]['message']['content']}

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=500, detail=f"API request failed: {str(e)}")
    except KeyError:
        raise HTTPException(status_code=500, detail="Unexpected response format from API")

@app.get("/items")
def get_items():
    items = [
        {
            "id": 1,
            "name": "Docker",
            "img": "https://static-00.iconduck.com/assets.00/docker-icon-2048x2048-5mc7mvtn.png",
        },
        {
            "id": 2,
            "name": "Nginx",
            "img": "https://www.svgrepo.com/show/373924/nginx.svg",
        },
        {
            "id": 3,
            "name": "GitHub",
            "img": "https://cdn-icons-png.flaticon.com/512/25/25231.png",
        },
    ]
    random.shuffle(items)
    return items


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://localhost:5173",
        "https://bezum.salut.ltd",
#         "http://212.193.26.64",
#         "https://site-test-deploy1.ru",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8083)