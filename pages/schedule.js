import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const DAYS_BN = {
  Monday: 'সোমবার',
  Tuesday: 'মঙ্গলবার',
  Wednesday: 'বুধবার',
  Thursday: 'বৃহস্পতিবার',
  Friday: 'শুক্রবার',
  Saturday: 'শনিবার',
  Sunday,
}

const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function Schedule({ schedule }) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })

  return (
    <>
      <Head>
        <title>Anime Airing Schedule ২০২৬ | AniBD</title>
        <meta name="description" content="এই সপ্তাহের সব anime-এর airing schedule। কোন দিন কোন anime আসবে জেনে নিন।" />
      </Head>
      <Navbar />

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: '12px', color: '#e91e8c', letterSpacing: '2px', fontWeight: '700', marginBottom: '8px' }}>📅 WEEKLY AIRING</div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Anime Schedule</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>প্রতি সপ্তাহে কোন দিন কোন anime আসে — JST (Japan Standard Time)</p>
        </div>

        {DAY_ORDER.map(day => {
          const animeList = schedule[day] || []
          const isToday = today === day
          return (
            <div key={day} style={{ marginBottom: '40px' }}>
              {/* Day Header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                marginBottom: '16px', padding: '12px 20px',
                borderRadius: '12px',
                background: isToday ? 'linear-gradient(135deg, rgba(233,30,140,0.15), rgba(124,58,237,0.1))' : 'rgba(255,255,255,0.03)',
                border: isToday ? '1px solid rgba(233,30,140,0.3)' : '1px solid var(--border)',
              }}>
                {isToday && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e91e8c', display: 'inline-block', boxShadow: '0 0 8px #e91e8c' }} />}
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: isToday ? '#e91e8c' : 'white' }}>
                  {DAYS_BN[day]} <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '400' }}>— {day}</span>
                </h2>
                {isToday && <span style={{ background: '#e91e8c', color: 'white', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '10px' }}>আজকে</span>}
                <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '13px' }}>{animeList.length} anime</span>
              </div>

              {/* Anime List */}
              {animeList.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', padding: '0 20px' }}>এই দিনে কোনো anime নেই।</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {animeList.map(anime => (
                    <Link key={anime.mal_id} href={`/anime/${anime.mal_id}`}>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: '16px',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border)',
                        borderRadius: '10px', padding: '12px 16px',
                        transition: 'all 0.2s', cursor: 'pointer',
                      }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = 'rgba(233,30,140,0.3)'
                          e.currentTarget.style.background = 'var(--bg-card2)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = 'var(--border)'
                          e.currentTarget.style.background = 'var(--bg-card)'
                        }}
                      >
                        <img
                          src={anime.images?.jpg?.image_url}
                          alt={anime.title}
                          style={{ width: '48px', height: '68px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: '700', fontSize: '14px', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {anime.title}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            {anime.broadcast?.time && `🕐 ${anime.broadcast.time} JST`}
                            {anime.episodes && ` • ${anime.episodes} এপিসোড`}
                          </div>
                          <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                            {(anime.genres || []).slice(0, 3).map(g => (
                              <span key={g.mal_id} style={{
                                padding: '2px 8px', borderRadius: '10px',
                                background: 'rgba(124,58,237,0.2)',
                                color: '#c084fc', fontSize: '10px', fontWeight: '600',
                              }}>{g.name}</span>
                            ))}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          {anime.score && (
                            <div style={{ fontSize: '16px', fontWeight: '800', color: '#f59e0b' }}>
                              ⭐ {Number(anime.score).toFixed(1)}
                            </div>
                          )}
                          <div style={{
                            marginTop: '4px', padding: '2px 8px', borderRadius: '8px',
                            background: 'rgba(233,30,140,0.15)',
                            color: '#e91e8c', fontSize: '10px', fontWeight: '700',
                          }}>
                            AIRING
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </main>

      <Footer />
    </>
  )
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://api.jikan.moe/v4/seasons/now?limit=50')
    const data = await res.json()
    const animeList = data.data || []

    // Group by broadcast day
    const schedule = {}
    DAY_ORDER.forEach(d => schedule[d] = [])

    animeList.forEach(anime => {
      const day = anime.broadcast?.day
      if (day && schedule[day] !== undefined) {
        schedule[day].push(anime)
      }
    })

    return {
      props: { schedule },
      revalidate: 3600,
    }
  } catch (e) {
    const empty = {}
    DAY_ORDER.forEach(d => empty[d] = [])
    return { props: { schedule: empty }, revalidate: 60 }
  }
}
