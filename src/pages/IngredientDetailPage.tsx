import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { INGREDIENTS, PRODUCTS } from '../data/dummy';
import { Container } from '../components/ui/Container';
import { SmartImage } from '../components/ui/SmartImage';
import {
  ArrowLeft,
  MapPin,
  User,
  Calendar,
  Sparkles,
  Quote,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

export const IngredientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const ingredient =
    INGREDIENTS.find((i) => i.id === id) || INGREDIENTS[0];

  // Find products made with this ingredient
  const relatedProducts = PRODUCTS.filter((p) =>
    ingredient.produkOlahIds.includes(p.id)
  );

  const formattedSaved = ingredient.totalKgTerselamatkan.toLocaleString('id-ID');

  return (
    <article className="py-10 sm:py-16 md:py-20 space-y-16 sm:space-y-24">
      {/* =========================================================================
          1. HERO FOTO LEBAR DENGAN JUDUL
          ========================================================================= */}
      <section>
        <Container>
          {/* Back Navigation Link */}
          <div className="mb-6 sm:mb-8">
            <Link
              to="/cerita-bahan"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E6E73] hover:text-[#2E7D4F] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Semua Cerita Bahan</span>
            </Link>
          </div>

          {/* Hero Banner Container */}
          <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden bg-[#1D1D1F] border border-[#E8E6E1]/60 shadow-lg min-h-[380px] sm:min-h-[480px] lg:min-h-[540px] flex flex-col justify-end p-6 sm:p-12 lg:p-16">
            {/* Background Image with Scrim */}
            <div className="absolute inset-0 z-0">
              <SmartImage
                src={ingredient.gambar}
                alt={ingredient.nama}
                fallbackEmoji={ingredient.emoji}
                aspectRatio="16:9"
                containerClassName="w-full h-full"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/25" />
            </div>

            {/* Hero Title & Location */}
            <div className="relative z-10 max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/25">
                <span className="text-sm">{ingredient.emoji}</span>
                <span>Kisah Bahan Asli Nusantara</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] text-balance">
                {ingredient.nama} dari {ingredient.asal.split(',')[0]}
              </h1>

              <p className="text-base sm:text-lg text-white/80 max-w-xl leading-relaxed">
                Di balik bentuk yang dianggap tidak sempurna, ada dedikasi petani lokal dan cita
                rasa alami terbaik.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          2. BARIS FAKTA SINGKAT
          Asal, Petani, Musim Panen, Total Terselamatkan
          ========================================================================= */}
      <section>
        <Container>
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#E8E6E1] p-6 sm:p-8 shadow-xs">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E8E6E1]/70">
              {/* Asal */}
              <div className="pt-3 sm:pt-0 sm:px-4 space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#2E7D4F]" />
                  Asal Daerah
                </span>
                <p className="text-sm sm:text-base font-bold text-[#1D1D1F]">
                  {ingredient.asal}
                </p>
              </div>

              {/* Petani */}
              <div className="pt-3 sm:pt-0 sm:px-4 space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#2E7D4F]" />
                  Petani Mitra
                </span>
                <p className="text-sm sm:text-base font-bold text-[#1D1D1F]">
                  {ingredient.petani}
                </p>
              </div>

              {/* Musim Panen */}
              <div className="pt-3 sm:pt-0 sm:px-4 space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#2E7D4F]" />
                  Musim Panen
                </span>
                <p className="text-sm sm:text-base font-bold text-[#1D1D1F]">
                  {ingredient.musimPanen || 'Sepanjang Tahun'}
                </p>
              </div>

              {/* Total Terselamatkan */}
              <div className="pt-3 sm:pt-0 sm:px-4 space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#2E7D4F]" />
                  Terselamatkan
                </span>
                <p className="text-sm sm:text-base font-bold text-[#2E7D4F] tabular-nums">
                  {formattedSaved} kg
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          3. CERITA 3–4 PARAGRAF DENGAN LEBAR TEKS YANG NYAMAN DIBACA
          ========================================================================= */}
      <section>
        <Container size="narrow">
          <div className="max-w-2xl mx-auto space-y-6 text-[#1D1D1F] text-base sm:text-lg leading-[1.8] font-normal">
            {ingredient.ceritaPanjang && ingredient.ceritaPanjang.length > 0 ? (
              ingredient.ceritaPanjang.map((paragraf, index) => (
                <p key={index} className="text-balance">
                  {paragraf}
                </p>
              ))
            ) : (
              <>
                <p className="text-balance">{ingredient.ceritaSingkat}</p>
                <p className="text-balance">
                  Di tangan para petani yang tekun, buah dan sayur ini dirawat dengan sepenuh hati
                  tanpa memaksakan bentuk seragam pabrikan. Alam memiliki keindahannya sendiri yang
                  selalu mengejutkan indra pengecap kita.
                </p>
                <p className="text-balance">
                  Ketika pasar konvensional menutup pintu, Ugly2Yummy hadir merayakan setiap
                  lekukan unik dan bercak kematangan, mengubahnya menjadi produk artisan yang bernilai
                  tinggi.
                </p>
              </>
            )}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          4. KUTIPAN BESAR DARI PETANI
          ========================================================================= */}
      <section className="bg-[#FAF8F5] py-16 sm:py-20 border-y border-[#E8E6E1]">
        <Container size="narrow">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <Quote className="w-12 h-12 text-[#2E7D4F]/30 mx-auto stroke-[1.2]" />
            <blockquote className="font-['Instrument_Serif'] italic text-2xl sm:text-3xl md:text-4xl text-[#1D1D1F] leading-snug">
              &ldquo;
              {ingredient.kutipanPetani?.teks ||
                'Kami merawat hasil bumi dengan rasa cinta. Rasa manis dan aromanya tidak pernah berkurang hanya karena bentuknya tak biasa.'}
              &rdquo;
            </blockquote>
            <div className="pt-2">
              <p className="text-sm font-bold text-[#1D1D1F]">
                {ingredient.kutipanPetani?.nama || ingredient.petani}
              </p>
              <p className="text-xs text-[#6E6E73] mt-0.5">
                {ingredient.kutipanPetani?.peran || `Petani Mitra di ${ingredient.asal}`}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          5. DUA KARTU BERDAMPINGAN: "Kenapa dianggap ugly?" & "Faktanya"
          ========================================================================= */}
      <section>
        <Container size="narrow">
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kartu 1: Kenapa dianggap ugly? */}
            <div className="bg-white rounded-3xl border border-[#E8E6E1] p-7 sm:p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#FEF3E8] text-[#C86218] flex items-center justify-center mb-5">
                  <AlertCircle className="w-5 h-5 stroke-[1.7]" />
                </div>
                <h3 className="text-lg font-bold text-[#1D1D1F] mb-3">
                  Kenapa dianggap &quot;ugly&quot;?
                </h3>
                <p className="text-sm text-[#6E6E73] leading-relaxed">
                  {ingredient.alasanUgly}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8E6E1]/70 text-xs text-[#C86218] font-semibold">
                Standar Estetika Ritel Modern
              </div>
            </div>

            {/* Kartu 2: Faktanya */}
            <div className="bg-[#EBF4EE] rounded-3xl border border-[#2E7D4F]/20 p-7 sm:p-8 flex flex-col justify-between shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white text-[#2E7D4F] flex items-center justify-center mb-5 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 stroke-[1.7]" />
                </div>
                <h3 className="text-lg font-bold text-[#1D1D1F] mb-3">
                  Faktanya
                </h3>
                <p className="text-sm text-[#1D1D1F]/80 leading-relaxed font-medium">
                  {ingredient.fakta}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2E7D4F]/20 text-xs text-[#2E7D4F] font-bold">
                100% Nutrisi & Rasa Murni
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          6. "DIOLAH MENJADI": KARTU PRODUK YANG MEMAKAI BAHAN INI
          ========================================================================= */}
      <section className="bg-[#F2F1EC] py-16 sm:py-24 border-t border-[#E8E6E1]">
        <Container>
          <div className="max-w-4xl mx-auto mb-10 text-center sm:text-left sm:flex sm:items-end sm:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2E7D4F] block mb-1">
                Karya Kuliner Upcycled
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
                Diolah Menjadi
              </h2>
              <p className="mt-1.5 text-sm text-[#6E6E73]">
                Produk artisan lezat yang dibuat langsung dari {ingredient.nama}.
              </p>
            </div>

            <Link
              to="/produk"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1 text-xs font-semibold text-[#2E7D4F] hover:underline"
            >
              <span>Semua Produk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {relatedProducts.map((product) => {
              const formattedPrice = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumFractionDigits: 0,
              }).format(product.harga);

              return (
                <div
                  key={product.id}
                  onClick={() => navigate(`/produk/${product.id}`)}
                  className="group bg-white rounded-3xl border border-[#E8E6E1] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative w-full overflow-hidden bg-[#F2F1EC]">
                    <SmartImage
                      src={product.gambar}
                      alt={product.nama}
                      fallbackEmoji={product.gambarEmojiFallback}
                      aspectRatio="16:9"
                      hoverZoom={true}
                      containerClassName="w-full"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#2E7D4F] shadow-xs">
                      {product.estimasiKgTerselamatkan} kg diselamatkan
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-[#6E6E73] uppercase tracking-wider font-medium">
                        {product.kategori} · {product.ukuran}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-[#1D1D1F] group-hover:text-[#2E7D4F] transition-colors mt-1">
                        {product.nama}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-[#6E6E73] line-clamp-2 leading-relaxed">
                        {product.deskripsiSingkat}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#E8E6E1]/70 flex items-center justify-between">
                      <span className="text-base sm:text-lg font-bold text-[#1D1D1F] tabular-nums">
                        {formattedPrice}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2E7D4F] group-hover:translate-x-0.5 transition-transform">
                        <span>Lihat Produk</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </article>
  );
};
