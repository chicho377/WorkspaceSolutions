import Head from 'next/head'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Toast from '../components/Toast'

export default function Contacto({ user }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', profile: '', plan: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate send (in production: use Resend, Formspree, or Supabase edge function)
    await new Promise(r => setTimeout(r, 1200))
    setToast({ message: '¡Mensaje enviado! Te contactamos en menos de 24h. 🎉', type: 'success' })
    setForm({ name: '', email: '', phone: '', profile: '', plan: '', message: '' })
    setLoading(false)
  }

  return (
    <>
      <Head><title>Contacto · Workspace Solutions</title></Head>
      <Navbar user={user} />

      <div style={{ background: 'var(--charcoal)', padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,4vw,5rem)' }}>
        <div className="section-label" style={{ color: 'var(--sage-light)' }}>Contacto</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginTop: '0.5rem' }}>
          Hablemos de<br/><em style={{ color: 'var(--sage-light)' }}>tu espacio.</em>
        </h1>
      </div>

      <section style={{ background: 'var(--cream)', padding: 'clamp(3rem,6vw,6rem) clamp(1.5rem,4vw,5rem)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(2rem,5vw,5rem)', alignItems: 'start' }} className="contact-grid">
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Primera sesión<br/><em style={{ color: 'var(--sage-dark)', fontStyle: 'italic' }}>100% gratis.</em>
          </h2>
          <p style={{ color: '#666', lineHeight: 1.75, marginBottom: '2.5rem', fontSize: '0.95rem' }}>
            Completá el formulario y en menos de 24 horas hábiles te contactamos para agendar tu diagnóstico gratuito de 30 minutos. Sin compromisos.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
            {[
              { icon: '📧', title: 'Correo electrónico', val: 'hola@workspacesolutions.cr' },
              { icon: '💬', title: 'WhatsApp', val: '+506 8888-8888' },
              { icon: '📍', title: 'Cobertura presencial', val: 'San José, Heredia, Alajuela, Cartago' },
              { icon: '🕐', title: 'Horario', val: 'Lunes a Viernes, 8:00 am – 6:00 pm' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(122,158,135,0.12)', color: 'var(--sage-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.15rem' }}>{item.title}</div>
                  <div style={{ fontSize: '0.88rem', color: '#777' }}>{item.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 24, padding: 'clamp(1.5rem,4vw,2.5rem)', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1.5px solid rgba(0,0,0,0.06)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div><label className="form-label">Nombre</label><input className="form-input" type="text" placeholder="Tu nombre" value={form.name} onChange={set('name')} required /></div>
              <div><label className="form-label">Correo</label><input className="form-input" type="email" placeholder="tu@correo.com" value={form.email} onChange={set('email')} required /></div>
            </div>
            <div><label className="form-label">Teléfono (opcional)</label><input className="form-input" type="tel" placeholder="+506 0000-0000" value={form.phone} onChange={set('phone')} /></div>
            <div>
              <label className="form-label">Soy...</label>
              <select className="form-input" value={form.profile} onChange={set('profile')} required>
                <option value="">Seleccioná tu perfil</option>
                <option>Freelancer / Teletrabajador</option>
                <option>Representante de empresa (PyME)</option>
                <option>Institución educativa</option>
                <option>Otro</option>
              </select>
            </div>
            <div>
              <label className="form-label">Plan de interés</label>
              <select className="form-input" value={form.plan} onChange={set('plan')}>
                <option value="">¿Qué plan te interesa?</option>
                <option>Plan Básico (₡30.000)</option>
                <option>Plan Profesional (₡60.000)</option>
                <option>Plan Corporativo (₡150.000)</option>
                <option>Diagnóstico gratuito primero</option>
              </select>
            </div>
            <div>
              <label className="form-label">Mensaje</label>
              <textarea className="form-input" placeholder="Contanos brevemente sobre tu espacio de trabajo y lo que te gustaría mejorar..." value={form.message} onChange={set('message')} rows={4} style={{ resize: 'vertical' }} required />
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '0.95rem', marginTop: '0.3rem' }}>
              {loading ? <><span className="spinner"/>Enviando...</> : 'Enviar mensaje 📤'}
            </button>
            <p style={{ fontSize: '0.75rem', color: '#bbb', textAlign: 'center', lineHeight: 1.5 }}>Tu información es privada y nunca será compartida con terceros.</p>
          </form>
        </div>
      </section>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <style jsx>{`
        @media(max-width:768px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  )
}
