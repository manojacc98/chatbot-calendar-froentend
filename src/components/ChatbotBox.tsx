'use client'

import { useState } from 'react'
import axios from 'axios'
import { API_BASE } from '@/utils/api'

export default function ChatbotBox() {
  const [messages, setMessages] = useState<{ type: 'user' | 'bot'; text: string }[]>([
    { type: 'bot', text: "Hey there! I'm your calendar assistant." },
    { type: 'bot', text: 'Ask me to create or fetch events anytime.' },
  ])
  const [input, setInput] = useState('')

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setMessages(prev => [...prev, { type: 'user', text: userMessage }])
    setInput('')

    try {
      let email = ''
      if (typeof window !== 'undefined') {
        email = new URLSearchParams(window.location.search).get('email') || ''
      }

      const res = await axios.post(`${API_BASE}/chatbot/?email=${email}`, {
        message: userMessage,
      })

      const botResponse = res.data.response
      setMessages(prev => [...prev, { type: 'bot', text: botResponse }])
    } catch (err: any) {
      console.error(err)
      setMessages(prev => [...prev, { type: 'bot', text: '❌ Failed to process message' }])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div className="fixed top-28 left-[58%] w-[360px] h-[540px] bg-[#dff5f0] rounded-3xl shadow-lg flex flex-col justify-between p-4">
      <div className="overflow-y-auto space-y-3 pr-1 max-h-[450px]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg w-fit max-w-[85%] text-sm whitespace-pre-wrap shadow-sm ${
              msg.type === 'user'
                ? 'ml-auto bg-[#425375] text-white'
                : 'bg-white text-gray-800'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message"
          className="flex-1 px-4 py-2 text-gray-800 rounded-l-full border border-gray-300 bg-white focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="px-5 bg-[#425375] text-white rounded-r-full hover:bg-[#2f3f58]"
        >
          ➤
        </button>
      </div>
    </div>
  )
}
