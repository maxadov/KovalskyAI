from flask import Flask, request, Response, render_template, stream_with_context, session
import requests
import json
from flask_cors import CORS

app = Flask(__name__, template_folder='templates')
app.secret_key = "change_this_to_a_secure_random_key"
CORS(app)  # Разрешаем CORS

KOBOLD_API_URL = "http://localhost:5001/v1/chat/completions"

# Живой, краткий, по делу системный промпт
SYSTEM_PROMPT = (
    "You are a smart, concise assistant. "
    "Never say more than needed. "
    "Answer clearly and directly, like a human who values brevity. "
    "Avoid fluff and unnecessary details."
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '').strip()
    if not user_message:
        return {"error": "Empty message"}, 400

    # Получаем историю сообщений из сессии или создаём новую
    history = session.get('history', [])

    # Обновляем историю: системный промпт + предыдущие сообщения + новое
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages.extend(history)
    messages.append({"role": "user", "content": user_message})

    headers = {"Content-Type": "application/json"}
    payload = {
        "model": "kobold-v1",
        "stream": True,
        "messages": messages
    }

    def generate():
        try:
            with requests.post(KOBOLD_API_URL, headers=headers, json=payload, stream=True, timeout=60) as resp:
                buffer = ""
                for line in resp.iter_lines(decode_unicode=True):
                    if line and line.startswith("data: "):
                        content = line.removeprefix("data: ").strip()
                        if content == "[DONE]":
                            break
                        try:
                            parsed = json.loads(content)
                            delta = parsed.get("choices", [{}])[0].get("delta", {}).get("content", "")
                            if delta:
                                buffer += delta
                                yield delta
                        except Exception as e:
                            yield f"[error: {e}]"
                # После окончания стрима обновим историю (добавим ответ ассистента)
                history.append({"role": "user", "content": user_message})
                history.append({"role": "assistant", "content": buffer})
                session['history'] = history[-20:]  # Храним последние 20 сообщений
        except Exception as e:
            yield f"[error: {e}]"

    return Response(stream_with_context(generate()), mimetype='text/plain')


if __name__ == '__main__':
    app.run(port=8000, debug=True)
