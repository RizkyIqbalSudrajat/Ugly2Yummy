import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data/dummy';
import { Container } from '../components/ui/Container';
import { SmartImage } from '../components/ui/SmartImage';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Sparkles, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useAuth();
  const [added, setAdded] = React.useState(false);

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(product.harga);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="py-12 sm:py-16">
      <Container>
        <div className="mb-6">
          <Link
            to="/produk"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6E6E73] hover:text-[#2E7D4F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog Produk</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Gallery Col */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-[#E8E6E1] overflow-hidden p-3 sm:p-4">
            <SmartImage
              src={product.gambar}
              alt={product.nama}
              fallbackEmoji={product.gambarEmojiFallback}
              aspectRatio="4:3"
              containerClassName="rounded-2xl overflow-hidden"
            />
          </div>

          {/* Purchasing & Story Col */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2 text-xs text-[#6E6E73]">
                <span className="uppercase tracking-wider font-semibold">
                  {product.kategori}
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1 font-semibold text-[#2E7D4F]">
                  <Sparkles className="w-3.5 h-3.5" />
                  {product.estimasiKgTerselamatkan} kg Terselamatkan
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1D1D1F]">
                {product.nama}
              </h1>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] tabular-nums">
                  {formattedPrice}
                </span>
                <span className="text-sm text-[#6E6E73]">/ {product.ukuran}</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed">
              {product.deskripsiLengkap || product.deskripsiSingkat}
            </p>

            {/* Ingredients list */}
            <div className="p-4 rounded-2xl bg-[#FAFAF7] border border-[#E8E6E1]">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1D1D1F] mb-2">
                Komposisi Bersih & Alami:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#1D1D1F]">
                {product.komposisi.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D4F] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="lg"
                icon={<ShoppingBag className="w-4 h-4" />}
              >
                {added ? 'Ditambahkan ke Keranjang!' : 'Tambah ke Keranjang'}
              </Button>
              <Button to={`/cerita-bahan/${product.ingredientId}`} variant="secondary" size="lg">
                Lihat Cerita {product.bahanUtama}
              </Button>
            </div>

            <div className="text-xs text-[#6E6E73] flex items-center gap-2 pt-2">
              <span className="w-2 h-2 rounded-full bg-[#2E7D4F]" />
              <span>Stok tersedia langsung dari dapur upcycling kami.</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
