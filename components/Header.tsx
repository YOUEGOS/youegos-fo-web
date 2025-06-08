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
      <header className="w-full bg-background/95 backdrop-blur-md sticky top-0 z-50 border-b border-accent/10">
        {/* Top Bar */}
        <div className="bg-accent/10 text-text-primary text-xs sm:text-sm py-2 sm:py-3 px-4 overflow-hidden border-b border-accent/10">
          <div className="max-w-7xl mx-auto">
            <div className="animate-marquee">
              <span className="font-display tracking-wider">✨ Collection Exclusive : Édition Limitée</span>
              <span className="font-display tracking-wider">🌟 Livraison Express Offerte</span>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="text-2xl sm:text-3xl font-display text-text-primary hover:text-accent transition-colors duration-300"
              >
                YOUEGOS
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8 xl:space-x-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-text-secondary hover:text-accent px-3 py-2 text-sm uppercase tracking-wider font-sans transition-colors duration-300 whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/*<Link 
                href="/wishlist"
                className="hidden sm:block p-2 text-text-secondary hover:text-accent relative group transition-colors duration-300"
                aria-label="Liste d'envies"
              >
                <Heart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </Link>
              */}
              {/* Panier */}
              <Link
                href="/cart"
                className="p-2 text-text-secondary hover:text-accent relative group transition-colors duration-300"
                aria-label="Panier"
              >
                <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-text-primary text-xs px-1.5 py-0.5 min-w-[18px] text-center font-display rounded-sm shadow-sm">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Link>
              
              <Link 
                href="/account" 
                className="hidden sm:block p-2 text-text-secondary hover:text-accent group transition-colors duration-300"
                aria-label="Mon compte"
              >
                <User className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </Link>
              
              <button 
                className="lg:hidden p-2 text-text-secondary hover:text-accent group transition-colors duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                {isMenuOpen ? 
                  <X className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform duration-300" /> : 
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform duration-300" />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-accent/10">
            <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-2 sm:space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block px-3 py-2.5 sm:py-3 text-sm sm:text-base font-sans text-text-secondary hover:text-accent uppercase tracking-wider transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Séparateur */}
              <div className="border-t border-accent/10 my-3 sm:my-4" />
              
              {/* Liens supplémentaires mobile uniquement */}
              <div className="sm:hidden space-y-2">
                <Link
                  href="/wishlist"
                  className="flex items-center px-3 py-2.5 text-sm font-sans text-text-secondary hover:text-accent uppercase tracking-wider transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="h-4 w-4 mr-3" />
                  Liste d'envies
                </Link>
                
                <Link
                  href="/account"
                  className="flex items-center px-3 py-2.5 text-sm font-sans text-text-secondary hover:text-accent uppercase tracking-wider transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4 mr-3" />
                  Mon compte
                </Link>
              </div>
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
