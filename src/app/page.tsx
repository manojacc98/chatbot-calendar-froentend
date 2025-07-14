'use client'
export const dynamic = "force-dynamic"

import { useState, useEffect } from 'react'
import axios from 'axios'
import ChatbotBox from '@/components/ChatbotBox'
import { API_BASE } from '@/utils/api'

export default function HomePage() {
  const [title, setTitle] = useState('')
  const [datetime, setDatetime] = useState('')
  const [events, setEvents] = useState<any[]>([])

  const fetchEvents = async () => {
    try {
      if (typeof window === 'undefined') return 

      const email = new URLSearchParams(window.location.search).get('email')
      if (!email) return

      const res = await axios.get(`${API_BASE}/events/?email=${email}`)
      const items = res.data.items || []
      const formatted = items.map((item: any) => ({
        title: item.summary || '(No Title)',
        time: new Date(item.start.dateTime).toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
      }))
      setEvents(formatted)
    } catch (err) {
      console.error('Failed to fetch events:', err)
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return 
    fetchEvents()
    const interval = setInterval(fetchEvents, 5000)
    return () => clearInterval(interval)
  }, [])

  const createEvent = async () => {
    try {
      const email = new URLSearchParams(window.location.search).get('email')
      if (!email) throw new Error('Email not found in URL')

      const startTimeIST = new Date(
        new Date(datetime).getTime() + 5.5 * 60 * 60 * 1000
      ).toISOString().replace('.000Z', '+05:30')

      const endTimeIST = new Date(
        new Date(datetime).getTime() + (5.5 + 1) * 60 * 60 * 1000
      ).toISOString().replace('.000Z', '+05:30')

      await axios.post(`${API_BASE}/events/?email=${email}`, {
        summary: title,
        start: startTimeIST,
        end: endTimeIST,
        timezone: 'Asia/Kolkata',
      })

      alert('Event created!')
      setTitle('')
      setDatetime('')
      fetchEvents()
    } catch (err: any) {
      console.error("❌ Full error:", err)
      alert(' Failed: ' + (
        err.response?.data?.error ||
        err.response?.data?.detail ||
        err.message ||
        'Unknown error'
      ))
    }
  }

  const handleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/google/login/`
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">

      {/* Header */}
      <header className="bg-white shadow py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700 text-center w-full">
           Calendar Assistant
        </h1>
        <div className="absolute right-6">
          <button
            onClick={handleLogin}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow"
          >
             Login with Gmail
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow px-4 py-10 pb-20 flex flex-col items-center justify-start">

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="bg-white rounded-xl shadow-md p-6 w-full space-y-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              Create your Event
            </h2>

            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Event Title"
              className="w-full text-base text-gray-800 placeholder-gray-500 border-b border-gray-300 pb-2 focus:outline-none"
            />

            <input
              type="datetime-local"
              value={datetime}
              onChange={e => setDatetime(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 text-gray-800 focus:outline-none"
            />

            <div className="text-right">
              <button
                onClick={createEvent}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
              >
                Save Event
              </button>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-1">
                 Upcoming Events
              </h3>
              <div className="max-h-56 overflow-y-auto pr-1">
                <ul className="space-y-2 text-sm text-gray-700">
                  {events.map((e, i) => (
                    <li key={i} className="border rounded p-3 bg-gray-100 shadow-sm">
                      <strong>{e.title}</strong><br />
                      <span className="text-gray-600 text-sm">{e.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="md:pl-6">
            <ChatbotBox />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white text-gray-700 text-xs px-4 py-4 w-full shadow-inner mt-16 flex justify-center">
        <div className="max-w-3xl text-center leading-snug">
          <p className="font-medium mb-1">
             Google Login — App Not Verified
          </p>
          <ul className="list-disc list-inside text-left inline-block text-xs text-gray-800">
            <li>Click <strong>"Advanced"</strong> on the warning screen.</li>
            <li>Click <strong>"Go to [your app name] (unsafe)"</strong> to continue.</li>
          </ul>
          <p className="mt-1">This is expected for development/testing apps.</p>
        </div>
      </footer>





    </div>
  )
}
