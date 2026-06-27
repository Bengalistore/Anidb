import Head from 'next/head'
import Navbar from '../components/Navbar'
import AnimeCard from '../components/AnimeCard'
import Footer from '../components/Footer'

export default function Upcoming({ upcoming }) {
  return (
    <>
      <Head>
        <title>Upcoming Anime ২০২৬ | AniBD</title>
        <meta name="description" content="আগামী সিজনের সব upcoming anime-এর তালিকা। কোন anime আসছে শীঘ্রই জেনে নিন।" />
      </Head>
      <Navbar />

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: '12px', color: '#e91e8c', letterSpacing: '2px', fontWeight: '700', marginBottom: '8px' }}>🔜 COMING SOON</div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Upcoming Anime</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>আগামী সিজনে যেসব anime আসছে — এখনই জেনে রাখুন</p>
        </div>

        {upcoming.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔜</div>
            <p>Data load হচ্ছে...</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '16px',
          }}>
            {upcoming.map(anime => (
              <AnimeCard key={anime.mal_id} anime={anime} />
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
    const res = await fetch('https://api.jikan.moe/v4/seasons/upcoming?limit=24')
    const data = await res.json()
    return {
      props: { upcoming: data.data || [] },
      revalidate: 3600,
    }
  } catch (e) {
    return { props: { upcoming: [] }, revalidate: 60 }
  }
}
