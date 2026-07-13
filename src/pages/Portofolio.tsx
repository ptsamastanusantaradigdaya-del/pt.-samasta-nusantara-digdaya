import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Leaf, Briefcase, ShoppingBag, Sparkles } from "lucide-react";

type CategoryKey = "pemeliharaan" | "jasa" | "perdagangan" | "event";

const categories: {
  key: CategoryKey;
  label: string;
  icon: typeof Leaf;
  color: string;
  cardBg: string;
  btnBg: string;
}[] = [
  {
    key: "pemeliharaan",
    label: "Pemeliharaan, Perawatan, dan Pembuatan Lingkungan",
    icon: Leaf,
    color: "text-emerald-600",
    cardBg: "bg-emerald-500",
    btnBg: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    key: "jasa",
    label: "Jasa Profesional & Pengembangan SDM",
    icon: Briefcase,
    color: "text-indigo-600",
    cardBg: "bg-indigo-500",
    btnBg: "bg-indigo-600 hover:bg-indigo-700",
  },
  {
    key: "perdagangan",
    label: "Pengolahan dan Perdagangan Besar",
    icon: ShoppingBag,
    color: "text-orange-600",
    cardBg: "bg-orange-500",
    btnBg: "bg-orange-600 hover:bg-orange-700",
  },
  {
    key: "event",
    label: "Event Organizer, Kreatif & Media",
    icon: Sparkles,
    color: "text-purple-600",
    cardBg: "bg-purple-500",
    btnBg: "bg-purple-600 hover:bg-purple-700",
  },
];

type Project = {
  category: CategoryKey;
  tag: string;
  year: string;
  title: string;
  client?: string;
  location?: string;
  description: string;
};

const projects: Project[] = [
  // Pemeliharaan
  {
    category: "pemeliharaan",
    tag: "Perawatan Taman",
    year: "2024",
    title: "Perawatan Taman Kompleks Perumahan Elite",
    location: "Jakarta Selatan",
    description:
      "Pengelolaan dan pemeliharaan taman landscape area perumahan seluas 5.000 m² meliputi perawatan tanaman hias, pemangkasan pohon, dan penataan area hijau.",
  },
  {
    category: "pemeliharaan",
    tag: "Kebersihan Bangunan",
    year: "2024",
    title: "Layanan Kebersihan Gedung Perkantoran",
    location: "Jakarta Pusat",
    description:
      "Distribusi layanan sanitasi harian untuk gedung perkantoran 8 lantai meliputi pembersihan ruangan, sanitasi toilet, dan perawatan area lobby.",
  },
  {
    category: "pemeliharaan",
    tag: "Perawatan Taman",
    year: "2024",
    title: "Perawatan Taman Fasilitas Publik",
    location: "Bogor",
    description:
      "Pemeliharaan taman publik dan area hijau perkotaan seluas 3 hektar dengan sistem irigasi otomatis dan program penanaman pohon berkala.",
  },
  {
    category: "pemeliharaan",
    tag: "Kebersihan Bangunan",
    year: "2023",
    title: "Kebersihan Gedung Institusi Pendidikan",
    location: "Tangerang",
    description:
      "Layanan kebersihan komprehensif untuk gedung kampus meliputi ruang kelas, laboratorium, perpustakaan, dan area umum dengan jadwal terjadwal.",
  },
  // Jasa Profesional
  {
    category: "jasa",
    tag: "Konsultan Hukum",
    year: "2024",
    title: "Konsultasi Legal Perusahaan Startup",
    client: "PT Teknologi Digital Indonesia",
    description:
      "Pendampingan legal untuk pendirian perusahaan, penyusunan kontrak bisnis, dan konsultasi regulasi perpajakan bagi startup teknologi.",
  },
  {
    category: "jasa",
    tag: "Sertifikasi Kompetensi",
    year: "2024",
    title: "Program Sertifikasi Kompetensi Karyawan",
    client: "Perusahaan Manufaktur",
    description:
      "Penyelenggaraan program sertifikasi kompetensi untuk 50 karyawan di bidang K3, operator forklift, dan quality control.",
  },
  {
    category: "jasa",
    tag: "Sertifikasi Halal",
    year: "2024",
    title: "Pendampingan Sertifikasi Halal UMKM",
    client: "UMKM Kuliner Jakarta",
    description:
      "Konsultasi dan pendampingan proses sertifikasi halal untuk 15 pelaku UMKM kuliner, termasuk audit dan pengurusan dokumen.",
  },
  {
    category: "jasa",
    tag: "Arsitektur",
    year: "2023",
    title: "Desain Arsitektur Kantor Modern",
    client: "PT Solusi Bumi Indonesia",
    description:
      "Perancangan desain arsitektur kantor 3 lantai dengan konsep modern minimalis, termasuk denah ruang, MEP, dan visualisasi 3D.",
  },
  {
    category: "jasa",
    tag: "Sertifikasi Kompetensi",
    year: "2023",
    title: "Pelatihan Leadership untuk Manajemen",
    client: "Yayasan Pendidikan",
    description:
      "Program pelatihan kepemimpinan dan manajemen untuk 30 tenaga manajemen institusi pendidikan dengan sertifikasi kompetensi.",
  },
  // Perdagangan
  {
    category: "perdagangan",
    tag: "Konveksi",
    year: "2024",
    title: "Produksi Seragam Korporat 500 Set",
    location: "Skala: 500 Set",
    client: "Seragam Kantor",
    description:
      "Produksi seragam korporat custom dengan bahan berkualitas, bordir logo perusahaan, dan pengiriman tepat waktu sesuai spesifikasi klien.",
  },
  {
    category: "perdagangan",
    tag: "Distribusi",
    year: "2024",
    title: "Distribusi Hasil Pertanian Regional",
    location: "Skala: Regional Jabodetabek",
    client: "Sayuran Segar",
    description:
      "Distribusi sayuran segar dari petani lokal ke pasar modern dan retail dengan sistem cold chain dan kontrol kualitas ketat.",
  },
  {
    category: "perdagangan",
    tag: "Konveksi",
    year: "2024",
    title: "Produksi Merchandise Event 1000 Pcs",
    location: "Skala: 1000 Pcs",
    client: "Tas & Kaos",
    description:
      "Produksi merchandise event berupa tote bag dan kaos dengan custom design premium untuk kegiatan konferensi nasional.",
  },
  {
    category: "perdagangan",
    tag: "Distribusi",
    year: "2023",
    title: "Distribusi Hasil Perikanan Laut",
    location: "Skala: Nasional",
    client: "Ikan Segar",
    description:
      "Pengadaan dan distribusi ikan segar dari nelayan lokal ke pasar dengan sistem packaging modern dan standar HACCP.",
  },
  {
    category: "perdagangan",
    tag: "Konveksi",
    year: "2023",
    title: "Produksi Seragam Sekolah 800 Set",
    location: "Skala: 800 Set",
    client: "Seragam Sekolah",
    description:
      "Produksi seragam sekolah untuk institusi pendidikan dengan standar kualitas tinggi, ukuran custom, dan pengiriman sesuai jadwal.",
  },
  // Event
  {
    category: "event",
    tag: "Event MICE",
    year: "2024",
    title: "Konferensi Nasional Industri Halal 2024",
    client: "Asosiasi Industri Halal Indonesia",
    description:
      "Penyelenggaraan konferensi nasional dengan 300+ peserta meliputi venue management, audio visual, dokumentasi, dan koordinasi narasumber.",
  },
  {
    category: "event",
    tag: "Jasa Boga (Catering)",
    year: "2024",
    title: "Catering Acara Rapat Tahunan Korporat",
    client: "PT Investasi Nusantara",
    description:
      "Layanan catering premium untuk acara rapat tahunan dengan 200 tamu, menyediakan menu prasmanan berkualitas dan servis profesional.",
  },
  {
    category: "event",
    tag: "Desain Komunikasi Visual",
    year: "2024",
    title: "Desain Branding & Website Perusahaan",
    client: "PT Kreasi Digital Nusantara",
    description:
      "Pembuatan identitas visual lengkap meliputi logo, brand guideline, desain marketing, dan pengembangan website korporat responsif.",
  },
  {
    category: "event",
    tag: "Penerbitan",
    year: "2023",
    title: "Penerbitan Buku Panduan Korporat",
    client: "Yayasan Pendidikan Karakter",
    description:
      "Proses penerbitan buku panduan korporat meliputi editing, layout desain, cetak, dan distribusi dengan kualitas premium.",
  },
  {
    category: "event",
    tag: "Event MICE",
    year: "2023",
    title: "Workshop & Seminar Marketing Digital",
    client: "UMKM Jakarta",
    description:
      "Penyelenggaraan workshop pelatihan marketing digital untuk pelaku UMKM dengan narasumber profesional dan fasilitas lengkap.",
  },
  {
    category: "event",
    tag: "Jasa Boga (Catering)",
    year: "2023",
    title: "Catering Event Peluncuran Produk",
    client: "PT Teknologi Kreatif",
    description:
      "Layanan catering untuk acara launching produk teknologi dengan konsep modern, menu fusion, dan presentasi menarik.",
  },
];

const Portofolio = () => {
  const [filter, setFilter] = useState<"all" | CategoryKey>("all");

  const visibleCategories = useMemo(
    () => (filter === "all" ? categories : categories.filter((c) => c.key === filter)),
    [filter]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-16">
        <div className="bg-gradient-to-r from-[#1E3A8A] to-blue-600">
          <div className="container mx-auto px-4 pt-8 pb-14">
            <div className="flex items-center gap-2 text-sm text-white/70 mb-8">
              <Link to="/" className="hover:text-white transition-colors">🏠 Beranda</Link>
              <span>&gt;</span>
              <span className="text-white">Portofolio</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                  Portofolio Perusahaan
                </h1>
                <p className="text-white/80 text-sm max-w-md">
                  Dokumentasi pengalaman dan proyek yang telah kami tangani di berbagai bidang usaha.
                </p>
              </div>
              <div className="flex-shrink-0 w-64 h-40 md:w-80 md:h-52 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&h=400&fit=crop"
                  alt="Portofolio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">Kategori Portofolio</h2>
          <p className="text-muted-foreground text-sm mb-6">Filter portofolio berdasarkan bidang usaha</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-[#1E3A8A] text-white"
                  : "bg-muted text-foreground hover:bg-muted/70"
              }`}
            >
              Semua Proyek
            </button>
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setFilter(c.key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === c.key
                    ? "bg-[#1E3A8A] text-white"
                    : "bg-muted text-foreground hover:bg-muted/70"
                }`}
              >
                <c.icon className="w-4 h-4" />
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Category sections */}
      {visibleCategories.map((cat) => {
        const items = projects.filter((p) => p.category === cat.key);
        if (items.length === 0) return null;
        return (
          <section key={cat.key} className="py-8 bg-muted/30">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="flex items-center gap-3 mb-6">
                <cat.icon className={`w-6 h-6 ${cat.color}`} />
                <h3 className="text-lg md:text-xl font-bold text-foreground">{cat.label}</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-6">
                Portofolio layanan pada kategori ini mencakup berbagai proyek yang telah kami tangani.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((p, i) => (
                  <article
                    key={i}
                    className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col"
                  >
                    <div className={`${cat.cardBg} px-4 py-3 flex items-center justify-between`}>
                      <span className="text-white/90 text-xs font-medium">{p.tag}</span>
                      <span className="text-white/90 text-xs font-medium">{p.year}</span>
                    </div>
                    <div className={`${cat.cardBg} px-4 pb-4`}>
                      <h4 className="text-white font-bold text-base leading-snug">{p.title}</h4>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      {p.location && (
                        <p className="text-xs text-muted-foreground mb-1">
                          <span className="font-semibold text-foreground">Lokasi:</span> {p.location}
                        </p>
                      )}
                      {p.client && (
                        <p className="text-xs text-muted-foreground mb-1">
                          <span className="font-semibold text-foreground">Klien:</span> {p.client}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground mt-2 mb-4 line-clamp-4 flex-1">
                        {p.description}
                      </p>
                      <button
                        className={`w-full py-2 rounded-lg text-white text-sm font-semibold transition-colors ${cat.btnBg}`}
                      >
                        Lihat Detail Proyek →
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <Footer />
    </div>
  );
};

export default Portofolio;
