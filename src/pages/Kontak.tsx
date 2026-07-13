import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImg from "@/assets/hero-building.png";

const contactItems = [
  { icon: Mail, label: "Email", value: "info@samastanusantara.com", bg: "bg-blue-100", color: "text-blue-600" },
  { icon: Phone, label: "WhatsApp", value: "+62 812-3456-7890", bg: "bg-green-100", color: "text-green-600" },
  { icon: MapPin, label: "Alamat Kantor", value: "Jl. Tegalan, Palmerah, Matraman, Jakarta Timur", bg: "bg-red-100", color: "text-red-600" },
];

const socials = [
  { icon: Facebook, label: "Facebook", handle: "@samastanusantara", bg: "bg-blue-600", color: "text-white" },
  { icon: Instagram, label: "Instagram", handle: "@samastanusantara", bg: "bg-gradient-to-br from-pink-500 to-orange-400", color: "text-white" },
  { icon: Youtube, label: "YouTube", handle: "@samastanusantara", bg: "bg-red-600", color: "text-white" },
  { icon: MessageCircle, label: "TikTok", handle: "@samastanusantara", bg: "bg-black", color: "text-white" },
];

const Kontak = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-16 bg-muted/40">
        <div className="container mx-auto px-4 py-3 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-navy">Beranda</Link>
          <span className="mx-2">›</span>
          <span className="text-navy font-medium">Kontak</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#1E3A8A]/80" />
        </div>
        <div className="relative container mx-auto px-4 py-16 text-center text-primary-foreground">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Hubungi Kami</h1>
          <p className="max-w-2xl mx-auto text-sm text-primary-foreground/90">
            Kami siap menjadi mitra strategis Anda. Hubungi kami untuk konsultasi dan informasi lebih lanjut mengenai layanan kami.
          </p>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="py-10 -mt-4">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-5">
          {contactItems.map((c) => (
            <div key={c.label} className="bg-card rounded-xl p-6 shadow-sm border">
              <div className={`w-10 h-10 rounded-lg ${c.bg} ${c.color} flex items-center justify-center mb-4`}>
                <c.icon size={20} />
              </div>
              <h3 className="font-bold text-foreground mb-1">{c.label}</h3>
              <p className="text-sm text-muted-foreground">{c.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social */}
      <section className="py-14 bg-muted/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">Ikuti Kami di Media Sosial</h2>
            <p className="text-sm text-muted-foreground mt-2">Tetap terhubung dengan kami melalui platform media sosial</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {socials.map((s) => (
              <a key={s.label} href="#" className="bg-card rounded-xl p-6 shadow-sm border text-center hover:shadow-md transition-shadow">
                <div className={`w-14 h-14 rounded-xl ${s.bg} ${s.color} flex items-center justify-center mx-auto mb-3`}>
                  <s.icon size={26} />
                </div>
                <h3 className="font-bold text-foreground">{s.label}</h3>
                <p className="text-xs text-muted-foreground mt-1">{s.handle}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">Lokasi Kantor</h2>
            <p className="text-sm text-muted-foreground mt-2">Kunjungi kantor kami untuk konsultasi langsung</p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="rounded-xl overflow-hidden bg-muted aspect-[16/7] shadow-sm">
              <iframe
                title="Lokasi Kantor"
                src="https://www.google.com/maps?q=Palmerah,Jakarta&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#1E3A8A] text-primary-foreground rounded-xl p-8 mt-6">
              <div>
                <h3 className="font-bold mb-3">Alamat Lengkap</h3>
                <p className="text-sm text-primary-foreground/90 leading-relaxed">
                  PT Samasta Nusantara Digdaya<br />
                  Jl. Tegalan Rt 001 Rw 003<br />
                  Palmerah, Kec. Matraman<br />
                  Kota Jakarta Timur<br />
                  Daerah Khusus Ibukota Jakarta
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-3">Jam Operasional</h3>
                <ul className="text-sm text-primary-foreground/90 space-y-1">
                  <li>Senin - Jumat: 08:00 - 17:00 WIB</li>
                  <li>Sabtu: 08:00 - 12:00 WIB</li>
                  <li>Minggu & Hari Libur: Tutup</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/40">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Siap Bermitra dengan Kami?</h2>
          <p className="text-sm text-muted-foreground mb-8">
            Hubungi tim kami sekarang untuk mendapatkan solusi terbaik bagi kebutuhan bisnis Anda
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://wa.me/6281234567890" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold text-sm rounded-lg hover:bg-green-600 transition-colors">
              <MessageCircle size={16} /> Chat via WhatsApp
            </a>
            <Link to="/layanan/pemeliharaan/kebersihan-bangunan/penawaran" className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-primary-foreground font-semibold text-sm rounded-lg hover:bg-navy-light transition-colors">
              <Mail size={16} /> Ajukan Penawaran
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Kontak;
