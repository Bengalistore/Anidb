import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import AnimeCard from '../components/AnimeCard'
import Footer from '../components/Footer'

export default function Search() {
  const router = useRouter()
  const { q } = router.query
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (!q) return
    setLoading(true)
    setSearched(false)
    fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(q)}&limit=20&sfw=true`)
      .then(r => r.json())
      .then(data => {
        setResults(data.data || [])
        setLoading(false)
        setSearched(true)
      })
      .catch(() => {
        setLoading(false)
        setSearched(true)
      })
  }, [q])

  return (
    <>
      <Head>
        <title>{q ? `"${q}" — Search` : 'Search'} | AniBD</title>
        <meta name="description" content={`"${q}" সার্চের ফলাফল — AniBD Anime Database`} />
      </Head>
      <Navbar />

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '12px', color: '#e91e8c', letterSpacing: '2px', fontWeight: '700', marginBottom: '8px' }}>🔍 SEARCH RESULTS</div>
          <h1 style={{ fontSize: '28px', fontWeight: '800' }}>
            {q ? `"${q}"` : 'Search'} এর ফলাফল
          </h1>
          {searched && <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '6px' }}>{results.length} টি anime পাওয়া গেছে</p>}
        </div>

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px' }}>
            <div className="spinner" />
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <p style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>কোনো ফলাফল পাওয়া যায়নি</p>
            <p>অন্য keyword দিয়ে আবার চেষ্টা করুন</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '16px',
          }}>
            {results.map(anime => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}
