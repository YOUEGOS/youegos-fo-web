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

      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] min-h-[500px] bg-gray-900">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Atelier YOUEGOS"
              fill
              className="object-cover opacity-70"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          </div>
          
          <div className="relative h-full flex flex-col justify-center px-6 text-center text-white">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display tracking-tight">
                Notre Histoire
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Depuis nos débuts, nous créons des pièces uniques qui allient élégance intemporelle et confort inégalé.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          {/* Philosophy Section */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-display">
              La Philosophie YOUEGOS
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-8"></div>
            <p className="text-gray-700 leading-relaxed text-lg mb-8">
              Chez YOUEGOS, nous croyons en la puissance du vêtement comme expression de personnalité. 
              Notre engagement : créer des pièces qui allient qualité exceptionnelle, confort inégalé et style intemporel.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Chaque création est le fruit d'un savoir-faire artisanal et d'une attention minutieuse aux détails, 
              pour vous offrir des vêtements qui durent et s'améliorent avec le temps.
            </p>
          </div>

          {/* Mission Section */}
          <section className="w-full bg-white py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 md:p-8 overflow-hidden relative">
                {/* Décoration de fond */}
                <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-amber-50 opacity-50"></div>
                <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-sky-50 opacity-50"></div>
                
                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                  {/* Contenu */}
                  <div className="w-full lg:w-1/2 order-2 lg:order-1">
                    <span className="inline-block text-sm font-semibold text-sky-600 mb-3">Notre mission</span>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">L'élégance responsable</h2>
                    <p className="text-gray-600 mb-6">
                      Chez YOUEGOS, nous croyons en une mode plus consciente et responsable. Notre mission est de créer des vêtements qui allient élégance intemporelle et respect de l'environnement, sans jamais faire de compromis sur le style ou la qualité.
                    </p>
                    <div className="space-y-4">
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
                        <div key={index} className="flex items-start">
                          <div className="flex-shrink-0 mt-1">
                            <div className="flex items-center justify-center h-5 w-5 rounded-full bg-sky-100 text-sky-600">
                              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 12 12">
                                <path d="M3.707 9.293a1 1 0 01-1.414 0l-1.5-1.5a1 1 0 011.414-1.414L3 7.086l5.293-5.293a1 1 0 011.414 1.414l-6 6z"/>
                              </svg>
                            </div>
                          </div>
                          <div className="ml-3">
                            <h3 className="text-base font-medium text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8">
                      <Link href="/boutique" className="inline-flex items-center text-sky-600 font-medium hover:text-sky-500">
                        Découvrir nos collections
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  
                  {/* Image */}
                  <div className="w-full lg:w-1/2 h-96 relative rounded-xl overflow-hidden shadow-xl transform lg:rotate-1 transition-transform duration-500 hover:rotate-0 order-1 lg:order-2">
                    <Image
                      src="https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                      alt="Atelier de confection YOUEGOS montrant des vêtements de qualité"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={false}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="w-full py-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="inline-block text-sm font-semibold text-sky-600">Ce qui nous guide</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Qualité Supérieure',
                    description: 'Sélection rigoureuse des matières premières et contrôle qualité exigeant pour une durabilité à toute épreuve.',
                    icon: (
                      <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    )
                  },
                  {
                    title: 'Authenticité',
                    description: 'Des créations intemporelles qui expriment votre personnalité, loin des effets de mode éphémères.',
                    icon: (
                      <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.486M7 17h.01"></path>
                      </svg>
                    )
                  },
                  {
                    title: 'Engagement Durable',
                    description: 'Respect des artisans et de l\'environnement à chaque étape de notre processus de fabrication.',
                    icon: (
                      <svg className="w-8 h-8 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    )
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group transform hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-sky-50 group-hover:bg-sky-100 transition-colors duration-300 mb-6">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Team CTA */}
          <div className="bg-primary text-white rounded-xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 font-display">
              Rejoignez l'aventure YOUEGOS
            </h3>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Découvrez notre collection et trouvez les pièces qui vous ressemblent vraiment.
            </p>
            <Link href="/shop">
              <Button variant="secondary" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                Voir la boutique
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
