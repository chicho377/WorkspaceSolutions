import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'

export default function Login({ user }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  if (user) { router.replace('/comunidad'); return null }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message === 'Invalid login credentials' ? 'Correo o contraseña incorrectos.' : error.message) }
    else router.push('/comunidad')
    setLoading(false)
  }

  return (
    <>
      <Head><title>Ingresar · Workspace Solutions</title></Head>
      <Navbar user={user} />
      <div style={{ minHeight: 'calc(100vh - 64px)', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: 'white', borderRadius: 24, padding: 'clamp(2rem,5vw,3rem)', width: '100%', maxWidth: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.08)', border: '1.5px solid rgba(0,0,0,0.06)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.4rem' }}>
              Bienvenido<span style={{ color: 'var(--sage-dark)' }}>.</span>
            </div>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>Ingresá a tu cuenta de Workspace Solutions</p>
          </div>

          {error && (
            <div style={{ background: 'rgba(196,113,74,0.1)', border: '1px solid rgba(196,113,74,0.3)', color: 'var(--terracotta)', padding: '0.85rem 1rem', borderRadius: 10, marginBottom: '1.5rem', fontSize: '0.88rem' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label className="form-label">Correo electrónico</label>
              <input className="form-input" type="email" placeholder="tu@correo.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="form-label">Contraseña</label>
              <input className="form-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', marginTop: '0.5rem' }}>
              {loading ? <><span className="spinner"/>Ingresando...</> : 'Ingresar →'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.8rem', fontSize: '0.88rem', color: '#999' }}>
            ¿No tenés cuenta?{' '}
            <Link href="/registro" style={{ color: 'var(--sage-dark)', fontWeight: 700 }}>Registrate gratis</Link>
          </div>
        </div>
      </div>
    </>
  )
}
