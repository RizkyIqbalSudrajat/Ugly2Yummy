import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, Menu, X, ChevronDown, Sparkles, User, Package, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const { isLoggedIn, user, cartCount, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  // Click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/');
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-[#2E7D4F] py-1 ${
      isActive ? 'text-[#2E7D4F] font-semibold' : 'text-[#6E6E73]'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#FAFAF7]/85 border-b border-[#E8E6E1]/80 transition-all">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Logo */}
        <Link
          to={isLoggedIn ? '/beranda' : '/'}
          className="text-xl sm:text-2xl font-bold tracking-tight text-[#1D1D1F] select-none flex items-center gap-1 group"
        >
          <span>Ugly</span>
          <span className="text-[#2E7D4F] font-extrabold group-hover:scale-110 transition-transform inline-block">
            2
          </span>
          <span>Yummy</span>
        </Link>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          {isLoggedIn ? (
            <>
              <NavLink to="/beranda" className={navLinkClasses}>
                Beranda
              </NavLink>
              <NavLink to="/produk" className={navLinkClasses}>
                Produk
              </NavLink>
              <NavLink to="/cerita-bahan" className={navLinkClasses}>
                Cerita Bahan
              </NavLink>
              <NavLink to="/pesanan-saya" className={navLinkClasses}>
                Pesanan
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/produk" className={navLinkClasses}>
                Produk
              </NavLink>
              <NavLink to="/cerita-bahan" className={navLinkClasses}>
                Cerita Bahan
              </NavLink>
            </>
          )}
        </nav>

        {/* Zone 3: Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {/* Shopping Bag Button with Badge */}
              <Link
                to="/keranjang"
                className="relative p-2.5 rounded-full text-[#1D1D1F] hover:bg-[#F2F1EC] transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D4F]"
                aria-label="Keranjang belanja"
              >
                <ShoppingBag className="w-5 h-5 text-[#1D1D1F]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#2E7D4F] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Profile Avatar & Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2.5 rounded-full bg-[#F2F1EC] hover:bg-[#E8E6E1] transition-colors text-xs font-medium text-[#1D1D1F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D4F] cursor-pointer"
                  aria-expanded={profileDropdownOpen}
                >
                  <span className="max-w-[100px] truncate">{user?.nama.split(' ')[0]}</span>
                  <div className="w-7 h-7 rounded-full bg-[#2E7D4F] text-white flex items-center justify-center font-semibold text-xs shadow-xs">
                    {user?.nama.charAt(0)}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#6E6E73]" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E8E6E1] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2.5 border-b border-[#E8E6E1]/70">
                      <p className="text-xs font-semibold text-[#1D1D1F]">{user?.nama}</p>
                      <p className="text-[11px] text-[#6E6E73] truncate">{user?.email}</p>
                      <div className="mt-1.5 flex items-center gap-1 text-[10px] font-medium text-[#2E7D4F]">
                        <Sparkles className="w-3 h-3" />
                        <span>3,2 kg diselamatkan</span>
                      </div>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/dampak-saya"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#1D1D1F] hover:bg-[#F2F1EC] transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-[#2E7D4F]" />
                        <span>Dampak Saya</span>
                      </Link>
                      <Link
                        to="/pesanan-saya"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#1D1D1F] hover:bg-[#F2F1EC] transition-colors"
                      >
                        <Package className="w-4 h-4 text-[#6E6E73]" />
                        <span>Pesanan Saya</span>
                      </Link>
                      <Link
                        to="/profil"
                        className="flex items-center gap-2.5 px-4 py-2 text-xs text-[#1D1D1F] hover:bg-[#F2F1EC] transition-colors"
                      >
                        <User className="w-4 h-4 text-[#6E6E73]" />
                        <span>Profil Akun</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-[#E8E6E1]/70">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span>Keluar</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Button to="/masuk" variant="primary" size="sm">
              Masuk
            </Button>
          )}
        </div>

        {/* Mobile Action & Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {isLoggedIn && (
            <Link
              to="/keranjang"
              className="relative p-2 rounded-full text-[#1D1D1F] hover:bg-[#F2F1EC] transition-colors"
              aria-label="Keranjang belanja"
            >
              <ShoppingBag className="w-5 h-5 text-[#1D1D1F]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2E7D4F] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-[#1D1D1F] hover:bg-[#F2F1EC] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2E7D4F]"
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E6E1] bg-[#FAFAF7] px-5 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {isLoggedIn && (
            <div className="p-3.5 bg-white rounded-2xl border border-[#E8E6E1] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2E7D4F] text-white flex items-center justify-center font-bold text-sm">
                {user?.nama.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1D1D1F] truncate">{user?.nama}</p>
                <p className="text-xs text-[#6E6E73] truncate">{user?.email}</p>
              </div>
            </div>
          )}

          <nav className="flex flex-col space-y-1">
            {isLoggedIn ? (
              <>
                <Link
                  to="/beranda"
                  className="px-3 py-2.5 rounded-xl text-sm font-medium text-[#1D1D1F] hover:bg-[#F2F1EC]"
                >
                  Beranda
                </Link>
                <Link
                  to="/produk"
                  className="px-3 py-2.5 rounded-xl text-sm font-medium text-[#1D1D1F] hover:bg-[#F2F1EC]"
                >
                  Katalog Produk
                </Link>
                <Link
                  to="/cerita-bahan"
                  className="px-3 py-2.5 rounded-xl text-sm font-medium text-[#1D1D1F] hover:bg-[#F2F1EC]"
                >
                  Cerita Bahan
                </Link>
                <Link
                  to="/pesanan-saya"
                  className="px-3 py-2.5 rounded-xl text-sm font-medium text-[#1D1D1F] hover:bg-[#F2F1EC]"
                >
                  Pesanan Saya
                </Link>
                <Link
                  to="/dampak-saya"
                  className="px-3 py-2.5 rounded-xl text-sm font-medium text-[#1D1D1F] hover:bg-[#F2F1EC] flex items-center justify-between"
                >
                  <span>Dampak Saya</span>
                  <span className="text-xs font-semibold text-[#2E7D4F] bg-[#EBF4EE] px-2 py-0.5 rounded-full">
                    3,2 kg
                  </span>
                </Link>
                <Link
                  to="/profil"
                  className="px-3 py-2.5 rounded-xl text-sm font-medium text-[#1D1D1F] hover:bg-[#F2F1EC]"
                >
                  Profil Akun
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/produk"
                  className="px-3 py-2.5 rounded-xl text-sm font-medium text-[#1D1D1F] hover:bg-[#F2F1EC]"
                >
                  Katalog Produk
                </Link>
                <Link
                  to="/cerita-bahan"
                  className="px-3 py-2.5 rounded-xl text-sm font-medium text-[#1D1D1F] hover:bg-[#F2F1EC]"
                >
                  Cerita Bahan
                </Link>
              </>
            )}
          </nav>

          <div className="pt-3 border-t border-[#E8E6E1]">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full py-2.5 text-center text-sm font-medium text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
              >
                Keluar dari Akun Demo
              </button>
            ) : (
              <Button to="/masuk" variant="primary" fullWidth size="md">
                Masuk (Demo)
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
