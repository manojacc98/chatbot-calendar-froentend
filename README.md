# 🗓️ Chatbot Calendar Frontend

This is the frontend for the **Calendar Assistant Chatbot**, built with **Next.js** and **Tailwind CSS**. It allows users to authenticate via Gmail, create calendar events, view upcoming events, and interact with a chatbot interface that can read and write to a connected calendar application.

---

## 🚀 Features

-  Google OAuth2 login integration
-  Create and save new events to your calendar
-  Display a list of upcoming events
-  Chatbot assistant interface (NLP-driven)
-  Responsive and modern UI built with Tailwind CSS
-  API integration with Django backend for calendar operations

---

## 📁 Project Structure

calendar-frontend
│
├── src/
│ ├── app/
│ │ └── page.tsx # Main UI with login, event creation, and chatbot
│ ├── components/
│ │ └── ChatbotBox.tsx # Chatbot UI component
│ ├── utils/
│ │ └── api.ts # API base URL config
│
├── public/
├── .env.local # (Optional) API environment configuration
├── tailwind.config.js
├── next.config.js
├── package.json
└── README.md


---

## ⚙️ Getting Started

### 1. Clone the repository


git clone https://github.com/your-username/chatbot-calendar-froentend.git
cd chatbot-calendar-froentend

Install dependencies
npm install

 Set environment variables

Create a .env.local file and define your backend URL:

NEXT_PUBLIC_API_BASE=http://localhost:8000/api

    Update the API base URL if your backend is deployed.

 Run the development server

npm run dev

Visit http://localhost:3000 in your browser.
 Build for production

npm run build
npm start


🔗 Backend Repository

Make sure to also run the Django Backend that supports this frontend.

 Author

Made with by Manoj R