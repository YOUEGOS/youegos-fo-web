import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Mail, HelpCircle, Shield } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo et Description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">Youegos</span>
            </div>
            <p className="text-sm text-gray-400">
              Vêtements éthiques et durables pour un style conscient. Fabriqué avec amour en France.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <div className="relative w-5 h-5">
                  <Image 
                    src="https://www.tiktok.com/favicon.ico" 
                    alt="TikTok" 
                    fill 
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Boutique</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/boutique/nouveautes" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Nouveautés
                </Link>
              </li>
              <li>
                <Link href="/boutique/meilleures-ventes" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Meilleures ventes
                </Link>
              </li>
              <li>
                <Link href="/boutique/soldes" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Soldes
                </Link>
              </li>
              <li>
                <Link href="/boutique/collection" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Informations</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/a-propos" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center">
                  <span>À propos</span>
                </Link>
              </li>
              <li>
                <Link href="/notre-histoire" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center">
                  <span>Notre histoire</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Aide & Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Aide & Contact</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faq" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  <span>FAQ</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
              <Link href="/mentions-legales" className="text-xs text-gray-400 hover:text-white transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-de-confidentialite" className="text-xs text-gray-400 hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/parametres-cookies" className="text-xs text-gray-400 hover:text-white transition-colors">
                Paramètres des cookies
              </Link>
            </div>
            
            {/* Payment Methods */}
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="flex space-x-4 items-center">
                <div className="relative w-8 h-6 flex items-center justify-center">
                  <Image 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
                    alt="Visa" 
                    fill 
                    className="object-contain"
                  />
                </div>
                <div className="relative w-8 h-6 flex items-center justify-center">
                  <Image 
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                    alt="Mastercard" 
                    fill 
                    className="object-contain"
                  />
                </div>
                <div className="relative w-8 h-6 flex items-center justify-center">
                  <Image 
                    src="https://www.americanexpress.com/content/dam/amex/fr/fr_corp/amex-pos/amex_pos_icon_rgb_blue_50px.png" 
                    alt="American Express" 
                    fill 
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <div className="relative w-8 h-6 flex items-center justify-center">
                  <Image 
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
                    alt="PayPal" 
                    fill 
                    className="object-contain"
                  />
                </div>
                <div className="relative w-8 h-6 flex items-center justify-center">
                  <Image 
                    src="https://www.apple.com/v/apple-pay/g/images/overview/apple_pay_logo__d1fr8d3e3l8i_large.png" 
                    alt="Apple Pay" 
                    fill 
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
              <div className="h-6 w-px bg-gray-700"></div>
              <div className="relative group">
                <Shield className="h-6 w-6 text-gray-400" />
                <span className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
                  Paiement sécurisé
                </span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Youegos. Tous droits réservés.</p>
            <p className="mt-1">Made with ❤️ in France</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
