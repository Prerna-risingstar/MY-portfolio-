-- ============================================================
-- Portfolio CMS — Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ============================================================
-- PROFILES TABLE (hero + about + contact)
-- ============================================================
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  name text,
  role text,
  bio text,
  about_me text,
  location text,
  interests text[],
  career_objective text,
  profile_picture_url text,
  resume_url text,
  github_url text,
  linkedin_url text,
  email text,
  updated_at timestamptz default now()
);

-- Seed with one empty profile row
insert into profiles (id, name, role, bio)
values ('00000000-0000-0000-0000-000000000001', 'Your Name', 'Developer', 'Your bio here')
on conflict (id) do nothing;

-- ============================================================
-- SKILLS TABLE
-- ============================================================
create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text default 'General',
  icon text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ============================================================
-- EXPERIENCES TABLE
-- ============================================================
create table if not exists experiences (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  position text not null,
  duration text,
  start_date date,
  end_date date,
  is_current boolean default false,
  description text[],
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ============================================================
-- PROJECTS TABLE
-- ============================================================
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  tech_stack text[],
  image_url text,
  github_url text,
  live_url text,
  category text default 'Web',
  featured boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ============================================================
-- CERTIFICATIONS TABLE
-- ============================================================
create table if not exists certifications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text,
  year text,
  certificate_url text,
  image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ============================================================
-- EDUCATION TABLE
-- ============================================================
create table if not exists education (
  id uuid primary key default gen_random_uuid(),
  degree text not null,
  institution text,
  duration text,
  cgpa text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ============================================================
-- ACHIEVEMENTS TABLE
-- ============================================================
create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text default '🏆',
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table skills enable row level security;
alter table experiences enable row level security;
alter table projects enable row level security;
alter table certifications enable row level security;
alter table education enable row level security;
alter table achievements enable row level security;

-- PUBLIC: anyone can READ
create policy "Public can read profiles" on profiles for select using (true);
create policy "Public can read skills" on skills for select using (true);
create policy "Public can read experiences" on experiences for select using (true);
create policy "Public can read projects" on projects for select using (true);
create policy "Public can read certifications" on certifications for select using (true);
create policy "Public can read education" on education for select using (true);
create policy "Public can read achievements" on achievements for select using (true);

-- AUTHENTICATED (admin): full access
create policy "Admin can manage profiles" on profiles for all using (auth.role() = 'authenticated');
create policy "Admin can manage skills" on skills for all using (auth.role() = 'authenticated');
create policy "Admin can manage experiences" on experiences for all using (auth.role() = 'authenticated');
create policy "Admin can manage projects" on projects for all using (auth.role() = 'authenticated');
create policy "Admin can manage certifications" on certifications for all using (auth.role() = 'authenticated');
create policy "Admin can manage education" on education for all using (auth.role() = 'authenticated');
create policy "Admin can manage achievements" on achievements for all using (auth.role() = 'authenticated');

-- ============================================================
-- STORAGE BUCKETS
-- ============================================================
-- Run in Supabase Dashboard > Storage > New Bucket:
-- 1. "avatars"       — public
-- 2. "projects"      — public
-- 3. "certificates"  — public
-- 4. "resumes"       — public
