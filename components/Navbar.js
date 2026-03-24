import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabase'

export default function Navbar({ user }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setLoggingOut(true)
    await supabase.auth.signOut()
    router.push('/')
    setLoggingOut(false)
  }

  const isActive = (path) => router.pathname === path || router.pathname.startsWith(path + '/')

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 900,
        background: 'rgba(250,248,244,0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '0 2rem',
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: 'var(--charcoal)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.85rem', color: 'white', fontWeight: 700,
          }}>WS</div>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem',
            color: 'var(--charcoal)', letterSpacing: '-0.02em',
          }}>
            Workspace<span style={{ color: 'var(--sage)' }}>.</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hide-mobile">
          {[
            { href: '/', label: 'Inicio' },
            { href: '/comunidad', label: 'Comunidad' },
            { href: '/recursos', label: 'Recursos' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} style={{
              padding: '0.5rem 0.85rem',
              borderRadius: 8,
              fontSize: '0.88rem',
              fontWeight: 500,
              color: isActive(href) ? 'var(--sage-dark)' : '#555',
              background: isActive(href) ? 'rgba(122,158,135,0.1)' : 'transparent',
              transition: 'all 0.2s',
              textDecoration: 'none',
            }}>
              {label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="hide-mobile">
          {user ? (
            <>
              <Link href="/comunidad" style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.4rem 0.75rem', borderRadius: 100,
                background: 'rgba(122,158,135,0.1)', color: 'var(--sage-dark)',
                fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none',
              }}>
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.user_metadata?.display_name || user.email)}&background=4d7360&color=fff&size=64`}
                  alt="avatar"
                  style={{ width: 24, height: 24, borderRadius: '50%' }}
                />
                {user.user_metadata?.display_name || user.email.split('@')[0]}
              </Link>
              <button onClick={handleLogout} disabled={loggingOut} style={{
                padding: '0.5rem 1rem', borderRadius: 100,
                border: '1.5px solid rgba(0,0,0,0.12)',
                background: 'transparent', fontSize: '0.85rem',
                fontWeight: 600, color: '#888', cursor: 'pointer',
                transition: 'all 0.2s',
              }}>
                {loggingOut ? 'Saliendo...' : 'Salir'}
              </button>
            </>
          ) : (
            <>
              <Link href="/login" style={{
                padding: '0.55rem 1.2rem', borderRadius: 100,
                border: '1.5px solid rgba(0,0,0,0.12)',
                background: 'transparent', fontSize: '0.88rem',
                fontWeight: 600, color: 'var(--charcoal)',
                textDecoration: 'none', transition: 'all 0.2s',
              }}>
                Ingresar
              </Link>
              <Link href="/registro" style={{
                padding: '0.55rem 1.2rem', borderRadius: 100,
                background: 'var(--charcoal)', color: 'white',
                fontSize: '0.88rem', fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.2s',
              }}>
                Unirme gratis
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          display: 'none', background: 'none', border: 'none',
          fontSize: '1.4rem', cursor: 'pointer', color: 'var(--charcoal)',
          padding: '0.5rem',
        }} className="show-mobile">
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 899,
          background: 'var(--warm-white)',
          paddingTop: '80px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '1.5rem', padding: '5rem 2rem 2rem',
        }}>
          {[
            { href: '/', label: 'Inicio' },
            { href: '/comunidad', label: 'Comunidad' },
            { href: '/recursos', label: 'Recursos' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{
              fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700,
              color: 'var(--charcoal)', textDecoration: 'none',
            }}>
              {label}
            </Link>
          ))}
          <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', width: '100%', margin: '0.5rem 0' }}/>
          {user ? (
            <button onClick={handleLogout} style={{
              padding: '0.75rem 2rem', borderRadius: 100,
              background: 'var(--charcoal)', color: 'white',
              border: 'none', fontSize: '1rem', fontWeight: 600, cursor: 'pointer',
            }}>Cerrar sesión</button>
          ) : (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)} style={{
                padding: '0.75rem 2rem', borderRadius: 100,
                border: '1.5px solid var(--charcoal)', color: 'var(--charcoal)',
                fontWeight: 600, textDecoration: 'none',
              }}>Ingresar</Link>
              <Link href="/registro" onClick={() => setMenuOpen(false)} style={{
                padding: '0.75rem 2rem', borderRadius: 100,
                background: 'var(--charcoal)', color: 'white',
                fontWeight: 600, textDecoration: 'none',
              }}>Unirme gratis</Link>
            </>
          )}
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: 64 }} />

      <style jsx global>{`
        @media(max-width:768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media(min-width:769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}
