import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, User, Menu, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useAppSelector } from '@/store';

// Chargement dynamique des composants (SSR désactivé car utilise window)
const Wishlist = dynamic(() => import('./Wishlist'), { ssr: false });

// Styles globaux pour l'animation
const styles = `
  @keyframes fadeInOut {
    0% { opacity: 0; }
    10% { opacity: 1; }
    40% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 0; }
  }
  
  .animate-marquee {
    position: relative;
    height: 1.5em;
    overflow: hidden;
  }
  
  .animate-marquee span {
    position: absolute;
    width: 100%;
    text-align: center;
    left: 0;
    opacity: 0;
    animation: fadeInOut 10s infinite;
  }
  
  .animate-marquee span:nth-child(1) {
    animation-delay: 0s;
  }
  
  .animate-marquee span:nth-child(2) {
    animation-delay: 5s;
  }
`;

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  size: string;
  color: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  size: string;
  color: string;
}

const Header: React.FC = () => {
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  
  // Panier global depuis Redux
  const cartItems = useAppSelector(state => state.cart.items);

  // Données de démonstration pour la wishlist
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 1,
      name: 'T-Shirt Basique',
      price: 29.90,
      originalPrice: 39.90,
      size: 'M',
      color: 'Noir',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 2,
      name: 'Jean Slim',
      price: 89.90,
      size: '40',
      color: 'Bleu',
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    },
  ]);
  // Ajout des styles globaux
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { name: 'Boutique', href: '/shop' },
    { name: 'À propos', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <>
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-sky-400 to-blue-500 text-white text-sm py-3 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="animate-marquee">
              <span>🎉 Offres Exclusives : Jusqu'à -30% Appliqués Directement à la Caisse !</span>
              <span>🔄 Retours gratuits sous 14 jours</span>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-space-grotesk font-bold text-gray-900">
                YOUEGOS
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-gray-700 hover:text-sky-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {/*
              <Link 
                href="/wishlist"
                className="p-2 text-gray-700 hover:text-sky-600 relative"
                aria-label="Liste d'envies"
              >
                <Heart className="h-5 w-5" />
              </Link>
              */}
              
              {/* Panier */}
              <Link
                href="/cart"
                className="p-2 text-gray-700 hover:text-sky-600 relative"
                aria-label="Panier"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-sky-600 text-white rounded-full text-xs px-1.5 py-0.5 min-w-[18px] text-center font-bold">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Link>
              
              <Link href="/account" className="p-2 text-gray-700 hover:text-sky-600">
                <User className="h-5 w-5" />
              </Link>
              
              <button 
                className="md:hidden p-2 text-gray-700 hover:text-sky-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-sky-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
      
      {/* Wishlist */}
      <Wishlist 
        isOpen={isWishlistOpen} 
        onClose={() => setIsWishlistOpen(false)}
        items={wishlistItems}
        onRemoveItem={(id) => setWishlistItems(wishlistItems.filter(item => item.id !== id))}
        onMoveToCart={(item) => {
          // Logique pour ajouter au panier
          setWishlistItems(wishlistItems.filter(i => i.id !== item.id));
          // Ici, vous pourriez ajouter une notification ou une animation
        }}
      />
    </>
  );
};

export default Header;
