import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const FILTERS = [
  { key: 'bypopularity', label: '🔥 Most Popular' },
  { key: 'airing', label: '📺 Top Airing' },
  { key: 'upcoming', label: '🔜 Upcoming' },
  { key: 'favorite', label: '❤️ Most Favorited' },
]

export default function Ranking({ initialAnime }) {
  const [anime, setAnime] = useState(initialAnime)
  const [activeFilter, setActiveFilter] = useState('bypopularity')
  const [loading, setLoading] = useState(false)

  const changeFilter = async (filter) => {
    if (filter === activeFilter) return
    setLoading(true)
    setActiveFilter(filter)
    try {
      const res = await fetch(`https://api.jikan.moe/v4/top/anime?limit=25&filter=${filter}`)
      const data = await res.json()
      setAnime(data.data || [])
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Top Anime Ranking ২০২৬ | AniBD</title>
        <meta name="description" content="সেরা anime-এর তালিকা। Score ও popularity অনুযায়ী top anime ranking।" />
      </Head>
      <Navbar />

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '12px', color: '#e91e8c', letterSpacing: '2px', fontWeight: '700', marginBottom: '8px' }}>🏆 TOP ANIME</div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Anime Ranking</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>MyAnimeList-এর ডেটা অনুযায়ী সেরা anime</p>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {FILTERS.map(f => (
            <button key={f.key} onClick={() => changeFilter(f.key)} style={{
              padding: '8px 18px', borderRadius: '20px', border: 'none',
              cursor: 'pointer', fontSize: '13px', fontWeight: '600',
              background: activeFilter === f.key ? 'linear-gradient(135deg, #e91e8c, #7c3aed)' : 'rgba(255,255,255,0.06)',
              color: activeFilter === f.key ? 'white' : 'var(--text-muted)',
              transition: 'all 0.2s',
            }}>{f.label}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px' }}>
            <div className="spinner" />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {anime.map((a, i) => (
              <Link key={a.mal_id} href={`/anime/${a.mal_id}`}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: '12px', padding: '12px 16px',
                  transition: 'all 0.2s', cursor: 'pointer',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(233,30,140,0.3)'
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.transform = ''
                  }}
                >
                  {/* Rank number */}
                  <div style={{
                    width: '40px', textAlign: 'center', flexShrink: 0,
                    fontSize: i < 3 ? '20px' : '16px',
                    fontWeight: '800',
                    fontFamily: 'Bebas Neue, sans-serif',
                    letterSpacing: '1px',
                    color: i === 0 ? '#f59e0b' : i === 1 ? '#9ca3af' : i === 2 ? '#cd7c2f' : '#374151',
                  }}>
                    {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                  </div>

                  {/* Image */}
                  <img
                    src={a.images?.jpg?.image_url}
                    alt={a.title}
                    style={{ width: '44px', height: '62px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}
                  />

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {a.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      {a.year && `${a.year} • `}{a.episodes && `${a.episodes} eps • `}{a.studios?.[0]?.name}
                    </div>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {(a.genres || []).slice(0, 3).map(g => (
                        <span key={g.mal_id} style={{
                          padding: '1px 7px', borderRadius: '8px',
                          background: 'rgba(124,58,237,0.15)',
                          color: '#c084fc', fontSize: '10px', fontWeight: '600',
                        }}>{g.name}</span>
                      ))}
                    </div>
                  </div>

                  {/* Score & Members */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: '18px', fontWeight: '800', color: '#f59e0b' }}>
                      ⭐ {a.score ? Number(a.score).toFixed(1) : 'N/A'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {a.members ? `${(a.members / 1000000).toFixed(1)}M members` : ''}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://api.jikan.moe/v4/top/anime?limit=25&filter=bypopularity')
    const data = await res.json()
    return {
      props: { initialAnime: data.data || [] },
      revalidate: 3600,
    }
  } catch (e) {
    return { props: { initialAnime: [] }, revalidate: 60 }
  }
}
