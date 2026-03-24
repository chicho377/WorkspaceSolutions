-- ============================================================
--  WORKSPACE SOLUTIONS · Supabase Schema
--  Ejecuta esto en el SQL Editor de tu proyecto Supabase
-- ============================================================

-- POSTS
create table if not exists public.posts (
  id          uuid default gen_random_uuid() primary key,
  created_at  timestamptz default now() not null,
  title       text not null,
  body        text not null,
  category    text not null default 'preguntas',
  author_id   uuid references auth.users(id) on delete cascade,
  author_name text not null,
  reply_count integer default 0,
  like_count  integer default 0,
  liked_by    uuid[] default '{}'
);

-- REPLIES
create table if not exists public.replies (
  id          uuid default gen_random_uuid() primary key,
  created_at  timestamptz default now() not null,
  post_id     uuid references public.posts(id) on delete cascade not null,
  body        text not null,
  author_id   uuid references auth.users(id) on delete cascade,
  author_name text not null
);

-- RLS (Row Level Security)
alter table public.posts  enable row level security;
alter table public.replies enable row level security;

-- Anyone can read posts and replies
create policy "Public read posts"   on public.posts   for select using (true);
create policy "Public read replies" on public.replies for select using (true);

-- Only authenticated users can insert
create policy "Auth insert posts"   on public.posts   for insert with check (auth.uid() = author_id);
create policy "Auth insert replies" on public.replies for insert with check (auth.uid() = author_id);

-- Users can update likes on any post (for like feature)
create policy "Auth update posts"   on public.posts   for update using (true);

-- Users can only delete their own posts
create policy "Auth delete posts"   on public.posts   for delete using (auth.uid() = author_id);
create policy "Auth delete replies" on public.replies for delete using (auth.uid() = author_id);

-- Enable realtime for both tables
alter publication supabase_realtime add table public.posts;
alter publication supabase_realtime add table public.replies;

-- ============================================================
--  SEED DATA (opcional - datos de ejemplo para ver el foro)
-- ============================================================
-- Nota: author_id puede ser cualquier UUID válido o null si omitís la FK check.
-- En producción los posts los crean usuarios reales.

insert into public.posts (title, body, category, author_name, reply_count, like_count) values
(
  '¿Qué tipo de luz recomiendan para home office con TDAH?',
  'Hola a todos! Llevo meses trabajando desde casa y me cuesta mucho concentrarme. He leído que la luz influye mucho pero no sé qué tipo usar. ¿Luz cálida, fría, natural? Agradezco cualquier consejo.',
  'preguntas',
  'María Rodríguez',
  8,
  12
),
(
  'Así transformé mi oficina después del Plan Pro — resultados reales',
  'Quiero compartir mi experiencia después de contratar el Plan Profesional de Workspace Solutions. Antes de la consultoría tenía mucho ruido en mi oficina y no podía concentrarme. Después de implementar los cambios: nueva organización del escritorio, cortinas blackout y auriculares de cancelación de ruido, mi productividad subió notablemente. Recomendado 100%.',
  'experiencias',
  'Kevin Alpízar',
  14,
  24
),
(
  'Recursos gratuitos sobre procesamiento sensorial que encontré',
  'Compilé varios artículos y videos gratuitos sobre procesamiento sensorial en el trabajo. Los comparto porque sé que puede ser difícil encontrar info en español. Espero que les sean útiles.',
  'recursos',
  'Daniela Fonseca',
  5,
  18
),
(
  '¿El plan básico incluye evaluación presencial?',
  'Quiero contratar el plan pero trabajo en Cartago. ¿Hay visitas presenciales incluidas en el plan básico o solo el profesional?',
  'preguntas',
  'Fabián Mora',
  3,
  6
),
(
  'Logré trabajar 4 horas seguidas por primera vez en años',
  'Tengo TEA y siempre me costó mantener la concentración. Después de los cambios recomendados por Workspace Solutions — especialmente el control del ruido y la reorganización visual del espacio — por primera vez pude trabajar 4 horas sin interrupciones. Esto cambió mi vida laboral.',
  'logros',
  'Sofía Jiménez',
  11,
  32
);
