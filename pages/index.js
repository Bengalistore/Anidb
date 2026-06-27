import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import AnimeCard from '../components/AnimeCard'
import Footer from '../components/Footer'

export default function Home({ topAnime, airingAnime, upcomingAnime }) {
  return (
    <>
      <Head>
        <title>AniBD — Anime Database | Schedule, Ranking, Upcoming</title>
        <meta name="description" content="Best Anime Database। Weekly airing schedule, upcoming anime, top ranking সব এক জায়গায়।" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="AniBD — Anime Database" />
        <meta property="og:description" content="Weekly schedule, upcoming anime, top ranking — সব বাংলায়" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>

        {/* Hero */}
        <section style={{
          textAlign: 'center',
          padding: '60px 20px 48px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(233,30,140,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            display: 'inline-block',
            background: 'rgba(233,30,140,0.1)',
            border: '1px solid rgba(233,30,140,0.3)',
            borderRadius: '20px', padding: '4px 14px',
            fontSize: '12px', fontWeight: '700',
            color: '#e91e8c', letterSpacing: '1px',
            marginBottom: '16px',
          }}>
            🇧🇩 BANGLADESH&apos;S ANIME HUB
          </div>
          <h1 style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(42px, 8vw, 80px)',
            letterSpacing: '3px',
            lineHeight: 1,
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #ffffff 30%, #e91e8c 70%, #00c6ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            ANIBD
          </h1>
          <p style={{
            fontSize: '16px', color: 'var(--text-soft)',
            maxWidth: '480px', margin: '0 auto 32px',
            lineHeight: '1.7',
          }}>
            Weekly anime schedule, upcoming season preview, এবং top ranking — সব এক জায়গায়, বাংলায়।
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/schedule" style={{
              padding: '12px 28px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #e91e8c, #7c3aed)',
              color: 'white', fontWeight: '700', fontSize: '14px',
            }}>📅 এই সপ্তাহের Schedule</Link>
            <Link href="/ranking" style={{
              padding: '12px 28px', borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.05)',
              color: 'white', fontWeight: '700', fontSize: '14px',
            }}>🏆 Top Ranking</Link>
          </div>
        </section>

        {/* Currently Airing */}
        <Section
          title="এখন চলছে"
          subtitle="Currently Airing"
          icon="📺"
          href="/schedule"
          linkLabel="সব দেখুন →"
        >
          <GridLayout>
            {(airingAnime || []).slice(0, 6).map((anime, i) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </GridLayout>
        </Section>

        {/* Top Ranking */}
        <Section
          title="সেরা Anime"
          subtitle="All Time Top Ranking"
          icon="🏆"
          href="/ranking"
          linkLabel="Full Ranking →"
        >
          <GridLayout>
            {(topAnime || []).slice(0, 6).map((anime, i) => (
              <AnimeCard key={anime.mal_id} anime={anime} rank={i + 1} />
            ))}
          </GridLayout>
        </Section>

        {/* Upcoming */}
        <Section
          title="আসছে শীঘ্রই"
          subtitle="Upcoming Anime"
          icon="🔜"
          href="/upcoming"
          linkLabel="সব দেখুন →"
        >
          <GridLayout>
            {(upcomingAnime || []).slice(0, 6).map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </GridLayout>
        </Section>

      </main>

      <Footer />
    </>
  )
}

function Section({ title, subtitle, icon, href, linkLabel, children }) {
  return (
    <section style={{ marginBottom: '64px' }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '2px', fontWeight: '600', marginBottom: '4px' }}>
            {icon} {subtitle}
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800' }}>{title}</h2>
        </div>
        <Link href={href} style={{
          padding: '8px 16px', borderRadius: '8px',
          border: '1px solid rgba(233,30,140,0.3)',
          color: '#e91e8c', fontSize: '13px', fontWeight: '600',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(233,30,140,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          {linkLabel}
        </Link>
      </div>
      {children}
    </section>
  )
}

function GridLayout({ children }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
      gap: '16px',
    }}>
      {children}
    </div>
  )
}

export async function getStaticProps() {
  try {
    const [topRes, airingRes, upcomingRes] = await Promise.all([
      fetch('https://api.jikan.moe/v4/top/anime?limit=12&filter=bypopularity'),
      fetch('https://api.jikan.moe/v4/seasons/now?limit=12'),
      fetch('https://api.jikan.moe/v4/seasons/upcoming?limit=12'),
    ])

    const [topData, airingData, upcomingData] = await Promise.all([
      topRes.json(),
      airingRes.json(),
      upcomingRes.json(),
    ])

    return {
      props: {
        topAnime: topData.data || [],
        airingAnime: airingData.data || [],
        upcomingAnime: upcomingData.data || [],
      },
      revalidate: 3600, // ISR: revalidate every hour
    }
  } catch (e) {
    return {
      props: { topAnime: [], airingAnime: [], upcomingAnime: [] },
      revalidate: 60,
    }
  }
}
