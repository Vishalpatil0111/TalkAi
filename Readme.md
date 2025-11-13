# 🚀 **AI Chat Application**

### *React • Tailwind CSS • Google Gemini API*

A modern, multi-session AI chat application inspired by ChatGPT — featuring inline message editing, auto-regenerated AI responses, animated UI, neon glassmorphism, chat history exports, and persistent sessions stored locally.

This project demonstrates a production-level chat interface with polished UX and deep LLM integration.

---

## 🌟 **Features**

### 💬 **Chat Features**

* Multi-chat session support
* Create, rename, and delete chat sessions
* Persistent chat history using `localStorage`
* Timestamped messages
* Auto-scroll to latest message
* “AI is typing…” indicator

### 🤖 **AI Integration**

* Powered by **Google Gemini 2.0 Flash**
* Real-time AI responses
* Retry failed messages
* Auto-regenerate AI response after editing user message
* Error handling with fallback messages

### ✏️ **Message Editing & Utilities**

* Inline editing for user messages
* Deletes old AI response & regenerates a new one (ChatGPT-style)
* Copy-to-clipboard for AI responses
* Download chat history as JSON

### 🎨 **UI & UX Enhancements**

* Fully responsive design (desktop + mobile)
* Sidebar drawer with close button for mobile
* Transparent glass message bubbles
* Animated neon background with glowing bubbles
* Smooth transitions and shadow effects
* Markdown & code block formatting using `react-markdown` + `remark-gfm`
* Dark theme with polished aesthetics

---

## 🛠 **Tech Stack**

**Frontend:**

* React.js
* Tailwind CSS
* Context API (global state management)

**AI / Backend:**

* Google Gemini API (gemini-2.0-flash model)

**Utilities:**

* React Markdown
* Lucide React Icons
* LocalStorage
* Custom JSON exporter

---

## 📂 **Project Structure**

```
src/
 ├── components/
 │   ├── Sidebar.jsx
 │   ├── ChatWindow.jsx
 │   ├── MessageList.jsx
 │   ├── MessageItem.jsx
 │   ├── MessageInput.jsx
 │
 ├── context/
 │   └── ChatContext.jsx
 │
 ├── services/
 │   └── geminiService.js
 │
 └── utils/
     └── downloadJSON.js
```

---

## 🚀 **Getting Started**

### 1️⃣ Clone the project

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Add your Gemini API Key

Create a `.env` file:

#### If using Vite:

```
VITE_GEMINI_API_KEY=your-api-key-here
```

#### If using CRA:

```
REACT_APP_GEMINI_API_KEY=your-api-key-here
```

### 4️⃣ Start the development server

```bash
npm run dev
# or
npm start
```

---

## 📌 **Environment Variables**

Ensure your `.env` contains:

```
VITE_GEMINI_API_KEY=your_gemini_key_here
```

You can generate a key here:
🔗 [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

---

## 🔥 **Screenshots**

(Add screenshots here)

```
📸 /screenshots/home.png  
📸 /screenshots/chat.png  
📸 /screenshots/mobile.png  
```

---

## 🧩 **Future Enhancements**

* Streaming AI responses (typing effect)
* Message reactions
* Export chat as PDF / TXT
* Light mode toggle
* AI avatars
* API usage limits display

---

## 🤝 **Contributing**

Pull requests, issues, and feature suggestions are welcome!

---

## 📄 **License**

This project is licensed under the MIT License.

---

## ⭐ **Support**

If you found this project helpful, please leave a ⭐ on the repo — it helps a lot!

Want those?
