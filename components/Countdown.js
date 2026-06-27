import { useState, useEffect } from 'react'

export default function Countdown({ broadcastDay, broadcastTime }) {
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(() => {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const targetDay = days.findIndex(d => d.toLowerCase() === broadcastDay?.toLowerCase())
    if (targetDay === -1 || !broadcastTime) return

    const calc = () => {
      const now = new Date()
      // Convert JST to local
      const [h, m] = (broadcastTime || '00:00').split(':').map(Number)
      const target = new Date()
      target.setDate(now.getDate() + ((targetDay - now.getDay() + 7) % 7))
      target.setHours(h - 9, m, 0, 0) // JST to UTC offset rough

      if (target <= now) target.setDate(target.getDate() + 7)

      const diff = target - now
      const days_ = Math.floor(diff / 86400000)
      const hours = Math.floor((diff % 86400000) / 3600000)
      const mins = Math.floor((diff % 3600000) / 60000)
      const secs = Math.floor((diff % 60000) / 1000)

      setTimeLeft({ days: days_, hours, mins, secs })
    }

    calc()
    const interval = setInterval(calc, 1000)
    return () => clearInterval(interval)
  }, [broadcastDay, broadcastTime])

  if (!timeLeft) return null

  return (
    <div style={{
      display: 'flex', gap: '8px', alignItems: 'center',
      background: 'rgba(233,30,140,0.08)',
      border: '1px solid rgba(233,30,140,0.2)',
      borderRadius: '10px', padding: '10px 14px',
      marginTop: '10px',
    }}>
      <span style={{ fontSize: '12px', color: '#e91e8c', fontWeight: '700', marginRight: '4px' }}>⏱ NEXT EP:</span>
      {[
        { v: timeLeft.days, l: 'দিন' },
        { v: timeLeft.hours, l: 'ঘণ্টা' },
        { v: timeLeft.mins, l: 'মিনিট' },
        { v: timeLeft.secs, l: 'সেকেন্ড' },
      ].map(({ v, l }) => (
        <div key={l} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '16px', fontWeight: '800', color: 'white', minWidth: '28px', textAlign: 'center' }}>
            {String(v).padStart(2, '0')}
          </div>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{l}</div>
        </div>
      ))}
    </div>
  )
}
