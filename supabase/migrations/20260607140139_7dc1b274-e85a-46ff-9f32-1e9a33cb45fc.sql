
-- ============================================================
-- 1. ENUM ROLE + USER_ROLES + has_role()
-- ============================================================
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "user can read own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "admin manages roles" ON public.user_roles
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- ============================================================
-- updated_at helper
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- ============================================================
-- Reusable policy pattern: public read, admin write
-- We'll inline per table for clarity.
-- ============================================================

-- ============================================================
-- HOME HERO
-- ============================================================
CREATE TABLE public.home_hero (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  cta_primary_label TEXT,
  cta_primary_href TEXT,
  cta_secondary_label TEXT,
  cta_secondary_href TEXT,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.home_hero TO anon, authenticated;
GRANT ALL ON public.home_hero TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.home_hero TO authenticated;
ALTER TABLE public.home_hero ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read home_hero" ON public.home_hero FOR SELECT USING (true);
CREATE POLICY "admin write home_hero" ON public.home_hero FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_home_hero_updated BEFORE UPDATE ON public.home_hero
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- WHY CHOOSE US
-- ============================================================
CREATE TABLE public.why_choose_us (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon TEXT,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.why_choose_us TO anon, authenticated;
GRANT ALL ON public.why_choose_us TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.why_choose_us TO authenticated;
ALTER TABLE public.why_choose_us ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read why" ON public.why_choose_us FOR SELECT USING (true);
CREATE POLICY "admin write why" ON public.why_choose_us FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_why_updated BEFORE UPDATE ON public.why_choose_us
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- ARTICLES (home news/articles section)
-- ============================================================
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  thumbnail_url TEXT,
  author TEXT,
  published_at TIMESTAMPTZ,
  is_published BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.articles TO anon, authenticated;
GRANT ALL ON public.articles TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.articles TO authenticated;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read articles" ON public.articles FOR SELECT USING (is_published = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin write articles" ON public.articles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_articles_updated BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- PARTNERS
-- ============================================================
CREATE TABLE public.partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  link_url TEXT,
  group_name TEXT NOT NULL DEFAULT 'home',  -- 'home' | 'pemeliharaan' | 'jasa-profesional' | etc
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.partners TO anon, authenticated;
GRANT ALL ON public.partners TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.partners TO authenticated;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read partners" ON public.partners FOR SELECT USING (true);
CREATE POLICY "admin write partners" ON public.partners FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_partners_updated BEFORE UPDATE ON public.partners
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- ABOUT US (singleton-ish: many rich blocks)
-- ============================================================
CREATE TABLE public.about_us (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key TEXT UNIQUE NOT NULL, -- 'intro', 'vision', 'mission', etc
  title TEXT,
  body TEXT,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.about_us TO anon, authenticated;
GRANT ALL ON public.about_us TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.about_us TO authenticated;
ALTER TABLE public.about_us ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read about" ON public.about_us FOR SELECT USING (true);
CREATE POLICY "admin write about" ON public.about_us FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_about_updated BEFORE UPDATE ON public.about_us
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- SEJARAH (timeline)
-- ============================================================
CREATE TABLE public.sejarah (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.sejarah TO anon, authenticated;
GRANT ALL ON public.sejarah TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.sejarah TO authenticated;
ALTER TABLE public.sejarah ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read sejarah" ON public.sejarah FOR SELECT USING (true);
CREATE POLICY "admin write sejarah" ON public.sejarah FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_sejarah_updated BEFORE UPDATE ON public.sejarah
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- LEGALITAS
-- ============================================================
CREATE TABLE public.legalitas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  number TEXT,
  issued_by TEXT,
  issued_at DATE,
  document_url TEXT,
  thumbnail_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.legalitas TO anon, authenticated;
GRANT ALL ON public.legalitas TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.legalitas TO authenticated;
ALTER TABLE public.legalitas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read legalitas" ON public.legalitas FOR SELECT USING (true);
CREATE POLICY "admin write legalitas" ON public.legalitas FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_legalitas_updated BEFORE UPDATE ON public.legalitas
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- KEUNGGULAN
-- ============================================================
CREATE TABLE public.keunggulan (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon TEXT,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.keunggulan TO anon, authenticated;
GRANT ALL ON public.keunggulan TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.keunggulan TO authenticated;
ALTER TABLE public.keunggulan ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read keunggulan" ON public.keunggulan FOR SELECT USING (true);
CREATE POLICY "admin write keunggulan" ON public.keunggulan FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_keunggulan_updated BEFORE UPDATE ON public.keunggulan
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- STRUKTUR MANAJEMEN
-- ============================================================
CREATE TABLE public.struktur_manajemen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  level INT NOT NULL DEFAULT 1,  -- 1 komisaris utama, 2 komisaris, 3 direksi, etc.
  photo_url TEXT,
  bio TEXT,
  detail_content TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.struktur_manajemen TO anon, authenticated;
GRANT ALL ON public.struktur_manajemen TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.struktur_manajemen TO authenticated;
ALTER TABLE public.struktur_manajemen ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read struktur" ON public.struktur_manajemen FOR SELECT USING (true);
CREATE POLICY "admin write struktur" ON public.struktur_manajemen FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_struktur_updated BEFORE UPDATE ON public.struktur_manajemen
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- SERVICE CATEGORIES (4 bidang utama)
-- ============================================================
CREATE TABLE public.service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,  -- 'pemeliharaan' | 'jasa-profesional' | 'perdagangan' | 'event-organizer'
  name TEXT NOT NULL,
  short_description TEXT,
  long_description TEXT,
  icon TEXT,
  hero_image_url TEXT,
  color_theme TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.service_categories TO anon, authenticated;
GRANT ALL ON public.service_categories TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.service_categories TO authenticated;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read svc_cat" ON public.service_categories FOR SELECT USING (true);
CREATE POLICY "admin write svc_cat" ON public.service_categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_svc_cat_updated BEFORE UPDATE ON public.service_categories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- SERVICE SCOPES (mis. perawatan-taman, kebersihan-bangunan)
-- ============================================================
CREATE TABLE public.service_scopes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.service_categories(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (category_id, slug)
);
GRANT SELECT ON public.service_scopes TO anon, authenticated;
GRANT ALL ON public.service_scopes TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.service_scopes TO authenticated;
ALTER TABLE public.service_scopes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read scopes" ON public.service_scopes FOR SELECT USING (true);
CREATE POLICY "admin write scopes" ON public.service_scopes FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_scopes_updated BEFORE UPDATE ON public.service_scopes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- SERVICE SCOPE ITEMS (sub-jasa yang bisa dipilih di form penawaran)
-- ============================================================
CREATE TABLE public.service_scope_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scope_id UUID NOT NULL REFERENCES public.service_scopes(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  details JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.service_scope_items TO anon, authenticated;
GRANT ALL ON public.service_scope_items TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.service_scope_items TO authenticated;
ALTER TABLE public.service_scope_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read items" ON public.service_scope_items FOR SELECT USING (true);
CREATE POLICY "admin write items" ON public.service_scope_items FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_items_updated BEFORE UPDATE ON public.service_scope_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- PORTOFOLIO
-- ============================================================
CREATE TABLE public.portofolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  client TEXT,
  category TEXT,
  year TEXT,
  location TEXT,
  description TEXT,
  cover_url TEXT,
  gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.portofolio TO anon, authenticated;
GRANT ALL ON public.portofolio TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.portofolio TO authenticated;
ALTER TABLE public.portofolio ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read porto" ON public.portofolio FOR SELECT USING (is_published = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin write porto" ON public.portofolio FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_porto_updated BEFORE UPDATE ON public.portofolio
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- BERITA
-- ============================================================
CREATE TABLE public.berita (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT,
  thumbnail_url TEXT,
  author TEXT,
  published_at TIMESTAMPTZ,
  is_published BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.berita TO anon, authenticated;
GRANT ALL ON public.berita TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.berita TO authenticated;
ALTER TABLE public.berita ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read berita" ON public.berita FOR SELECT USING (is_published = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin write berita" ON public.berita FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_berita_updated BEFORE UPDATE ON public.berita
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- KONTAK INFO (singleton)
-- ============================================================
CREATE TABLE public.kontak_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  map_url TEXT,
  instagram TEXT,
  facebook TEXT,
  linkedin TEXT,
  youtube TEXT,
  tiktok TEXT,
  business_hours TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.kontak_info TO anon, authenticated;
GRANT ALL ON public.kontak_info TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.kontak_info TO authenticated;
ALTER TABLE public.kontak_info ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read kontak" ON public.kontak_info FOR SELECT USING (true);
CREATE POLICY "admin write kontak" ON public.kontak_info FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_kontak_updated BEFORE UPDATE ON public.kontak_info
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- KONTAK MESSAGES (form kontak publik)
-- ============================================================
CREATE TABLE public.kontak_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.kontak_messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.kontak_messages TO authenticated;
GRANT ALL ON public.kontak_messages TO service_role;
ALTER TABLE public.kontak_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can send message" ON public.kontak_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "admin reads messages" ON public.kontak_messages FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin updates messages" ON public.kontak_messages FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin deletes messages" ON public.kontak_messages FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_kontak_msg_updated BEFORE UPDATE ON public.kontak_messages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- PENGAJUAN PENAWARAN
-- ============================================================
CREATE TABLE public.pengajuan_penawaran (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_lengkap TEXT NOT NULL,
  nama_perusahaan TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  category_slug TEXT,             -- mis. 'pemeliharaan'
  scope_slug TEXT,                -- mis. 'kebersihan-bangunan'
  selected_services JSONB NOT NULL DEFAULT '[]'::jsonb,
  deskripsi TEXT NOT NULL,
  estimasi_waktu TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.pengajuan_penawaran TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.pengajuan_penawaran TO authenticated;
GRANT ALL ON public.pengajuan_penawaran TO service_role;
ALTER TABLE public.pengajuan_penawaran ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can submit penawaran" ON public.pengajuan_penawaran FOR INSERT WITH CHECK (true);
CREATE POLICY "admin reads penawaran" ON public.pengajuan_penawaran FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin updates penawaran" ON public.pengajuan_penawaran FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin deletes penawaran" ON public.pengajuan_penawaran FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_penawaran_updated BEFORE UPDATE ON public.pengajuan_penawaran
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
