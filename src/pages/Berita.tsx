import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImg from "@/assets/hero-building.png";

type Article = {
  id: string;
  category: string;
  categoryColor: string;
  image: string;
  date: string;
  readTime: string;
  title: string;
};

const articles: Article[] = [
  {
    id: "1",
    category: "Berita Perusahaan",
    categoryColor: "bg-navy",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop",
    date: "20 Januari 2026",
    readTime: "4 menit baca",
    title: "Menjajaki Potensi Peluang Kerjasama Strategis dengan Kamar Dagang dan Industri",
  },
  {
    id: "2",
    category: "Berita Perusahaan",
    categoryColor: "bg-navy",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&auto=format&fit=crop",
    date: "15 Januari 2026",
    readTime: "4 menit baca",
    title: "PT Samasta Nusantara Digdaya Memperkuat Layanan Jasa Terpadu",
  },
  {
    id: "3",
    category: "Berita Perusahaan",
    categoryColor: "bg-navy",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop",
    date: "8 Januari 2026",
    readTime: "5 menit baca",
    title: "Peran One-Stop Solution dalam Efisiensi Operasional Bisnis",
  },
  {
    id: "4",
    category: "Pemeliharaan, Perawatan, dan Pembuatan Lingkungan",
    categoryColor: "bg-emerald-600",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop",
    date: "12 Januari 2026",
    readTime: "5 menit baca",
    title: "Pentingnya Pemeliharaan Lingkungan Berkelanjutan untuk Perusahaan",
  },
  {
    id: "5",
    category: "Pemeliharaan, Perawatan, dan Pembuatan Lingkungan",
    categoryColor: "bg-emerald-600",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop",
    date: "6 Januari 2026",
    readTime: "4 menit baca",
    title: "Standar Kebersihan Profesional untuk Gedung Perkantoran",
  },
  {
    id: "6",
    category: "Jasa Profesional & SDM",
    categoryColor: "bg-indigo-600",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop",
    date: "10 Januari 2026",
    readTime: "5 menit baca",
    title: "Pentingnya Kepatuhan Legal dan Sertifikasi bagi Pelaku Usaha",
  },
  {
    id: "7",
    category: "Jasa Profesional & SDM",
    categoryColor: "bg-indigo-600",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop",
    date: "5 Januari 2026",
    readTime: "5 menit baca",
    title: "Investasi Pengembangan SDM untuk Daya Saing Perusahaan",
  },
  {
    id: "8",
    category: "Pengolahan & Perdagangan",
    categoryColor: "bg-orange-600",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop",
    date: "7 Januari 2026",
    readTime: "4 menit baca",
    title: "Tren Konveksi Custom untuk Branding Korporat",
  },
  {
    id: "9",
    category: "Pengolahan & Perdagangan",
    categoryColor: "bg-orange-600",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&auto=format&fit=crop",
    date: "30 Desember 2025",
    readTime: "5 menit baca",
    title: "Peran Distribusi Hasil Pertanian dalam Ketahanan Pangan",
  },
  {
    id: "10",
    category: "Event & Kreatif",
    categoryColor: "bg-purple-600",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop",
    date: "14 Januari 2026",
    readTime: "5 menit baca",
    title: "Layanan Event Organizer Profesional untuk Kegiatan Korporat",
  },
  {
    id: "11",
    category: "Event & Kreatif",
    categoryColor: "bg-purple-600",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop",
    date: "2 Januari 2026",
    readTime: "5 menit baca",
    title: "Peran Desain Komunikasi Visual dalam Membangun Brand Identity",
  },
];

const Berita = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-16">
        <div className="bg-muted/40">
          <div className="container mx-auto px-4 py-3 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-navy">Beranda</Link>
            <span className="mx-2">›</span>
            <span className="text-navy font-medium">Berita</span>
          </div>
        </div>
        <div className="bg-[#1E3A8A] text-primary-foreground">
          <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <h1 className="text-3xl md:text-4xl font-bold">Berita & Artikel</h1>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img src={heroImg} alt="Berita" className="w-full h-56 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* List */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl space-y-5">
          {articles.map((a) => (
            <article
              key={a.id}
              className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 md:grid-cols-[280px_1fr]"
            >
              <div className="relative">
                <img src={a.image} alt={a.title} className="w-full h-full min-h-[180px] object-cover" />
                <span className={`absolute top-3 left-3 text-[10px] font-semibold px-3 py-1 rounded text-white ${a.categoryColor}`}>
                  {a.category}
                </span>
              </div>
              <div className="p-6 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                  <span className="inline-flex items-center gap-1"><Calendar size={12} /> {a.date}</span>
                  <span className="inline-flex items-center gap-1"><Clock size={12} /> {a.readTime}</span>
                </div>
                <h3 className="font-bold text-foreground text-lg mb-3 leading-snug">{a.title}</h3>
                <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-navy hover:text-gold transition-colors">
                  Baca Selengkapnya <ArrowRight size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Berita;
