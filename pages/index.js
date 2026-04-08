import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import { useState, useEffect, useRef } from 'react'

export default function Home({ user }) {
  const [scrolled, setScrolled] = useState(false)
  const [heroVisible, setHeroVisible] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const observerRef = useRef(null)

  useEffect(() => {
    setHeroVisible(true)
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)

    // Intersection observer for reveal animations
    observerRef.current = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.reveal').forEach(el => observerRef.current.observe(el))

    return () => {
      window.removeEventListener('scroll', onScroll)
      observerRef.current?.disconnect()
    }
  }, [])

  const faqs = [
    { q: '¿Necesito tener un diagnóstico médico previo?', a: 'No. Nuestros servicios están disponibles para cualquier persona que quiera mejorar su entorno de trabajo, independientemente de si tiene o no un diagnóstico. Muchas personas sin diagnóstico formal tienen necesidades sensoriales que afectan su productividad.' },
    { q: '¿Cómo funciona la sesión de diagnóstico gratuita?', a: 'Es una videollamada de 30 minutos donde conversamos sobre tus necesidades, tu espacio actual y qué tipo de consultoría sería más beneficiosa para vos. Sin compromiso, sin costos ocultos.' },
    { q: '¿Trabajan fuera del GAM?', a: 'Las evaluaciones presenciales están disponibles en San José, Heredia, Alajuela y Cartago. Para otras zonas del país ofrecemos el servicio 100% virtual, que funciona igual de bien para la mayoría de los casos.' },
    { q: '¿Qué pasa si no noto cambios?', a: 'Nuestra metodología incluye seguimiento para asegurarnos de que los cambios sean reales. Si algo no está funcionando, revisamos el plan y ajustamos. Tu satisfacción es nuestra prioridad absoluta.' },
    { q: '¿Sirve para personas con TEA, TDAH u otras condiciones?', a: 'Absolutamente. De hecho, es donde más impacto generamos. Nuestro equipo está especialmente entrenado para trabajar con personas neurodivergentes y diseñar entornos que respeten sus necesidades específicas.' },
    { q: '¿Puedo cambiar de plan más adelante?', a: 'Sí. Muchos clientes comienzan con el plan Básico para conocer el servicio y luego migran al Profesional. Siempre podés hacer upgrade y te descontamos el monto ya pagado del plan anterior.' },
  ]

  return (
    <>
      <Head>
        <title>Workspace Solutions · Consultoría Sensorial en Costa Rica</title>
        <meta name="description" content="La única consultora en Costa Rica especializada en optimización sensorial de entornos laborales y educativos. Diagnóstico, plan de acción y seguimiento real." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌿</text></svg>" />
      </Head>

      <Navbar user={user} />

      {/* ── HERO ── */}
      <section style={{
        minHeight: 'calc(100vh - 64px)',
        background: 'var(--cream)',
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(122,158,135,0.12) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(196,113,74,0.08) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}/>
        {/* Dot pattern */}
        <div style={{
          position: 'absolute', top: '10%', right: '4%',
          width: 180, height: 180,
          backgroundImage: 'radial-gradient(circle, rgba(122,158,135,0.35) 1.5px, transparent 1.5px)',
          backgroundSize: '20px 20px',
        }}/>

        <div style={{ padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,4vw,5rem)', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(122,158,135,0.12)', border: '1px solid rgba(122,158,135,0.3)',
            color: 'var(--sage-dark)', fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            padding: '0.45rem 1rem', borderRadius: 100, marginBottom: '1.8rem',
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.2s',
          }}>
            <span style={{ width: 6, height: 6, background: 'var(--sage)', borderRadius: '50%', animation: 'pulse 2s infinite' }}/>
            Consultoría sensorial · Costa Rica
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem,5.5vw,5rem)',
            fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em',
            color: 'var(--charcoal)', marginBottom: '1.5rem',
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(30px)',
            transition: 'all 0.7s ease 0.4s',
          }}>
            Tu espacio de trabajo<br/>
            <em style={{ fontStyle: 'italic', color: 'var(--sage-dark)' }}>cambia</em> todo lo<br/>
            <span style={{ color: 'var(--terracotta)' }}>demás.</span>
          </h1>

          <p style={{
            fontSize: '1.05rem', lineHeight: 1.75, color: '#666',
            maxWidth: 480, marginBottom: '2.5rem', fontWeight: 300,
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.6s',
          }}>
            Transformamos entornos laborales para que cada persona pueda dar lo mejor de sí. Diagnóstico especializado, plan de acción y seguimiento real.
          </p>

          <div style={{
            display: 'flex', gap: '1rem', flexWrap: 'wrap',
            opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.8s',
          }}>
            <Link href="/contacto" className="btn-primary" style={{ padding: '0.95rem 2rem', fontSize: '0.95rem' }}>
              Agenda tu diagnóstico →
            </Link>
            <Link href="/comunidad" className="btn-secondary" style={{ padding: '0.95rem 2rem', fontSize: '0.95rem' }}>
              💬 Ver la comunidad
            </Link>
          </div>
        </div>

        {/* Hero image */}
        <div style={{ height: '100%', minHeight: '60vh', position: 'relative', overflow: 'hidden' }} className="hide-mobile">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&fit=crop"
            alt="Oficina moderna"
            style={{
              width: '92%', height: '80vh', objectFit: 'cover',
              borderRadius: '24px 0 0 24px', display: 'block',
              boxShadow: '-20px 20px 60px rgba(0,0,0,0.15)',
              opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateX(40px)',
              transition: 'all 0.9s ease 0.5s',
            }}
          />
          {/* Float cards */}
          {[
            { style: { bottom: '22%', left: '-2%' }, icon: '🧠', stat: '+80%', label: 'mejora en concentración', delay: '0.9s' },
            { style: { top: '22%', left: '4%' }, icon: '⭐', stat: '90%', label: 'satisfacción garantizada', delay: '1.1s' },
          ].map((c, i) => (
            <div key={i} style={{
              position: 'absolute', ...c.style,
              background: 'white', borderRadius: 16, padding: '1rem 1.2rem',
              boxShadow: '0 16px 50px rgba(0,0,0,0.12)',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(20px)',
              transition: `all 0.7s ease ${c.delay}`,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10, fontSize: '1.2rem',
                background: 'rgba(122,158,135,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{c.icon}</div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--charcoal)' }}>{c.stat}</div>
                <div style={{ fontSize: '0.75rem', color: '#999' }}>{c.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ background: 'var(--charcoal)', padding: '3rem 2rem', display: 'flex', justifyContent: 'center', gap: 'clamp(2rem,6vw,6rem)', flexWrap: 'wrap' }}>
        {[
          { num: '3', suf: ' planes', label: 'Adaptados a tu necesidad' },
          { num: '100', suf: '%', label: 'Especialistas certificados' },
          { num: 'GAM', suf: '+', label: 'Cobertura presencial' },
          { num: '1°', suf: '', label: 'Consultora sensorial en CR' },
        ].map((s, i) => (
          <div key={i} className="reveal" style={{ textAlign: 'center', transitionDelay: `${i * 0.1}s` }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: 'var(--cream)', lineHeight: 1 }}>
              {s.num}<span style={{ color: 'var(--sage-light)' }}>{s.suf}</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── ABOUT ── */}
      <section style={{ background: 'var(--warm-white)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,4vw,5rem)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(3rem,6vw,6rem)', alignItems: 'center' }} className="about-grid">
        <div className="reveal" style={{ position: 'relative', height: 'clamp(350px,50vw,580px)' }}>
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&q=80&fit=crop" alt="Equipo" style={{ position: 'absolute', width: '72%', height: '75%', top: 0, left: 0, objectFit: 'cover', borderRadius: 20, boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}/>
          <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80&fit=crop" alt="Consultora" style={{ position: 'absolute', width: '55%', height: '60%', bottom: 0, right: 0, objectFit: 'cover', borderRadius: 20, border: '6px solid var(--warm-white)', boxShadow: '0 20px 60px rgba(0,0,0,0.12)' }}/>
          <div style={{ position: 'absolute', top: '50%', right: '-2rem', transform: 'translateY(-50%)', background: 'var(--sage-dark)', color: 'white', borderRadius: 16, padding: '1.2rem 1.4rem', textAlign: 'center', boxShadow: '0 10px 40px rgba(77,115,96,0.3)', zIndex: 2 }}>
            <strong style={{ display: 'block', fontSize: '2rem', fontFamily: 'var(--font-display)' }}>2026</strong>
            <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Desde</span>
          </div>
        </div>

        <div>
          <div className="section-label reveal">Quiénes somos</div>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.2rem' }}>
            Vemos lo que<br/><em style={{ fontStyle: 'italic', color: 'var(--sage-dark)' }}>otros no ven.</em>
          </h2>
          <p className="reveal" style={{ fontSize: '1rem', lineHeight: 1.75, color: '#666', marginBottom: '2rem', fontWeight: 300 }}>
            Somos la única consultora en Costa Rica especializada en la dimensión sensorial del entorno laboral. Nuestro equipo está formado por técnicos entrenados por profesionales en psicología y psiquiatría.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              { icon: '🧠', title: 'Respaldo científico', desc: 'Formados por psicólogos y psiquiatras especializados.' },
              { icon: '📋', title: 'Diagnóstico real', desc: 'Evaluamos luz, ruido, temperatura y organización.' },
              { icon: '🔄', title: 'Seguimiento continuo', desc: 'Acompañamos hasta ver los cambios reales.' },
              { icon: '🌐', title: 'Modelo mixto', desc: 'Virtual o presencial en todo el GAM.' },
            ].map((p, i) => (
              <div key={i} className="reveal" style={{
                padding: '1.2rem', background: 'var(--cream)', borderRadius: 14,
                borderLeft: '4px solid var(--sage-light)',
                transitionDelay: `${i * 0.1}s`,
              }}>
                <div style={{ fontSize: '1.3rem', marginBottom: '0.4rem' }}>{p.icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{p.title}</div>
                <div style={{ fontSize: '0.8rem', color: '#777', lineHeight: 1.5 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES / PLANS ── */}
      <section style={{ background: 'var(--cream)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,4vw,5rem)' }} id="servicios">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div className="section-label reveal">Nuestros planes</div>
            <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              Elige tu<br/><em style={{ fontStyle: 'italic', color: 'var(--sage-dark)' }}>camino.</em>
            </h2>
          </div>
          <p className="reveal" style={{ fontSize: '0.95rem', color: '#666', maxWidth: 340, lineHeight: 1.7, fontWeight: 300 }}>
            Tres planes para distintos momentos y necesidades. Todos incluyen atención personalizada.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
          {[
            {
              tag: 'Básico', tagStyle: { background: 'rgba(122,158,135,0.15)', color: 'var(--sage-dark)' },
              name: 'Esencial', price: '30.000', note: 'pago único · por persona',
              features: ['Cuestionario de diagnóstico sensorial', 'Reporte escrito con recomendaciones', 'Acceso a biblioteca de recursos digitales', 'Sesión de orientación 30 min (video)'],
              btnLabel: 'Comenzar ahora', featured: false,
            },
            {
              tag: 'Profesional ⭐ Más popular', tagStyle: { background: 'rgba(201,168,76,0.2)', color: '#8a6e1a' },
              name: 'Pro', price: '60.000', note: 'incluye seguimiento · 3 meses',
              features: ['Todo lo del plan Básico', 'Evaluación presencial del espacio', 'Plan de acción personalizado', 'Seguimiento mensual (3 meses)', 'Acceso a comunidad exclusiva'],
              btnLabel: 'Quiero este plan', featured: true,
            },
            {
              tag: 'Corporativo', tagStyle: { background: 'rgba(196,113,74,0.12)', color: 'var(--terracotta)' },
              name: 'Enterprise', price: '150.000', note: 'hasta 20 personas · 1 año',
              features: ['Evaluación grupal hasta 20 personas', 'Taller presencial de 4 horas', 'Seguimiento trimestral 12 meses', 'Asesoría ilimitada por email', 'Reporte ejecutivo para dirección'],
              btnLabel: 'Cotizar para mi empresa', featured: false,
            },
          ].map((plan, i) => (
            <div key={i} className="reveal" style={{
              background: plan.featured ? 'var(--charcoal)' : 'white',
              borderRadius: 24, padding: '2.2rem',
              border: `1.5px solid ${plan.featured ? 'transparent' : 'rgba(0,0,0,0.07)'}`,
              position: 'relative', overflow: 'hidden',
              transition: 'transform 0.4s, box-shadow 0.4s',
              transitionDelay: `${i * 0.1}s`,
            }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: plan.featured ? 'var(--gold)' : 'var(--sage-light)' }}/>
              <div style={{ display: 'inline-block', ...plan.tagStyle, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.3rem 0.75rem', borderRadius: 100, marginBottom: '1.2rem' }}>{plan.tag}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 900, color: plan.featured ? 'white' : 'var(--charcoal)', marginBottom: '0.4rem' }}>{plan.name}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 900, color: plan.featured ? 'white' : 'var(--charcoal)' }}>₡{plan.price}</div>
              <div style={{ fontSize: '0.8rem', color: plan.featured ? 'rgba(255,255,255,0.5)' : '#999', marginBottom: '1.5rem' }}>{plan.note}</div>
              <div style={{ height: 1, background: plan.featured ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.07)', margin: '1.2rem 0' }}/>
              {plan.features.map((f, j) => (
                <div key={j} style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start', fontSize: '0.87rem', marginBottom: '0.75rem', color: plan.featured ? 'rgba(255,255,255,0.8)' : 'var(--charcoal)', lineHeight: 1.5 }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: plan.featured ? 'rgba(201,168,76,0.2)' : 'rgba(122,158,135,0.15)', color: plan.featured ? 'var(--gold)' : 'var(--sage-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', flexShrink: 0, marginTop: 1 }}>✓</span>
                  {f}
                </div>
              ))}
              <Link href="/contacto" style={{
                display: 'block', textAlign: 'center', marginTop: '1.8rem',
                padding: '0.85rem', borderRadius: 100, fontWeight: 700, fontSize: '0.9rem',
                background: plan.featured ? 'var(--cream)' : 'var(--charcoal)',
                color: plan.featured ? 'var(--charcoal)' : 'white',
                transition: 'all 0.3s',
              }}>
                {plan.btnLabel}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── SEGMENTS ── */}
      <section style={{ background: 'var(--warm-white)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,4vw,5rem)' }}>
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 3rem' }}>
          <div className="section-label reveal" style={{ justifyContent: 'center' }}>A quién ayudamos</div>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 900, letterSpacing: '-0.03em' }}>
            Cada espacio,<br/><em style={{ fontStyle: 'italic', color: 'var(--sage-dark)' }}>cada persona.</em>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
          {[
            { tag: 'Segmento 01', title: 'Freelancers & Teletrabajadores', desc: 'Tu hogar es tu oficina. Optimizamos cada detalle para que concentración y bienestar convivan.', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&q=80&fit=crop' },
            { tag: 'Segmento 02', title: 'PyMEs & Empresas', desc: 'Equipos más felices, empresas más productivas. Transformamos oficinas en espacios donde la gente quiere estar.', img: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=700&q=80&fit=crop' },
            { tag: 'Segmento 03', title: 'Instituciones Educativas', desc: 'Bibliotecas y espacios colaborativos diseñados para que cada estudiante encuentre su ritmo.', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=80&fit=crop' },
          ].map((s, i) => (
            <div key={i} className="reveal" style={{ borderRadius: 24, overflow: 'hidden', position: 'relative', height: 400, transitionDelay: `${i * 0.1}s` }}>
              <img src={s.img} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                onMouseLeave={e => e.target.style.transform = ''}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,26,46,0.88) 0%, rgba(26,26,46,0.2) 60%, transparent 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.8rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage-light)', marginBottom: '0.5rem' }}>{s.tag}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'white', fontWeight: 700, marginBottom: '0.5rem' }}>{s.title}</div>
                <div style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ background: 'var(--cream)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,4vw,5rem)' }}>
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 3.5rem' }}>
          <div className="section-label reveal" style={{ justifyContent: 'center' }}>Cómo funciona</div>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 900, letterSpacing: '-0.03em' }}>
            Simple. Claro.<br/><em style={{ fontStyle: 'italic', color: 'var(--sage-dark)' }}>Con resultados.</em>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1.5rem', position: 'relative' }}>
          {[
            { n: '01', title: 'Diagnóstico inicial', desc: 'Respondés un cuestionario especializado sobre tus necesidades sensoriales y entorno actual.' },
            { n: '02', title: 'Evaluación del espacio', desc: 'Nuestro consultor analiza luz, ruido, temperatura y organización — virtual o presencialmente.' },
            { n: '03', title: 'Plan de acción', desc: 'Recibís un reporte con cambios concretos, ordenados por impacto y facilidad.' },
            { n: '04', title: 'Seguimiento real', desc: 'No te dejamos solo. Revisamos avances y ajustamos hasta que los resultados sean visibles.' },
          ].map((step, i) => (
            <div key={i} className="reveal" style={{ textAlign: 'center', transitionDelay: `${i * 0.1}s` }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%', background: 'var(--charcoal)',
                color: 'var(--cream)', fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 900,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.2rem', boxShadow: '0 4px 20px rgba(26,26,46,0.2)',
                transition: 'background 0.3s, transform 0.3s',
                cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--sage-dark)'; e.currentTarget.style.transform = 'scale(1.1)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--charcoal)'; e.currentTarget.style.transform = '' }}
              >{step.n}</div>
              <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{step.title}</h4>
              <p style={{ fontSize: '0.85rem', color: '#777', lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: 'var(--charcoal)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,4vw,5rem)' }}>
        <div className="section-label reveal" style={{ color: 'var(--sage-light)' }}>
          <span style={{ background: 'var(--sage-light)' }}/>Lo que dicen
        </div>
        <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 900, letterSpacing: '-0.03em', color: 'var(--cream)', marginBottom: '3rem' }}>
          Historias que <em>inspiran.</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
          {[
            { quote: 'Antes me costaba concentrarme más de 20 minutos en casa. Después de la consultoría, trabajo 4 horas seguidas sin interrupciones.', name: 'Andrea Mora', role: 'Diseñadora freelance, San José' },
            { quote: 'Implementamos el plan corporativo con 15 personas. La diferencia en el ambiente fue notoria desde la primera semana. Lo recomiendo totalmente.', name: 'Carlos Vega', role: 'Director RRHH, empresa tecnológica' },
            { quote: 'Tengo TDAH y siempre pensé que era mi culpa no poder trabajar bien. Workspace Solutions me mostró que era el ambiente, no yo.', name: 'Sofía Jiménez', role: 'Abogada independiente, Heredia' },
          ].map((t, i) => (
            <div key={i} className="reveal" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '2rem', transition: 'background 0.3s, transform 0.3s', transitionDelay: `${i * 0.1}s` }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = '' }}>
              <div style={{ color: 'var(--gold)', fontSize: '0.85rem', letterSpacing: 2, marginBottom: '1rem' }}>★★★★★</div>
              <p style={{ fontSize: '0.93rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.72)', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--sage)', lineHeight: 0, verticalAlign: '-0.8rem', marginRight: '0.1rem' }}>"</span>
                {t.quote}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=4d7360&color=fff&size=64`} alt={t.name} style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid var(--sage)' }}/>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'white' }}>{t.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMMUNITY CTA ── */}
      <section style={{ background: 'var(--cream)', padding: 'clamp(4rem,8vw,7rem) clamp(1.5rem,4vw,5rem)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '3rem', alignItems: 'center' }} className="about-grid">
        <div>
          <div className="section-label reveal">Comunidad exclusiva</div>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.2rem' }}>
            Conectá con personas<br/>que <em style={{ fontStyle: 'italic', color: 'var(--sage-dark)' }}>te entienden.</em>
          </h2>
          <p className="reveal" style={{ fontSize: '1rem', color: '#666', lineHeight: 1.75, marginBottom: '2rem', fontWeight: 300 }}>
            El foro de Workspace Solutions es un espacio seguro para compartir experiencias, pedir consejo y aprender junto a otros que también buscan un entorno de trabajo mejor. Gratis para todos.
          </p>
          <div className="reveal" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/comunidad" className="btn-primary" style={{ padding: '0.95rem 2rem' }}>
              Entrar a la comunidad →
            </Link>
            {!user && (
              <Link href="/registro" className="btn-secondary" style={{ padding: '0.95rem 2rem' }}>
                Crear cuenta gratis
              </Link>
            )}
          </div>
        </div>
        <div className="reveal" style={{ background: 'var(--charcoal)', borderRadius: 24, padding: '2.5rem', color: 'white' }}>
          <div style={{ marginBottom: '1.5rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage-light)' }}>Vista previa del foro</div>
          {[
            { cat: '💡 Consejos', msg: '¿Qué tipo de luz recomiendan para home office con TDAH?', author: 'M. Rodríguez', time: 'Hace 2h', replies: 8 },
            { cat: '📣 Experiencias', msg: 'Así transformé mi oficina después del Plan Pro — resultados reales', author: 'K. Alpízar', time: 'Hace 5h', replies: 14 },
            { cat: '❓ Preguntas', msg: '¿El plan básico incluye evaluación presencial?', author: 'F. Mora', time: 'Hace 1d', replies: 3 },
          ].map((post, i) => (
            <div key={i} style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 12, marginBottom: '0.75rem', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--sage-light)', marginBottom: '0.4rem', fontWeight: 600 }}>{post.cat}</div>
              <div style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)', marginBottom: '0.6rem', lineHeight: 1.4 }}>{post.msg}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}>
                <span>{post.author} · {post.time}</span>
                <span>💬 {post.replies}</span>
              </div>
            </div>
          ))}
          <Link href="/comunidad" style={{ display: 'block', textAlign: 'center', padding: '0.75rem', borderRadius: 12, background: 'rgba(122,158,135,0.15)', color: 'var(--sage-light)', fontSize: '0.85rem', fontWeight: 600, marginTop: '0.5rem' }}>
            Ver todas las discusiones →
          </Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ background: 'var(--warm-white)', padding: 'clamp(4rem,8vw,8rem) clamp(1.5rem,4vw,5rem)' }}>
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 3rem' }}>
          <div className="section-label reveal" style={{ justifyContent: 'center' }}>Preguntas frecuentes</div>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 900, letterSpacing: '-0.03em' }}>
            Todo lo que<br/><em style={{ fontStyle: 'italic', color: 'var(--sage-dark)' }}>necesitás saber.</em>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '1rem', maxWidth: 960, margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <div key={i} className="reveal" onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
              border: `1.5px solid ${openFaq === i ? 'var(--sage-light)' : 'rgba(0,0,0,0.08)'}`,
              borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
              transitionDelay: `${(i % 2) * 0.1}s`,
            }}>
              <div style={{ padding: '1.3rem 1.6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', fontWeight: 600, fontSize: '0.93rem' }}>
                {faq.q}
                <span style={{ fontSize: '1rem', color: 'var(--sage-dark)', flexShrink: 0, transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
              </div>
              {openFaq === i && (
                <div style={{ padding: '0 1.6rem 1.3rem' }}>
                  <p style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ background: 'linear-gradient(135deg, var(--sage-dark) 0%, var(--charcoal) 100%)', padding: 'clamp(5rem,10vw,9rem) clamp(1.5rem,4vw,5rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)' }}/>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label reveal" style={{ color: 'rgba(255,255,255,0.55)', justifyContent: 'center' }}>Empezá hoy</div>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.2rem' }}>
            Tu mejor versión<br/><em>empieza en tu espacio.</em>
          </h2>
          <p className="reveal" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', maxWidth: 500, margin: '0 auto 2.5rem', lineHeight: 1.75 }}>
            Primera sesión diagnóstica completamente gratis. Sin compromisos. Solo 30 minutos para empezar.
          </p>
          <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contacto" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'white', color: 'var(--charcoal)', padding: '1rem 2.2rem', borderRadius: 100, fontWeight: 700, fontSize: '0.95rem', transition: 'transform 0.3s', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
              📅 Agendar diagnóstico gratis
            </Link>
            <a href="https://wa.me/50688888888" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', color: 'white', padding: '1rem 2.2rem', borderRadius: 100, fontWeight: 600, fontSize: '0.95rem', border: '1.5px solid rgba(255,255,255,0.4)', transition: 'all 0.3s' }}>
              💬 Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: 'var(--charcoal)', padding: 'clamp(3rem,6vw,5rem) clamp(1.5rem,4vw,5rem) 2rem', color: 'rgba(255,255,255,0.55)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'white', marginBottom: '0.8rem' }}>
              Workspace<span style={{ color: 'var(--sage-light)' }}>Solutions.</span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7, maxWidth: 260 }}>La única consultora en Costa Rica especializada en optimización sensorial de entornos laborales.</p>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.2rem' }}>
              {['instagram', 'linkedin', 'youtube', 'facebook'].map(s => (
                <a key={s} href="#" style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', transition: 'background 0.2s, color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--sage)'; e.currentTarget.style.color = 'white' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}>
                  {s === 'instagram' ? '📸' : s === 'linkedin' ? 'in' : s === 'youtube' ? '▶' : 'f'}
                </a>
              ))}
            </div>
          </div>
          {[
            { title: 'Empresa', links: [['Inicio', '/'], ['Comunidad', '/comunidad'], ['Recursos', '/recursos'], ['Contacto', '/contacto']] },
            { title: 'Planes', links: [['Plan Básico', '/#servicios'], ['Plan Profesional', '/#servicios'], ['Plan Corporativo', '/#servicios'], ['Diagnóstico gratis', '/contacto']] },
            { title: 'Legal', links: [['Política de privacidad', '#'], ['Términos de uso', '#'], ['Cookies', '#']] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ color: 'white', fontSize: '0.82rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {col.links.map(([label, href]) => (
                  <Link key={label} href={href} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--sage-light)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.8rem' }}>
          <span>© 2026 Workspace Solutions. Todos los derechos reservados.</span>
          <span>Hecho con ♥ en Costa Rica</span>
        </div>
      </footer>

      {/* WhatsApp float */}
      <a href="https://wa.me/50688888888" target="_blank" rel="noreferrer" style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', width: 52, height: 52, background: '#25D366', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', boxShadow: '0 4px 20px rgba(37,211,102,0.4)', zIndex: 100, animation: 'floatUp 3s ease-in-out infinite', textDecoration: 'none' }}>
        💬
      </a>

      <style jsx>{`
        .about-grid { grid-template-columns: 1fr 1fr; }
        @media(max-width:900px) { .about-grid { grid-template-columns: 1fr !important; } }
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.visible { opacity: 1; transform: none; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
        @keyframes floatUp { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      `}</style>
    </>
  )
}
