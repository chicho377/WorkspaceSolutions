import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'

export default function Registro({ user }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  if (user) { router.replace('/comunidad'); return null }

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Las contraseñas no coinciden.'); return }
    if (form.password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres.'); return }
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: { display_name: form.name, role: form.role } }
    })
    if (error) setError(error.message)
    else setSuccess(true)
    setLoading(false)
  }

  if (success) return (
    <>
      <Head><title>Registro exitoso · Workspace Solutions</title></Head>
      <Navbar user={user} />
      <div style={{ minHeight: 'calc(100vh - 64px)', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: 'white', borderRadius: 24, padding: '3rem', maxWidth: 440, textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.8rem' }}>¡Bienvenido/a!</h2>
          <p style={{ color: '#666', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Te enviamos un correo de confirmación a <strong>{form.email}</strong>. Revisá tu bandeja y confirmá tu cuenta para ingresar.
          </p>
          <Link href="/login" className="btn-primary" style={{ display: 'inline-flex', justifyContent: 'center', padding: '0.9rem 2rem' }}>
            Ir a ingresar
          </Link>
        </div>
      </div>
    </>
  )

  return (
    <>
      <Head><title>Crear cuenta · Workspace Solutions</title></Head>
      <Navbar user={user} />
      <div style={{ minHeight: 'calc(100vh - 64px)', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: 'white', borderRadius: 24, padding: 'clamp(2rem,5vw,3rem)', width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.08)', border: '1.5px solid rgba(0,0,0,0.06)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.4rem' }}>
              Únete gratis<span style={{ color: 'var(--sage-dark)' }}>.</span>
            </div>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>Crea tu cuenta y accede a la comunidad</p>
          </div>

          {error && (
            <div style={{ background: 'rgba(196,113,74,0.1)', border: '1px solid rgba(196,113,74,0.3)', color: 'var(--terracotta)', padding: '0.85rem 1rem', borderRadius: 10, marginBottom: '1.5rem', fontSize: '0.88rem' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div>
              <label className="form-label">Nombre completo</label>
              <input className="form-input" type="text" placeholder="Tu nombre" value={form.name} onChange={set('name')} required />
            </div>
            <div>
              <label className="form-label">Correo electrónico</label>
              <input className="form-input" type="email" placeholder="tu@correo.com" value={form.email} onChange={set('email')} required />
            </div>
            <div>
              <label className="form-label">Soy...</label>
              <select className="form-input" value={form.role} onChange={set('role')} required>
                <option value="">Seleccioná tu perfil</option>
                <option value="freelancer">Freelancer / Teletrabajador</option>
                <option value="empresa">Representante de empresa</option>
                <option value="educativo">Institución educativa</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div>
              <label className="form-label">Contraseña</label>
              <input className="form-input" type="password" placeholder="Mínimo 6 caracteres" value={form.password} onChange={set('password')} required />
            </div>
            <div>
              <label className="form-label">Confirmar contraseña</label>
              <input className="form-input" type="password" placeholder="Repetí tu contraseña" value={form.confirm} onChange={set('confirm')} required />
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', marginTop: '0.5rem' }}>
              {loading ? <><span className="spinner"/>Creando cuenta...</> : 'Crear mi cuenta →'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.8rem', fontSize: '0.88rem', color: '#999' }}>
            ¿Ya tenés cuenta?{' '}
            <Link href="/login" style={{ color: 'var(--sage-dark)', fontWeight: 700 }}>Ingresar</Link>
          </div>
        </div>
      </div>
    </>
  )
}
