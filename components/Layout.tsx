import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'YOUegos - Votre boutique de mode en ligne',
  description = 'Découvrez notre collection de vêtements tendance et de qualité pour homme et femme.'
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background-DEFAULT dark:bg-background-DEFAULT-dark text-text-primary-DEFAULT dark:text-text-primary-dark transition-colors duration-300">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      <ThemeToggle />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
