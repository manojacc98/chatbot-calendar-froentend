# 🗓 Calendar Assistant Chatbot

This is a full-stack chatbot interface that allows users to **create and view calendar events** through a conversational interface, integrated with Google Calendar .

---

## Tech Stack

- **Frontend**: Next.js (TypeScript), Tailwind CSS
- **Backend**: Django + REST Framework
- **Calendar Integration**: Google Calendar (OAuth2) or Cronofy API
- **Auth**: Google OAuth2 (with `App Not Verified` workaround)

---

##  Features

-  Google OAuth login for calendar access
-  Event creation (title + datetime)
-  NLP chatbot interface to create or fetch events
-  Fixed right-side chatbot layout
-  Professional footer with Google login instructions
-  Fully responsive UI

---

##  How to Use

### 1. Clone the repository


git clone https://github.com/manojacc98/chatbot-calendar-frontend.git
cd chatbot-calendar-frontend
2. Install dependencies

npm install
3. Configure environment variables
Create a .env.local file:


NEXT_PUBLIC_API_BASE=http://localhost:8000/api  # Or your backend URL
4. Run the development server

npm run dev
 Notes
If you see a "Google App Not Verified" warning:

Click "Advanced"

Click "Go to [your app name] (unsafe)"

This is expected for development/testing apps using Google OAuth2.

 Live Demo
 Production: https://chatbot-calendar-frontend.vercel.app

 Repository Structure

src/
├── app/            # Page layout and routing
├── components/     # UI Components (ChatbotBox, EventForm etc.)
├── utils/          # Helper functions
├── public/         # Static assets


Contact
Built by Manoj — open to feedback and contributions!




---

Let me know if you'd like to add:
- Cronofy instructions
- Backend repo link
- Project screenshots

I can update it for you accordingly.
