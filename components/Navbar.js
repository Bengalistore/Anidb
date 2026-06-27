import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar({ onSearch }) {
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const navLinks = [
    { href: '/', label: 'হোম', icon: '🏠' },
    { href: '/schedule', label: 'Schedule', icon: '📅' },
    { href: '/upcoming', label: 'Upcoming', icon: '🔜' },
    { href: '/ranking', label: 'Ranking', icon: '🏆' },
  ]

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 1000,
      background: 'rgba(7,7,17,0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(233,30,140,0.2)',
    }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: '0 20px',
        display: 'flex', alignItems: 'center',
        height: '60px', gap: '24px',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <span style={{ fontSize: '22px' }}>⛩️</span>
          <span style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '22px',
            letterSpacing: '2px',
            background: 'linear-gradient(90deg, #e91e8c, #00c6ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>AniBD</span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '4px', flex: 1 }} className="desktop-nav">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              color: router.pathname === link.href ? 'white' : '#9ca3af',
              background: router.pathname === link.href ? 'rgba(233,30,140,0.2)' : 'transparent',
              border: router.pathname === link.href ? '1px solid rgba(233,30,140,0.3)' : '1px solid transparent',
              transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <span>{link.icon}</span> {link.label}
            </Link>
          ))}
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Anime খুঁজুন..."
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              color: 'white',
              fontSize: '13px',
              width: '180px',
              outline: 'none',
            }}
          />
          <button type="submit" style={{
            padding: '8px 14px',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(135deg, #e91e8c, #7c3aed)',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '700',
          }}>🔍</button>
        </form>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none', border: 'none', color: 'white',
            fontSize: '22px', cursor: 'pointer',
          }}
          className="mobile-menu-btn"
        >☰</button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(14,14,31,0.98)',
          borderTop: '1px solid var(--border)',
          padding: '12px 20px',
        }}>
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} style={{
              display: 'block', padding: '10px 0',
              borderBottom: '1px solid var(--border)',
              color: router.pathname === link.href ? '#e91e8c' : '#9ca3af',
              fontWeight: '600', fontSize: '14px',
            }}>
              {link.icon} {link.label}
            </Link>
          ))}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
