# 🧠 KovalskyAI — Your Local AI Assistant

KovalskyAI is a **fully self-hosted**, blazing-fast AI chat interface built for privacy, speed, and simplicity.  
No external APIs. No cloud. No monthly fees.  
Just you and your model — on your own terms.

---

![Demo](https://i.imgur.com/HECHphb.gif)

## ✨ Features

- ⚡ **Real-time streaming responses** (like ChatGPT)  
- 🎨 **Minimalist, dark-themed interface** with elegant animations (GSAP-powered)  
- 🧱 **Self-hosted** backend — works offline, no dependencies on OpenAI or others  
- 🖥️ **Cross-platform**: Runs smoothly on both laptops and desktops  
- 🔁 **CPU & GPU** support — CUDA-accelerated via `koboldcpp`  
- 💬 **Memory-aware chat history** (retains previous conversation context)  
- 🛡️ **CORS enabled** — ready for frontend/backend interaction  
- 🌐 Clean separation between backend (Flask + Kobold API) and frontend (HTML/CSS/JS)  

---

## 📦 How it works

- You run your **own model** locally with [KoboldCpp](https://github.com/LostRuins/koboldcpp)  
- The backend (`app.py`) connects to it and forwards your input  
- Streaming tokens are parsed and sent instantly to the frontend  

---

## 🚧 Roadmap & Planned Features

Here's what we're working on next:

- 🔍 **Search the web** from within chat (`Search on Web` button)  
- 📎 **Attach documents**: Feed `.txt`, `.pdf`, `.docx`, etc. to the model  
- 🧠 **Context-aware uploads**: AI will read and reference attached files in conversation  
- 💾 **Save/load chat sessions** to local storage  
- 🌐 **Multi-language interface support**  
- 🗂️ **Prompt templates** and personalities (creative, assistant, coder, etc.)  

---

## 🛠️ Installation

KovalskyAI uses:

- **Backend**: Python `Flask`, `requests`, and a KoboldCpp-compatible API  
- **Frontend**: Pure `HTML`, `CSS`, `JavaScript` + `GSAP` for animations

### ⚙️ Model & Backend Setup
1. 📥 **Download KoboldCpp**
Download the latest `KoboldCpp` build from [Releases](https://github.com/LostRuins/koboldcpp/releases)
Use the version with `cu12` in the name if you have an `NVIDIA GPU with CUDA 12`.  

2. 🤖 **Download the Model**
Get the model file `qwen1_5-7b-chat-q4_k_m.gguf` from Hugging Face.
Choose `q4_k_m` format for a good balance of performance and quality.
_Place the `.gguf` model file in the same folder as `koboldcpp_cu12.exe.`_  


3. 🚀 **Launch KoboldCpp**
Start the local API with the following command:
```bash
.\koboldcpp_cu12.exe ^
  --model .\qwen1_5-7b-chat-q4_k_m.gguf ^
  --usecublas ^
  --gpulayers 33 ^
  --threads 8 ^
  --port 5001
```
_Adjust `--gpulayers` and `--threads` based on your hardware._

### Clone the project

```bash
git clone https://github.com/maxadov/KovalskyAI.git
cd KovalskyAI
```

Create a virtual environment
```bash
python -m venv venv
```

Activate it
Linux/macOS:
```bash
source venv/bin/activate
```
Windows:
```bash
venv\Scripts\activate
```


Install dependencies
```bash
pip install -r requirements.txt
```

Start the server
```bash
python app.py
```
⚠️ **Make sure KoboldCpp is running at:**
http://localhost:5001/v1/chat/completions

✅ **Frontend will be available at:**
http://localhost:8000  


# 🤝Contributing
**Contributions are warmly welcome!**

🔧If you’d like to suggest **a feature, fix a bug, or improve** anything:

1. Create an issue with details

2. Fork the repo

3. Open a pull request when ready  

`Made with ❤️ and local compute.`

