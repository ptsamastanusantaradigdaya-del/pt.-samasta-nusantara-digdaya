import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle, Mail, Phone, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AjukanPenawaranUmum = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    nama_lengkap: "",
    nama_perusahaan: "",
    email: "",
    whatsapp: "",
    deskripsi: "",
    estimasi_waktu: "",
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("pengajuan_penawaran").insert({
        nama_lengkap: form.nama_lengkap.trim(),
        nama_perusahaan: form.nama_perusahaan.trim(),
        email: form.email.trim(),
        whatsapp: form.whatsapp.trim(),
        category_slug: "umum",
        scope_slug: null,
        selected_services: [],
        deskripsi: form.deskripsi.trim(),
        estimasi_waktu: form.estimasi_waktu.trim(),
      });
      if (error) throw error;
      toast({
        title: "Permintaan terkirim!",
        description: "Tim kami akan menghubungi Anda dalam waktu 1×24 jam.",
      });
      setForm({ nama_lengkap: "", nama_perusahaan: "", email: "", whatsapp: "", deskripsi: "", estimasi_waktu: "" });
    } catch (err: any) {
      toast({
        title: "Gagal mengirim permintaan",
        description: err?.message ?? "Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link
            to="/layanan"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-8"
          >
            <ArrowLeft size={16} />
            Kembali ke Layanan
          </Link>

          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#1E3A8A] text-white text-xs font-semibold rounded-full mb-4">
              Penawaran Layanan
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">
              Ajukan Permintaan Penawaran
            </h1>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Isi formulir di bawah ini untuk mendapatkan penawaran terbaik sesuai kebutuhan bisnis Anda. Tim profesional kami akan menghubungi Anda dalam waktu 1×24 jam.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Masukkan nama lengkap Anda"
                    required
                    value={form.nama_lengkap}
                    onChange={(e) => setForm({ ...form, nama_lengkap: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Nama Perusahaan / Instansi / Lembaga <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Masukkan nama perusahaan / instansi / lembaga Anda"
                    required
                    value={form.nama_perusahaan}
                    onChange={(e) => setForm({ ...form, nama_perusahaan: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="nama@perusahaan.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Nomor WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="+62 812-3456-7890"
                    required
                    value={form.whatsapp}
                    onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Deskripsi Kebutuhan / Proyek <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    placeholder="Jelaskan kebutuhan dan detail proyek Anda secara lengkap..."
                    rows={4}
                    required
                    value={form.deskripsi}
                    onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Estimasi Waktu Pengerjaan <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Contoh: 3 bulan"
                    required
                    value={form.estimasi_waktu}
                    onChange={(e) => setForm({ ...form, estimasi_waktu: e.target.value })}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#1E3A8A] hover:bg-[#1D4ED8] text-white py-6 text-sm font-semibold"
                >
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {submitting ? "Mengirim..." : "Kirim Permintaan"}
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bg-[#1E3A8A] rounded-xl p-6 text-white">
                <h3 className="font-bold text-base mb-4">Proses Selanjutnya</h3>
                <div className="space-y-4">
                  {[
                    "Tim kami akan menghubungi Anda dalam waktu 1×24 jam",
                    "Diskusi kebutuhan dan spesifikasi proyek secara detail",
                    "Kami akan menyusun proposal dan penawaran harga",
                    "Mulai pengerjaan setelah kesepakatan tercapai",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </div>
                      <p className="text-white/90 text-xs leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-bold text-base text-foreground mb-4">Mengapa Memilih Kami?</h3>
                <div className="space-y-4">
                  {[
                    { label: "Profesional", desc: "Tim ahli dengan pengalaman bertahun-tahun" },
                    { label: "Responsif", desc: "Respon cepat dalam 1×24 jam" },
                    { label: "Terpercaya", desc: "Dipercaya oleh ratusan perusahaan" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-bold text-base text-foreground mb-3">Butuh Bantuan?</h3>
                <p className="text-xs text-muted-foreground mb-4">Hubungi tim kami jika Anda memiliki pertanyaan</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail size={14} />
                    <span>info@snd.co.id</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone size={14} />
                    <span>+62 858-1397-4229</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AjukanPenawaranUmum;
