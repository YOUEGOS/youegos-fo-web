import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Layout from '@/components/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>À propos - YOUEGOS</title>
        <meta name="description" content="Découvrez l'histoire et les valeurs de YOUEGOS, bien plus qu'une marque de vêtements, un état d'esprit." />
      </Head>

      <div className="bg-background">
        {/* Hero Section */}
        <section className="relative w-full h-[70vh] min-h-[600px] bg-background overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://youegos.com/cdn/shop/files/2024_07_13_SHOOTING_CHEMISES_STEPHANIE_MOUBE_084_840169c5-7bfd-4b51-9522-dc87e37881ae.jpg?v=1729626376&width=1500"
              alt="Atelier YOUEGOS"
              fill
              className="object-cover opacity-40 transition-transform duration-500 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/30" />
            {/* Cercles décoratifs flous */}
            <div className="absolute -left-40 top-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
            <div className="absolute -right-40 bottom-20 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
          </div>
          
          <div className="relative h-full flex flex-col justify-center px-4 sm:px-6 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-4 mb-8">
                <div className="h-px w-8 bg-accent/50"></div>
                <span className="font-display text-accent tracking-wider text-sm uppercase">Notre Histoire</span>
                <div className="h-px w-8 bg-accent/50"></div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display mb-8 text-text-primary leading-tight">
                L'Art du <span className="text-accent">Vêtement</span><br />
                Premium
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-text-secondary font-sans mb-12">
                Depuis nos débuts, nous créons des pièces uniques qui allient élégance intemporelle et confort inégalé, en respectant notre engagement pour une mode responsable et durable.
              </p>
              
              <Link 
                href="/shop" 
                className="inline-flex items-center px-8 py-4 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 rounded-sm transition-colors duration-300 group"
              >
                <span className="font-display tracking-wider">Découvrir nos collections</span>
                <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32">
          {/* Philosophy Section */}
          <div className="relative text-center max-w-4xl mx-auto mb-24">
            {/* Cercles décoratifs flous */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl opacity-50" />
            
            <div className="relative">
              <div className="inline-flex items-center gap-4 mb-8">
                <div className="h-px w-8 bg-accent/50"></div>
                <span className="font-display text-accent tracking-wider text-sm uppercase">Notre Philosophie</span>
                <div className="h-px w-8 bg-accent/50"></div>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-text-primary mb-12 leading-tight">
                L'Excellence dans<br />
                <span className="text-accent">Chaque Détail</span>
              </h2>

              <div className="space-y-8 text-text-secondary">
                <p className="text-base sm:text-lg leading-relaxed font-sans">
                  Chez YOUEGOS, nous croyons en la puissance du vêtement comme expression de personnalité. 
                  Notre engagement : créer des pièces qui allient <span className="text-accent">qualité exceptionnelle</span>, 
                  confort inégalé et style intemporel.
                </p>

                <p className="text-base sm:text-lg leading-relaxed font-sans">
                  Chaque création est le fruit d'un <span className="text-accent">savoir-faire artisanal</span> et 
                  d'une attention minutieuse aux détails, pour vous offrir des vêtements qui durent et 
                  s'améliorent avec le temps.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <section className="w-full py-24 md:py-32 relative overflow-hidden">
            {/* Cercles décoratifs flous */}
            <div className="absolute -right-40 top-20 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl opacity-60" />
            <div className="absolute -left-40 bottom-20 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl opacity-60" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="bg-background/50 backdrop-blur-sm border border-accent/10 rounded-sm p-6 sm:p-8 md:p-12 overflow-hidden">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                  {/* Contenu */}
                  <div className="w-full lg:w-1/2 order-2 lg:order-1">
                    <div className="inline-flex items-center gap-4 mb-8">
                      <div className="h-px w-8 bg-accent/50"></div>
                      <span className="font-display text-accent tracking-wider text-sm uppercase">Notre Mission</span>
                      <div className="h-px w-8 bg-accent/50"></div>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-display text-text-primary mb-8 leading-tight">
                      L'Élégance<br />
                      <span className="text-accent">Responsable</span>
                    </h2>

                    <p className="text-text-secondary font-sans text-base sm:text-lg leading-relaxed mb-12">
                      Chez YOUEGOS, nous croyons en une mode plus consciente et responsable. Notre mission est de créer des vêtements qui allient élégance intemporelle et respect de l'environnement, sans jamais faire de compromis sur le style ou la qualité.
                    </p>

                    <div className="space-y-6">
                      {[
                        {
                          title: 'Éthique',
                          description: 'Des conditions de travail équitables et un respect total des droits humains.'
                        },
                        {
                          title: 'Durabilité',
                          description: 'Des matériaux durables et des processus de production à faible impact environnemental.'
                        },
                        {
                          title: 'Transparence',
                          description: 'Une traçabilité complète de nos produits, de la matière première au produit fini.'
                        }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start group">
                          <div className="flex-shrink-0 mt-1">
                            <div className="flex items-center justify-center h-6 w-6 rounded-sm bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors duration-300">
                              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 12 12">
                                <path d="M3.707 9.293a1 1 0 01-1.414 0l-1.5-1.5a1 1 0 011.414-1.414L3 7.086l5.293-5.293a1 1 0 011.414 1.414l-6 6z"/>
                              </svg>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="font-display text-text-primary group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                            <p className="text-text-secondary text-sm sm:text-base mt-1">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-12">
                      <Link 
                        href="/shop" 
                        className="inline-flex items-center px-8 py-4 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 rounded-sm transition-all duration-300 group transform hover:translate-x-1"
                      >
                        <span className="font-display tracking-wider">Découvrir nos collections</span>
                        <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                  
                  {/* Image */}
                  <div className="w-full lg:w-1/2 aspect-[4/5] relative rounded-sm overflow-hidden group order-1 lg:order-2">
                    <div className="absolute inset-0 bg-accent/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <Image
                      src="https://youegos.com/cdn/shop/files/youegos-hero-section-bottom-3_1.webp?v=1748245949&width=1500"
                      alt="Atelier de confection YOUEGOS montrant des vêtements de qualité"
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="w-full py-24 md:py-32 relative overflow-hidden">
            {/* Cercles décoratifs flous */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/5 blur-3xl opacity-40" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-4 mb-8">
                  <div className="h-px w-8 bg-accent/50"></div>
                  <span className="font-display text-accent tracking-wider text-sm uppercase">Ce qui nous guide</span>
                  <div className="h-px w-8 bg-accent/50"></div>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-text-primary mb-8 leading-tight">
                  Nos Valeurs<br />
                  <span className="text-accent">Fondamentales</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
                {[
                  {
                    title: 'Qualité Supérieure',
                    description: 'Sélection rigoureuse des matières premières et contrôle qualité exigeant pour une durabilité à toute épreuve.',
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    )
                  },
                  {
                    title: 'Authenticité',
                    description: 'Des créations intemporelles qui expriment votre personnalité, loin des effets de mode éphémères.',
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.486M7 17h.01"></path>
                      </svg>
                    )
                  },
                  {
                    title: 'Engagement Durable',
                    description: 'Respect des artisans et de l\'environnement à chaque étape de notre processus de fabrication.',
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    )
                  }
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    {item.icon}
                    <h3 className="font-display text-text-primary text-lg sm:text-xl mb-4">{item.title}</h3>
                    <p className="text-text-secondary font-sans text-base sm:text-lg">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </Layout>
  );
};

export default About;
