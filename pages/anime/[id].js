import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Countdown from '../../components/Countdown'

export default function AnimeDetail({ anime, characters }) {
  if (!anime) return (
    <>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '120px 20px', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>😔</div>
        <p>Anime খুঁজে পাওয়া যায়নি</p>
        <Link href="/" style={{ color: '#e91e8c', marginTop: '16px', display: 'inline-block' }}>← হোমে ফিরুন</Link>
      </div>
      <Footer />
    </>
  )

  const isAiring = anime.status === 'Currently Airing'
  const score = anime.score ? Number(anime.score).toFixed(2) : 'N/A'
  const image = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url

  return (
    <>
      <Head>
        <title>{anime.title} | AniBD</title>
        <meta name="description" content={`${anime.title} — ${anime.synopsis?.slice(0, 150) || 'Anime details on AniBD'}`} />
        <meta property="og:image" content={image} />
      </Head>
      <Navbar />

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Back */}
        <Link href="/" style={{ color: 'var(--text-muted)', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
          ← ফিরে যান
        </Link>

        {/* Main Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '32px' }}>
          {/* Poster */}
          <div>
            <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
              <img src={image} alt={anime.title} style={{ width: '100%', display: 'block' }} />
              {isAiring && (
                <div style={{
                  position: 'absolute', top: '10px', right: '10px',
                  background: '#e91e8c', borderRadius: '6px',
                  padding: '3px 8px', fontSize: '10px', fontWeight: '700', color: 'white',
                }}>● AIRING</div>
              )}
            </div>

            {/* Countdown if airing */}
            {isAiring && anime.broadcast?.day && (
              <Countdown broadcastDay={anime.broadcast.day} broadcastTime={anime.broadcast.time} />
            )}

            {/* Quick stats */}
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: 'Score', value: `⭐ ${score}`, color: '#f59e0b' },
                { label: 'Rank', value: anime.rank ? `#${anime.rank}` : 'N/A' },
                { label: 'Popularity', value: anime.popularity ? `#${anime.popularity}` : 'N/A' },
                { label: 'Episodes', value: anime.episodes || '?' },
                { label: 'Status', value: anime.status },
                { label: 'Studio', value: anime.studios?.[0]?.name || 'Unknown' },
                { label: 'Year', value: anime.year || 'TBA' },
                { label: 'Rating', value: anime.rating },
              ].map(stat => (
                <div key={stat.label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 12px', borderRadius: '8px',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  fontSize: '12px',
                }}>
                  <span style={{ color: 'var(--text-muted)' }}>{stat.label}</span>
                  <span style={{ fontWeight: '700', color: stat.color || 'white' }}>{stat.value || 'N/A'}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', lineHeight: '1.3', marginBottom: '8px' }}>{anime.title}</h1>
            {anime.title_english && anime.title_english !== anime.title && (
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '16px' }}>{anime.title_english}</p>
            )}

            {/* Genres */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
              {(anime.genres || []).map(g => (
                <span key={g.mal_id} style={{
                  padding: '4px 12px', borderRadius: '20px',
                  background: 'rgba(124,58,237,0.2)', color: '#c084fc',
                  fontSize: '12px', fontWeight: '600',
                }}>{g.name}</span>
              ))}
              {(anime.themes || []).map(t => (
                <span key={t.mal_id} style={{
                  padding: '4px 12px', borderRadius: '20px',
                  background: 'rgba(0,198,255,0.1)', color: '#00c6ff',
                  fontSize: '12px', fontWeight: '600',
                }}>{t.name}</span>
              ))}
            </div>

            {/* Synopsis */}
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: '12px', padding: '20px', marginBottom: '24px',
            }}>
              <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#e91e8c', marginBottom: '12px', letterSpacing: '1px' }}>📖 SYNOPSIS</h2>
              <p style={{ lineHeight: '1.8', color: 'var(--text-soft)', fontSize: '14px' }}>
                {anime.synopsis || 'Synopsis পাওয়া যায়নি।'}
              </p>
            </div>

            {/* Broadcast info */}
            {isAiring && anime.broadcast && (
              <div style={{
                background: 'rgba(233,30,140,0.06)', border: '1px solid rgba(233,30,140,0.2)',
                borderRadius: '12px', padding: '16px', marginBottom: '24px',
              }}>
                <h2 style={{ fontSize: '13px', fontWeight: '700', color: '#e91e8c', marginBottom: '8px' }}>📅 BROADCAST</h2>
                <p style={{ fontSize: '14px', color: 'var(--text-soft)' }}>
                  {anime.broadcast.day} at {anime.broadcast.time} JST — {anime.broadcast.timezone}
                </p>
              </div>
            )}

            {/* Characters */}
            {characters && characters.length > 0 && (
              <div>
                <h2 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '16px' }}>👥 CHARACTERS</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' }}>
                  {characters.slice(0, 8).map(c => (
                    <div key={c.character.mal_id} style={{ textAlign: 'center' }}>
                      <img src={c.character.images?.jpg?.image_url} alt={c.character.name}
                        style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border)' }} />
                      <div style={{ fontSize: '11px', marginTop: '6px', color: 'var(--text-soft)', lineHeight: '1.3' }}>
                        {c.character.name.split(',')[0]}
                      </div>
                      <div style={{ fontSize: '10px', color: '#e91e8c', fontWeight: '600' }}>{c.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        @media (max-width: 640px) {
          main > div > div:first-child { display: none; }
          main > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
  try {
    await new Promise(r => setTimeout(r, 400)) // rate limit safety
    const [animeRes, charRes] = await Promise.all([
      fetch(`https://api.jikan.moe/v4/anime/${params.id}/full`),
      fetch(`https://api.jikan.moe/v4/anime/${params.id}/characters`),
    ])
    const [animeData, charData] = await Promise.all([animeRes.json(), charRes.json()])
    return {
      props: { anime: animeData.data || null, characters: charData.data || [] },
      revalidate: 86400,
    }
  } catch (e) {
    return { props: { anime: null, characters: [] }, revalidate: 60 }
  }
}
