import random
import string

from pydantic import BaseModel
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import requests
from pathlib import Path

app = FastAPI()

users_file = Path(__file__).parent / "users.wtf"

ascii_arts = [
    "\nЗАПУСКАЕМ\n░ГУСЯ░▄▀▀▀▄░РАБОТЯГИ░░\n▄███▀░◐░░░▌░░░░░░░\n░░░░▌░░░░░▐░░░░░░░\n░░░░▐░░░░░▐░░░░░░░\n░░░░▌░░░░░▐▄▄░░░░░\n░░░░▌░░░░▄▀▒▒▀▀▀▀▄\n░░░▐░░░░▐▒▒▒▒▒▒▒▒▀▀▄\n░░░▐░░░░▐▄▒▒▒▒▒▒▒▒▒▒▀▄\n░░░░▀▄░░░░▀▄▒▒▒▒▒▒▒▒▒▒▀▄\n░░░░░░▀▄▄▄▄▄█▄▄▄▄▄▄▄▄▄▄▄▀▄\n░░░░░░░░░░░▌▌▌▌░░░░░\n░░░░░░░░░░░▌▌░▌▌░░░░░\n░░░░░░░░░▄▄▌▌▄▌▌░░░░░",
    "\n⣿⣿⣿⣿⠛⠛⠉⠄⠁⠄⠄⠉⠛⢿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⡟⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⡇⠄⠄⠄⠐⠄⠄⠄⠄⠄⠄⠄⠠⣿⣿⣿⣿⣿⣿\n⣿⣿⡇⠄⢀⡀⠠⠃⡐⡀⠠⣶⠄⠄⢀⣿⣿⣿⣿⣿⣿\n⣿⣿⣶⠄⠰⣤⣕⣿⣾⡇⠄⢛⠃⠄⢈⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⡇⢀⣻⠟⣻⣿⡇⠄⠧⠄⢀⣾⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣟⢸⣻⣭⡙⢄⢀⠄⠄⠄⠈⢹⣯⣿⣿⣿⣿⣿\n⣿⣿⣿⣭⣿⣿⣿⣧⢸⠄⠄⠄⠄⠄⠈⢸⣿⣿⣿⣿⣿\n⣿⣿⣿⣼⣿⣿⣿⣽⠘⡄⠄⠄⠄⠄⢀⠸⣿⣿⣿⣿⣿\n⡿⣿⣳⣿⣿⣿⣿⣿⠄⠓⠦⠤⠤⠤⠼⢸⣿⣿⣿⣿⣿\n⡹⣧⣿⣿⣿⠿⣿⣿⣿⣿⣿⣿⣿⢇⣓⣾⣿⣿⣿⣿⣿\n⡞⣸⣿⣿⢏⣼⣶⣶⣶⣶⣤⣶⡤⠐⣿⣿⣿⣿⣿⣿⣿\n⣯⣽⣛⠅⣾⣿⣿⣿⣿⣿⡽⣿⣧⡸⢿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⡷⠹⠛⠉⠁⠄⠄⠄⠄⠄⠄⠐⠛⠻⣿⣿⣿⣿\n⣿⣿⣿⠃⠄⠄⠄⠄⠄⣠⣤⣤⣤⡄⢤⣤⣤⣤⡘⠻⣿\n⣿⣿⡟⠄⠄⣀⣤⣶⣿⣿⣿⣿⣿⣿⣆⢻⣿⣿⣿⡎⠝\n⣿⡏⠄⢀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡎⣿⣿⣿⣿⠐\n⣿⡏⣲⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢇⣿⣿⣿⡟⣼\n⣿⡠⠜⣿⣿⣿⣿⣟⡛⠿⠿⠿⠿⠟⠃⠾⠿⢟⡋⢶⣿\n⣿⣧⣄⠙⢿⣿⣿⣿⣿⣿⣷⣦⡀⢰⣾⣿⣿⡿⢣⣿⣿\n⣿⣿⣿⠂⣷⣶⣬⣭⣭⣭⣭⣵⢰⣴⣤⣤⣶⡾⢐⣿⣿"

]

class User:
    def __init__(self, username: str, password: str):
        self.username = username
        self.password = password

def save_user(user: User):
    with open(users_file, "a") as file:
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
    username: str
    password: str


@app.post("/llm")
async def system(item: Item):
    user = get_user(item.username)
    if not user or user.password != item.password:
        raise HTTPException(status_code=401, detail="Wrong credentials")
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
    prompt = system_prompt[selected_mode]
    data = {
        "messages": [
            {"role": "system", "content": prompt},
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
        return {"response": random_text(result['choices'][0]['message']['content']), "mode": selected_mode}

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
            "img": "https://www.svgrepo.com/show/373924\nginx.svg",
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

    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def random_text(test_text):
    chance = random.randint(0, 100)
    if chance < 50:
        rand1 = random.randint(0, 100)
        if rand1 < 50:
            randtext = random.choice(ascii_arts)
        else:
            randtext = random.choice(["(*＞ω＜*)♡","HACKED", "@#%@&#*%#!()_$(%#@%@#%^T@@@@@", "NIGHTMARE", "SALUT!", "23jsifdogjeri0t3j49tgnb0iermg34", "#@(%)@()#%*@)@#%*%*#(%(#(#@", "@%%%%%%%@@@@@@@@$$$$$"])*random.randint(10, 30)
        rand2 = random.randint(0, len(test_text) - 1)
        test_text = test_text[:rand2] + randtext + test_text[rand2:]
    return test_text

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8083)