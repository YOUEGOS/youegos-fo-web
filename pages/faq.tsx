import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('commandes');
  
  const categories = [
    { id: 'commandes', name: 'Commandes & Livraison' },
    { id: 'retours', name: 'Retours & Remboursements' },
    { id: 'compte', name: 'Compte & Paiement' },
  ];

  const faqs = [
    {
      category: 'commandes',
      question: "Quels sont les délais de livraison ?",
      answer: "Les commandes sont généralement expédiées sous 24-48h. La livraison prend ensuite 1 à 3 jours ouvrés en France métropolitaine."
    },
    {
      category: 'retours',
      question: "Quelles sont les modalités de retour ?",
      answer: "Vous pouvez retourner les articles sous 14 jours suivant la réception. Les articles doivent être en parfait état, avec leurs étiquettes."
    },
    {
      category: 'commandes',
      question: "Comment suivre ma commande ?",
      answer: "Un numéro de suivi vous sera envoyé par email dès l'expédition de votre commande."
    },
    {
      category: 'compte',
      question: "Quels sont les moyens de paiement acceptés ?",
      answer: "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), PayPal et Apple Pay."
    },
    {
      category: 'commandes',
      question: "Proposez-vous la livraison à l'international ?",
      answer: "Oui, nous livrons dans le monde entier. Les frais et délais de livraison varient selon la destination."
    }
  ];

  return (
    <Layout>
      <Head>
        <title>FAQ - YOUegos</title>
        <meta name="description" content="Questions fréquentes - YOUegos" />
      </Head>
      
      <div className="bg-background-dark min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full h-[40vh] min-h-[300px] bg-background-dark overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2300&q=80"
              alt="FAQ YOUEGOS"
              fill
              className="object-cover opacity-40 transition-transform duration-500 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/90 to-background-dark/20" />
            {/* Cercles décoratifs flous */}
            <div className="absolute -left-40 top-20 w-96 h-96 rounded-full bg-accent-light/10 blur-3xl" />
            <div className="absolute -right-40 bottom-20 w-96 h-96 rounded-full bg-accent-light/10 blur-3xl" />
          </div>
          
          <div className="relative h-full flex flex-col justify-center px-4 sm:px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-4 mb-8">
                <div className="h-px w-8 bg-accent-light/50"></div>
                <span className="font-display text-accent-light tracking-wider text-sm uppercase">FAQ</span>
                <div className="h-px w-8 bg-accent-light/50"></div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display mb-8 text-text-primary leading-tight">
                Questions <span className="text-accent-light">Fréquentes</span>
              </h1>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32">
          {/* Navigation des catégories */}
          <nav className="mb-16">
            <ul className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <li key={category.id}>
                  <button
                    onClick={() => setActiveCategory(category.id)}
                    className={`
                      px-6 py-3 rounded-sm transition-all duration-300
                      font-display text-sm tracking-wider
                      ${activeCategory === category.id
                        ? 'bg-accent-light/10 text-accent-light border border-accent-light/20'
                        : 'text-text-secondary hover:text-accent-light'}
                    `}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Liste des FAQs */}
          <div className="space-y-6 max-w-4xl mx-auto">
            {faqs
              .filter(faq => faq.category === activeCategory)
              .map((faq, index) => (
                <div 
                  key={index} 
                  className="
                    bg-background-light/50 backdrop-blur-sm 
                    border border-accent-light/10 rounded-sm p-6
                    transition-all duration-300 hover:border-accent-light/20
                  "
                >
                  <h3 className="font-display text-lg text-text-primary mb-4">{faq.question}</h3>
                  <p className="text-text-secondary font-sans leading-relaxed">{faq.answer}</p>
                </div>
              ))
            }
          </div>

          {/* Section Contact */}
          <div className="mt-24 max-w-2xl mx-auto text-center">
            <div className="bg-background-light/50 backdrop-blur-sm border border-accent-light/20 rounded-sm p-8">
              <h2 className="font-display text-2xl text-text-primary mb-4">
                Vous ne trouvez pas votre <span className="text-accent-light">réponse</span> ?
              </h2>
              <p className="text-text-secondary font-sans mb-8">Notre équipe est là pour vous aider.</p>
              <Link
                href="/contact"
                className="
                  inline-flex items-center gap-2 px-8 py-4
                  bg-accent-light/10 hover:bg-accent-light/20
                  text-accent-light border border-accent-light/20
                  rounded-sm transition-all duration-300
                  font-display tracking-wider
                  transform hover:translate-x-1
                "
              >
                Contactez-nous
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
      </div>
      </div>
    </Layout>
  );
};

export default FAQPage;
