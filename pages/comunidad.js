import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Toast from '../components/Toast'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

const CATEGORIES = [
  { id: 'todos', label: '✨ Todos', color: 'var(--charcoal)' },
  { id: 'consejos', label: '💡 Consejos', color: '#c9a84c' },
  { id: 'experiencias', label: '📣 Experiencias', color: 'var(--sage-dark)' },
  { id: 'preguntas', label: '❓ Preguntas', color: 'var(--terracotta)' },
  { id: 'recursos', label: '📚 Recursos', color: '#6366f1' },
  { id: 'logros', label: '🏆 Logros', color: '#0ea5e9' },
]

const CAT_COLORS = {
  consejos: { bg: 'rgba(201,168,76,0.12)', text: '#8a6e1a' },
  experiencias: { bg: 'rgba(77,115,96,0.12)', text: 'var(--sage-dark)' },
  preguntas: { bg: 'rgba(196,113,74,0.12)', text: 'var(--terracotta)' },
  recursos: { bg: 'rgba(99,102,241,0.12)', text: '#6366f1' },
  logros: { bg: 'rgba(14,165,233,0.12)', text: '#0ea5e9' },
}

function timeAgo(date) {
  try { return formatDistanceToNow(new Date(date), { addSuffix: true, locale: es }) }
  catch { return '' }
}

function Avatar({ name, size = 36 }) {
  return (
    <img
      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'U')}&background=4d7360&color=fff&size=128`}
      alt={name}
      style={{ width: size, height: size, borderRadius: '50%', flexShrink: 0, border: '2px solid var(--cream)' }}
    />
  )
}

function NewPostModal({ user, onClose, onCreated }) {
  const [form, setForm] = useState({ title: '', category: 'preguntas', body: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.body.trim()) { setError('Por favor completá todos los campos.'); return }
    setLoading(true)
    const { data, error } = await supabase.from('posts').insert({
      title: form.title.trim(),
      body: form.body.trim(),
      category: form.category,
      author_id: user.id,
      author_name: user.user_metadata?.display_name || user.email.split('@')[0],
      reply_count: 0,
      like_count: 0,
    }).select().single()
    if (error) { setError('Error al publicar. Intenta de nuevo.'); setLoading(false); return }
    onCreated(data)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 560 }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#aaa', lineHeight: 1 }}>×</button>
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.3rem' }}>Nueva publicación</h3>
          <p style={{ color: '#999', fontSize: '0.88rem' }}>Compartí tu experiencia, pregunta o consejo con la comunidad.</p>
        </div>
        {error && <div style={{ background: 'rgba(196,113,74,0.1)', border: '1px solid rgba(196,113,74,0.3)', color: 'var(--terracotta)', padding: '0.75rem 1rem', borderRadius: 10, marginBottom: '1rem', fontSize: '0.85rem' }}>⚠️ {error}</div>}
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label className="form-label">Categoría</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {CATEGORIES.filter(c => c.id !== 'todos').map(cat => (
                <button key={cat.id} type="button" onClick={() => setForm(f => ({ ...f, category: cat.id }))} style={{
                  padding: '0.4rem 0.85rem', borderRadius: 100, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', border: 'none',
                  background: form.category === cat.id ? 'var(--charcoal)' : 'var(--cream)',
                  color: form.category === cat.id ? 'white' : '#666',
                  transition: 'all 0.2s',
                }}>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="form-label">Título</label>
            <input className="form-input" type="text" placeholder="¿De qué querés hablar?" value={form.title} onChange={set('title')} maxLength={120} required />
          </div>
          <div>
            <label className="form-label">Contenido</label>
            <textarea className="form-input" placeholder="Contá tu experiencia, duda o consejo con detalle..." value={form.body} onChange={set('body')} rows={5} required style={{ resize: 'vertical' }}/>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ padding: '0.7rem 1.5rem' }}>Cancelar</button>
            <button type="submit" disabled={loading} className="btn-primary" style={{ padding: '0.7rem 1.5rem' }}>
              {loading ? <><span className="spinner"/>Publicando...</> : '✓ Publicar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function PostCard({ post, currentUser, onLike, onClick }) {
  const cat = CAT_COLORS[post.category] || CAT_COLORS.preguntas
  const catLabel = CATEGORIES.find(c => c.id === post.category)?.label || post.category
  const liked = post.liked_by?.includes(currentUser?.id)

  return (
    <div onClick={() => onClick(post)} style={{
      background: 'white', borderRadius: 18, padding: '1.5rem 1.8rem',
      border: '1.5px solid rgba(0,0,0,0.06)', cursor: 'pointer',
      transition: 'transform 0.25s, box-shadow 0.25s, border-color 0.25s',
      display: 'flex', flexDirection: 'column', gap: '0.75rem',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = 'var(--sage-light)' }}
    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.28rem 0.75rem', borderRadius: 100, background: cat.bg, color: cat.text, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
          {catLabel}
        </div>
        <span style={{ fontSize: '0.78rem', color: '#bbb', whiteSpace: 'nowrap', flexShrink: 0 }}>{timeAgo(post.created_at)}</span>
      </div>

      <h3 style={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1.4, color: 'var(--charcoal)' }}>{post.title}</h3>
      <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.body}</p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Avatar name={post.author_name} size={28} />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#666' }}>{post.author_name}</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={e => { e.stopPropagation(); onLike(post) }} style={{
            background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem',
            fontSize: '0.82rem', color: liked ? 'var(--terracotta)' : '#bbb',
            fontWeight: liked ? 700 : 400, transition: 'color 0.2s',
            padding: '0.25rem 0.5rem', borderRadius: 8,
          }}>
            {liked ? '❤️' : '🤍'} {post.like_count || 0}
          </button>
          <span style={{ fontSize: '0.82rem', color: '#bbb', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            💬 {post.reply_count || 0}
          </span>
        </div>
      </div>
    </div>
  )
}

function PostModal({ post, currentUser, onClose, onLikePost }) {
  const [replies, setReplies] = useState([])
  const [replyText, setReplyText] = useState('')
  const [loadingReplies, setLoadingReplies] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [liked, setLiked] = useState(post.liked_by?.includes(currentUser?.id))
  const [likeCount, setLikeCount] = useState(post.like_count || 0)

  useEffect(() => {
    const fetchReplies = async () => {
      const { data } = await supabase.from('replies').select('*').eq('post_id', post.id).order('created_at', { ascending: true })
      setReplies(data || [])
      setLoadingReplies(false)
    }
    fetchReplies()

    // Realtime replies
    const channel = supabase.channel(`post-${post.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'replies', filter: `post_id=eq.${post.id}` }, payload => {
        setReplies(prev => [...prev, payload.new])
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [post.id])

  const submitReply = async (e) => {
    e.preventDefault()
    if (!replyText.trim() || !currentUser) return
    setSubmitting(true)
    const { data } = await supabase.from('replies').insert({
      post_id: post.id,
      body: replyText.trim(),
      author_id: currentUser.id,
      author_name: currentUser.user_metadata?.display_name || currentUser.email.split('@')[0],
    }).select().single()
    if (data) {
      // increment reply count
      await supabase.from('posts').update({ reply_count: (post.reply_count || 0) + replies.length + 1 }).eq('id', post.id)
      setReplyText('')
    }
    setSubmitting(false)
  }

  const handleLike = async () => {
    if (!currentUser) return
    const newLiked = !liked
    const newCount = likeCount + (newLiked ? 1 : -1)
    setLiked(newLiked)
    setLikeCount(newCount)
    const likedBy = post.liked_by || []
    const newLikedBy = newLiked ? [...likedBy, currentUser.id] : likedBy.filter(id => id !== currentUser.id)
    await supabase.from('posts').update({ like_count: newCount, liked_by: newLikedBy }).eq('id', post.id)
    onLikePost && onLikePost(post.id, newCount, newLikedBy)
  }

  const cat = CAT_COLORS[post.category] || CAT_COLORS.preguntas
  const catLabel = CATEGORIES.find(c => c.id === post.category)?.label || post.category

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 640, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: 0 }}>
        {/* Header */}
        <div style={{ padding: '1.8rem 2rem 1.2rem', borderBottom: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.28rem 0.75rem', borderRadius: 100, background: cat.bg, color: cat.text, fontSize: '0.72rem', fontWeight: 700 }}>
              {catLabel}
            </div>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#aaa', lineHeight: 1, flexShrink: 0 }}>×</button>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 900, marginBottom: '0.6rem', lineHeight: 1.3 }}>{post.title}</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Avatar name={post.author_name} size={30} />
            <div>
              <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{post.author_name}</span>
              <span style={{ color: '#bbb', fontSize: '0.78rem' }}> · {timeAgo(post.created_at)}</span>
            </div>
          </div>
        </div>

        {/* Body + Replies — scrollable */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '1.5rem 2rem' }}>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.75, color: '#444', whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>{post.body}</p>

          <button onClick={handleLike} disabled={!currentUser} style={{
            background: liked ? 'rgba(196,113,74,0.1)' : 'var(--cream)',
            border: `1.5px solid ${liked ? 'rgba(196,113,74,0.3)' : 'rgba(0,0,0,0.08)'}`,
            borderRadius: 100, padding: '0.4rem 1rem', cursor: currentUser ? 'pointer' : 'default',
            fontSize: '0.85rem', fontWeight: 700, color: liked ? 'var(--terracotta)' : '#999',
            transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          }}>
            {liked ? '❤️' : '🤍'} {likeCount} {likeCount === 1 ? 'like' : 'likes'}
          </button>

          <div style={{ height: 1, background: 'rgba(0,0,0,0.07)', margin: '1.5rem 0' }} />
          <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '1rem', color: '#555' }}>
            💬 {replies.length} {replies.length === 1 ? 'respuesta' : 'respuestas'}
          </div>

          {loadingReplies ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#bbb', fontSize: '0.85rem' }}>Cargando respuestas...</div>
          ) : replies.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '1.5rem', color: '#ccc', fontSize: '0.88rem' }}>Sé el primero en responder 👇</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {replies.map(r => (
                <div key={r.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <Avatar name={r.author_name} size={32} />
                  <div style={{ flex: 1 }}>
                    <div style={{ background: 'var(--cream)', borderRadius: '0 12px 12px 12px', padding: '0.85rem 1rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', marginBottom: '0.3rem', color: 'var(--sage-dark)' }}>{r.author_name}</div>
                      <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#444', whiteSpace: 'pre-wrap' }}>{r.body}</div>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#ccc', marginTop: '0.25rem', paddingLeft: '0.25rem' }}>{timeAgo(r.created_at)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reply box */}
        <div style={{ padding: '1rem 2rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.07)', flexShrink: 0 }}>
          {currentUser ? (
            <form onSubmit={submitReply} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
              <Avatar name={currentUser.user_metadata?.display_name || currentUser.email} size={34} />
              <div style={{ flex: 1 }}>
                <textarea
                  className="form-input"
                  placeholder="Escribe tu respuesta..."
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  rows={2}
                  style={{ resize: 'none', fontSize: '0.9rem' }}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitReply(e) } }}
                />
              </div>
              <button type="submit" disabled={submitting || !replyText.trim()} className="btn-sage" style={{ padding: '0.65rem 1rem', flexShrink: 0 }}>
                {submitting ? <span className="spinner"/> : '→'}
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--cream)', borderRadius: 12, fontSize: '0.88rem', color: '#888' }}>
              <Link href="/login" style={{ color: 'var(--sage-dark)', fontWeight: 700 }}>Inicia sesión</Link> para responder
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Comunidad({ user }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('todos')
  const [search, setSearch] = useState('')
  const [showNewPost, setShowNewPost] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [toast, setToast] = useState(null)
  const [sort, setSort] = useState('reciente')
  const router = useRouter()

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    let q = supabase.from('posts').select('*')
    if (activeCategory !== 'todos') q = q.eq('category', activeCategory)
    if (sort === 'popular') q = q.order('like_count', { ascending: false })
    else if (sort === 'activo') q = q.order('reply_count', { ascending: false })
    else q = q.order('created_at', { ascending: false })
    const { data, error } = await q.limit(50)
    if (!error) setPosts(data || [])
    setLoading(false)
  }, [activeCategory, sort])

  useEffect(() => { fetchPosts() }, [fetchPosts])

  // Realtime new posts
  useEffect(() => {
    const channel = supabase.channel('posts-live')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, payload => {
        setPosts(prev => [payload.new, ...prev])
      })
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [])

  const handleLike = async (post) => {
    if (!user) { router.push('/login'); return }
    const liked = post.liked_by?.includes(user.id)
    const newCount = (post.like_count || 0) + (liked ? -1 : 1)
    const newLikedBy = liked ? (post.liked_by || []).filter(id => id !== user.id) : [...(post.liked_by || []), user.id]
    setPosts(prev => prev.map(p => p.id === post.id ? { ...p, like_count: newCount, liked_by: newLikedBy } : p))
    await supabase.from('posts').update({ like_count: newCount, liked_by: newLikedBy }).eq('id', post.id)
  }

  const handleLikeFromModal = (postId, newCount, newLikedBy) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, like_count: newCount, liked_by: newLikedBy } : p))
  }

  const handleNewPost = (newPost) => {
    setPosts(prev => [newPost, ...prev])
    setToast({ message: '¡Publicación creada exitosamente! 🎉', type: 'success' })
  }

  const filteredPosts = posts.filter(p =>
    search === '' || p.title.toLowerCase().includes(search.toLowerCase()) || p.body.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Head><title>Comunidad · Workspace Solutions</title></Head>
      <Navbar user={user} />

      {/* HERO BANNER */}
      <div style={{ background: 'linear-gradient(135deg, var(--charcoal) 0%, var(--charcoal-mid) 100%)', padding: 'clamp(2.5rem,5vw,4rem) clamp(1.5rem,4vw,5rem)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: 200, height: 200, backgroundImage: 'radial-gradient(circle, rgba(122,158,135,0.2) 1.5px, transparent 1.5px)', backgroundSize: '18px 18px' }}/>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(122,158,135,0.08) 0%, transparent 60%)' }}/>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(122,158,135,0.15)', border: '1px solid rgba(122,158,135,0.3)', color: 'var(--sage-light)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.35rem 0.9rem', borderRadius: 100, marginBottom: '1.2rem' }}>
            <span style={{ width: 5, height: 5, background: 'var(--sage-light)', borderRadius: '50%', animation: 'pulse 2s infinite' }}/>
            Comunidad abierta · En vivo
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: '0.8rem', letterSpacing: '-0.03em' }}>
            Un espacio para<br/><em style={{ color: 'var(--sage-light)' }}>crecer juntos.</em>
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 520, marginBottom: '1.5rem' }}>
            Compartí tu experiencia, pedí consejo y conectá con otras personas que también buscan un entorno de trabajo mejor.
          </p>
          {user ? (
            <button onClick={() => setShowNewPost(true)} className="btn-primary" style={{ background: 'var(--sage-dark)', padding: '0.85rem 2rem' }}>
              ✏️ Nueva publicación
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/registro" className="btn-primary" style={{ background: 'var(--sage-dark)', padding: '0.85rem 2rem' }}>Unirme gratis →</Link>
              <Link href="/login" style={{ display: 'inline-flex', alignItems: 'center', padding: '0.85rem 1.5rem', borderRadius: 100, border: '1.5px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.2s' }}>Ingresar</Link>
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(2rem,4vw,3rem) clamp(1rem,3vw,2rem)', display: 'grid', gridTemplateColumns: '1fr minmax(0,260px)', gap: '2rem', alignItems: 'start' }} className="forum-layout">

        {/* MAIN CONTENT */}
        <div>
          {/* Controls */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.2rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
              <input
                className="form-input"
                type="text"
                placeholder="🔍  Buscar publicaciones..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: '1rem' }}
              />
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)} className="form-input" style={{ width: 'auto', flexShrink: 0 }}>
              <option value="reciente">🕐 Más reciente</option>
              <option value="popular">❤️ Más popular</option>
              <option value="activo">💬 Más activo</option>
            </select>
            {user && (
              <button onClick={() => setShowNewPost(true)} className="btn-sage" style={{ flexShrink: 0, padding: '0.75rem 1.2rem', whiteSpace: 'nowrap' }}>
                + Nueva
              </button>
            )}
          </div>

          {/* Category filters */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)} style={{
                padding: '0.45rem 1rem', borderRadius: 100, fontSize: '0.8rem', fontWeight: 600,
                border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                background: activeCategory === cat.id ? 'var(--charcoal)' : 'var(--cream)',
                color: activeCategory === cat.id ? 'white' : '#777',
              }}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Posts */}
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ background: 'white', borderRadius: 18, padding: '1.5rem', border: '1.5px solid rgba(0,0,0,0.06)', animation: 'shimmer 1.5s infinite' }}>
                  <div style={{ height: 14, width: '30%', background: 'var(--cream-dark)', borderRadius: 7, marginBottom: '0.8rem' }}/>
                  <div style={{ height: 20, width: '80%', background: 'var(--cream-dark)', borderRadius: 7, marginBottom: '0.6rem' }}/>
                  <div style={{ height: 14, width: '60%', background: 'var(--cream-dark)', borderRadius: 7 }}/>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">💬</div>
              <h3>{search ? 'Sin resultados para tu búsqueda' : 'Sé el primero en publicar'}</h3>
              <p style={{ marginBottom: '1.5rem' }}>{search ? 'Intentá con otras palabras clave.' : 'La comunidad está esperando tu historia, pregunta o consejo.'}</p>
              {user && !search && (
                <button onClick={() => setShowNewPost(true)} className="btn-primary" style={{ padding: '0.8rem 1.8rem' }}>✏️ Crear primera publicación</button>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredPosts.map(post => (
                <PostCard key={post.id} post={post} currentUser={user} onLike={handleLike} onClick={setSelectedPost} />
              ))}
            </div>
          )}
        </div>

        {/* SIDEBAR */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }} className="forum-sidebar">
          {/* Rules */}
          <div style={{ background: 'white', borderRadius: 18, padding: '1.5rem', border: '1.5px solid rgba(0,0,0,0.06)' }}>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--charcoal)' }}>🌿 Reglas de la comunidad</div>
            {[
              'Sé respetuoso/a con todos los miembros.',
              'Compartí información verídica y útil.',
              'No publicites productos o servicios externos.',
              'Mantené la privacidad de otros.',
              'Usá las categorías correctamente.',
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.6rem', fontSize: '0.82rem', color: '#666', lineHeight: 1.4 }}>
                <span style={{ color: 'var(--sage-dark)', fontWeight: 700, flexShrink: 0 }}>{i+1}.</span>{r}
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{ background: 'var(--charcoal)', borderRadius: 18, padding: '1.5rem', color: 'white' }}>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '1.2rem', color: 'var(--sage-light)' }}>📊 Comunidad</div>
            {[
              { label: 'Publicaciones', val: posts.length },
              { label: 'Categorías activas', val: CATEGORIES.length - 1 },
              { label: 'Nuevo hoy', val: posts.filter(p => new Date(p.created_at) > new Date(Date.now() - 86400000)).length },
            ].map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.85rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.55)' }}>{s.label}</span>
                <span style={{ fontWeight: 700 }}>{s.val}</span>
              </div>
            ))}
          </div>

          {/* Auth prompt if not logged in */}
          {!user && (
            <div style={{ background: 'var(--cream)', borderRadius: 18, padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>🌱</div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem' }}>Únete a la comunidad</div>
              <p style={{ fontSize: '0.8rem', color: '#888', lineHeight: 1.5, marginBottom: '1rem' }}>Creá una cuenta gratis para publicar, responder y conectar.</p>
              <Link href="/registro" className="btn-primary" style={{ display: 'block', textAlign: 'center', padding: '0.7rem', fontSize: '0.85rem' }}>
                Crear cuenta gratis
              </Link>
            </div>
          )}
        </aside>
      </div>

      {/* MODALS */}
      {showNewPost && user && (
        <NewPostModal user={user} onClose={() => setShowNewPost(false)} onCreated={handleNewPost} />
      )}
      {selectedPost && (
        <PostModal post={selectedPost} currentUser={user} onClose={() => setSelectedPost(null)} onLikePost={handleLikeFromModal} />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <style jsx global>{`
        @media(max-width:900px) {
          .forum-layout { grid-template-columns: 1fr !important; }
          .forum-sidebar { display: none !important; }
        }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
        @keyframes shimmer { 0%,100%{opacity:1} 50%{opacity:0.5} }
      `}</style>
    </>
  )
}
