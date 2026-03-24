import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'

const recursos = [
  { cat: '💡 Guía', title: 'Cómo elegir la iluminación ideal para tu espacio de trabajo', desc: 'La luz afecta directamente la concentración y el estado de ánimo. Descubrí cuál es la mejor configuración según tus necesidades.', time: '5 min de lectura', tag: 'Ambiente' },
  { cat: '🧠 TEA & TDAH', title: 'Guía práctica para crear un espacio sensorial amigable', desc: 'Estrategias concretas para reducir distracciones, organizar el entorno y crear rutinas que favorezcan la concentración.', time: '8 min de lectura', tag: 'Neurodiversidad' },
  { cat: '📋 Checklist', title: 'Lista de verificación: evaluá tu espacio de trabajo hoy', desc: 'Descargá nuestra checklist gratuita con 30 puntos para evaluar el estado actual de tu entorno laboral.', time: 'Descargable', tag: 'Herramientas' },
  { cat: '🌡️ Temperatura', title: 'La temperatura perfecta para trabajar y por qué importa', desc: 'Estudios muestran que la temperatura del ambiente puede reducir la productividad hasta en un 25%. Aprendé a controlarlo.', time: '4 min de lectura', tag: 'Ambiente' },
  { cat: '🎧 Ruido', title: 'Manejo del ruido en el hogar y la oficina', desc: 'Desde cancelación de ruido hasta ruido blanco: todo lo que necesitás saber para trabajar con el nivel sonoro correcto.', time: '6 min de lectura', tag: 'Sensorial' },
  { cat: '🏢 Empresas', title: 'Cómo presentar una propuesta de mejora sensorial a tu empresa', desc: 'Template y guía para que profesionales de RRHH o empleados puedan proponer cambios de entorno a sus organizaciones.', time: 'Template descargable', tag: 'Empresas' },
]

export default function Recursos({ user }) {
  return (
    <>
      <Head><title>Recursos · Workspace Solutions</title></Head>
      <Navbar user={user} />

      <div style={{ background: 'var(--charcoal)', padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,4vw,5rem)' }}>
        <div className="section-label" style={{ color: 'var(--sage-light)' }}>Biblioteca gratuita</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem,5vw,4rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginTop: '0.5rem', maxWidth: 600 }}>
          Recursos para<br/><em style={{ color: 'var(--sage-light)' }}>transformar tu espacio.</em>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', marginTop: '1rem', fontSize: '0.95rem', maxWidth: 480, lineHeight: 1.7 }}>
          Guías, checklists y artículos creados por nuestro equipo de especialistas. Completamente gratis para vos.
        </p>
      </div>

      <section style={{ background: 'var(--warm-white)', padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,4vw,5rem)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '1.5rem' }}>
          {recursos.map((r, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: 20, padding: '1.8rem',
              border: '1.5px solid rgba(0,0,0,0.06)', cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 16px 50px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = 'var(--sage-light)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--sage-dark)', background: 'rgba(122,158,135,0.1)', padding: '0.25rem 0.7rem', borderRadius: 100 }}>{r.tag}</span>
                <span style={{ fontSize: '0.72rem', color: '#ccc' }}>{r.time}</span>
              </div>
              <div style={{ fontSize: '0.78rem', color: '#bbb', marginBottom: '0.4rem', fontWeight: 600 }}>{r.cat}</div>
              <h3 style={{ fontWeight: 800, fontSize: '0.97rem', lineHeight: 1.4, marginBottom: '0.6rem', color: 'var(--charcoal)' }}>{r.title}</h3>
              <p style={{ fontSize: '0.83rem', color: '#888', lineHeight: 1.6 }}>{r.desc}</p>
              <div style={{ marginTop: '1.2rem', fontSize: '0.82rem', fontWeight: 700, color: 'var(--sage-dark)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                Leer más →
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: 'var(--charcoal)', borderRadius: 24, padding: 'clamp(2rem,4vw,3rem)', marginTop: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem,3vw,2.2rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.02em' }}>
            ¿Querés resultados personalizados?
          </div>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', maxWidth: 420, lineHeight: 1.7 }}>
            Los recursos son el primer paso. La consultoría hace que los cambios realmente ocurran.
          </p>
          <Link href="/contacto" className="btn-primary" style={{ background: 'var(--sage-dark)', padding: '0.9rem 2rem' }}>
            Agendar diagnóstico gratis →
          </Link>
        </div>
      </section>
    </>
  )
}
