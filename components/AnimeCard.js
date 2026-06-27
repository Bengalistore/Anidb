import Link from 'next/link'

export default function AnimeCard({ anime, rank }) {
  const score = anime.score || anime.mean || 'N/A'
  const title = anime.title || anime.title_english || 'Unknown'
  const image = anime.images?.jpg?.image_url || anime.images?.jpg?.large_image_url || '/placeholder.png'
  const episodes = anime.episodes || '?'
  const status = anime.status || ''
  const year = anime.year || anime.aired?.prop?.from?.year || ''

  const isAiring = status === 'Currently Airing'

  return (
    <Link href={`/anime/${anime.mal_id}`}>
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.25s',
        position: 'relative',
        height: '100%',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.borderColor = 'rgba(233,30,140,0.4)'
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(233,30,140,0.15)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = ''
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.boxShadow = ''
        }}
      >
        {/* Rank Badge */}
        {rank && (
          <div style={{
            position: 'absolute', top: '10px', left: '10px', zIndex: 2,
            background: rank <= 3
              ? ['linear-gradient(135deg,#f59e0b,#d97706)', 'linear-gradient(135deg,#9ca3af,#6b7280)', 'linear-gradient(135deg,#cd7c2f,#a05a20)'][rank - 1]
              : 'rgba(0,0,0,0.75)',
            borderRadius: '8px',
            padding: '3px 8px',
            fontSize: '12px',
            fontWeight: '800',
            color: 'white',
          }}>
            #{rank}
          </div>
        )}

        {/* Airing badge */}
        {isAiring && (
          <div style={{
            position: 'absolute', top: '10px', right: '10px', zIndex: 2,
            background: 'rgba(233,30,140,0.9)',
            borderRadius: '6px', padding: '2px 8px',
            fontSize: '10px', fontWeight: '700', color: 'white',
            animation: 'pulse-glow 2s infinite',
          }}>
            ● AIRING
          </div>
        )}

        {/* Image */}
        <div style={{ position: 'relative', paddingBottom: '140%', overflow: 'hidden' }}>
          <img
            src={image}
            alt={title}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
            }}
            loading="lazy"
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(7,7,17,1) 0%, transparent 50%)',
          }} />
        </div>

        {/* Info */}
        <div style={{ padding: '12px' }}>
          <div style={{
            fontSize: '13px', fontWeight: '700',
            lineHeight: '1.3', marginBottom: '8px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {title}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{
              fontSize: '15px', fontWeight: '800',
              color: score !== 'N/A' ? '#f59e0b' : '#4b5563',
            }}>
              ⭐ {score !== 'N/A' ? Number(score).toFixed(1) : 'N/A'}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              {episodes} eps
            </span>
          </div>

          {year && (
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
              {year}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
