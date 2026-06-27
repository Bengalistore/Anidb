import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      marginTop: '80px',
      padding: '40px 20px',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '20px' }}>⛩️</span>
          <span style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '20px', letterSpacing: '2px',
            background: 'linear-gradient(90deg, #e91e8c, #00c6ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>AniBD</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {[
            { href: '/', label: 'হোম' },
            { href: '/schedule', label: 'Schedule' },
            { href: '/upcoming', label: 'Upcoming' },
            { href: '/ranking', label: 'Ranking' },
          ].map(l => (
            <Link key={l.href} href={l.href} style={{ color: 'var(--text-muted)', fontSize: '13px', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#e91e8c'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
          Data provided by <a href="https://myanimelist.net" target="_blank" rel="noopener noreferrer" style={{ color: '#e91e8c' }}>MyAnimeList</a> via Jikan API
        </p>
        <p style={{ color: '#374151', fontSize: '11px', marginTop: '8px' }}>
          © {new Date().getFullYear()} AniBD — বাংলাদেশের Anime Community
        </p>
      </div>
    </footer>
  )
}
