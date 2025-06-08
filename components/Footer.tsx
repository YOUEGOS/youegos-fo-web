import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Mail, HelpCircle, Shield } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-background pt-24 pb-12 relative overflow-hidden">
      {/* Décorations de fond */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent opacity-30" />
      <div className="absolute -left-40 top-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute -right-40 bottom-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          {/* Logo et Description */}
          <div className="space-y-6">
            <div className="flex items-center">
              <span className="text-3xl font-display text-text-primary">Youegos</span>
            </div>
            <p className="text-base text-text-secondary font-sans leading-relaxed">
              L'excellence artisanale française au service de votre style. Une mode éthique et raffinée, conçue avec passion.
            </p>
            <div className="flex space-x-6 pt-2">
              <a 
                href="#" 
                className="text-text-secondary hover:text-accent transition-colors duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a 
                href="#" 
                className="text-text-secondary hover:text-accent transition-colors duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a 
                href="#" 
                className="text-text-secondary hover:text-accent transition-colors duration-300 group"
                aria-label="TikTok"
              >
                <div className="relative w-5 h-5 group-hover:scale-110 transition-transform duration-300">
                  <Image 
                    src="/images/tiktok.svg" 
                    alt="TikTok" 
                    fill 
                    className="object-contain brightness-0 invert opacity-80 group-hover:opacity-100"
                  />
                </div>
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-sm font-display text-accent uppercase tracking-wider mb-6">Boutique</h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/boutique/nouveautes" 
                  className="text-base text-text-secondary hover:text-accent transition-colors duration-300"
                >
                  Nouveautés
                </Link>
              </li>
              <li>
                <Link 
                  href="/boutique/meilleures-ventes" 
                  className="text-base text-text-secondary hover:text-accent transition-colors duration-300"
                >
                  Meilleures ventes
                </Link>
              </li>
              <li>
                <Link 
                  href="/boutique/collection" 
                  className="text-base text-text-secondary hover:text-accent transition-colors duration-300"
                >
                  Collection
                </Link>
              </li>
              <li>
                <Link 
                  href="/boutique/soldes" 
                  className="text-base text-text-secondary hover:text-accent transition-colors duration-300"
                >
                  Offres exclusives
                </Link>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div>
            <h3 className="text-sm font-display text-accent uppercase tracking-wider mb-6">Informations</h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/a-propos" 
                  className="text-base text-text-secondary hover:text-accent transition-colors duration-300"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link 
                  href="/notre-histoire" 
                  className="text-base text-text-secondary hover:text-accent transition-colors duration-300"
                >
                  Notre histoire
                </Link>
              </li>
              <li>
                <Link 
                  href="/engagement" 
                  className="text-base text-text-secondary hover:text-accent transition-colors duration-300"
                >
                  Nos engagements
                </Link>
              </li>
            </ul>
          </div>

          {/* Aide & Contact */}
          <div>
            <h3 className="text-sm font-display text-accent uppercase tracking-wider mb-6">Aide & Contact</h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/faq" 
                  className="text-base text-text-secondary hover:text-accent transition-colors duration-300 flex items-center group"
                >
                  <HelpCircle className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <span>FAQ</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-base text-text-secondary hover:text-accent transition-colors duration-300 flex items-center group"
                >
                  <Mail className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links & Payment */}
        <div className="border-t border-accent/10 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-wrap justify-center gap-8 mb-4 md:mb-0">
              <Link 
                href="/mentions-legales" 
                className="text-sm text-text-secondary hover:text-accent transition-colors duration-300"
              >
                Mentions légales
              </Link>
              <Link 
                href="/politique-de-confidentialite" 
                className="text-sm text-text-secondary hover:text-accent transition-colors duration-300"
              >
                Politique de confidentialité
              </Link>
              <Link 
                href="/parametres-cookies" 
                className="text-sm text-text-secondary hover:text-accent transition-colors duration-300"
              >
                Paramètres des cookies
              </Link>
            </div>
            
            {/* Payment Methods */}
            <div className="flex items-center space-x-8">
              <div className="h-7 w-px bg-accent/10"></div>
              <div className="relative group">
                <Shield className="h-6 w-6 text-text-secondary group-hover:text-accent transition-colors duration-300" />
                <span className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-background-light border border-accent/10 text-text-primary text-sm font-sans rounded-sm whitespace-nowrap backdrop-blur-sm">
                  Paiement sécurisé
                </span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 text-center">
            <p className="text-sm text-text-secondary font-sans">
              © {new Date().getFullYear()} Youegos. Tous droits réservés.
            </p>
            <p className="mt-2 text-sm text-text-secondary font-sans">
              Conçu et fabriqué avec passion en France
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
