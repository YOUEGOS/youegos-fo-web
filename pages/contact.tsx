import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { CheckCircle, Mail, Clock, MapPin, Phone } from 'lucide-react';
import Layout from '@/components/Layout';
import { FormField } from '@/components/form/FormField';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <Layout>
      <Head>
        <title>Contact - YOUEGOS</title>
        <meta name="description" content="Contactez l'équipe YOUEGOS pour toute question ou demande d'information." />
      </Head>
      
      <div className="bg-background-dark min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] min-h-[400px] bg-background-dark overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://youegos.com/cdn/shop/files/2024_07_13_SHOOTING_CHEMISES_STEPHANIE_MOUBE_082_8b4b4d18-2070-478e-983f-8102aa6fd064.jpg?v=1729626060&width=1500"
              alt="Service client YOUEGOS"
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
                <span className="font-display text-accent-light tracking-wider text-sm uppercase">Contact</span>
                <div className="h-px w-8 bg-accent-light/50"></div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display mb-8 text-text-primary leading-tight">
                À Votre <span className="text-accent-light">Service</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-text-secondary font-sans">
                Notre équipe est à votre écoute pour toute question ou demande d'information.
                Nous nous engageons à vous répondre dans les plus brefs délais.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32">
          <div className="relative text-center max-w-4xl mx-auto mb-16">
            {/* Cercle décoratif flou */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl opacity-50" />
          </div>
          
          {/* Grid layout pour le formulaire et les informations de contact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* FAQ et Informations */}
            <div className="relative">
              <div className="bg-background-light/50 backdrop-blur-sm border border-accent-light/20 rounded-sm p-8 h-full">
                <h2 className="text-2xl sm:text-3xl font-display text-text-primary mb-8">
                  Questions <span className="text-accent-light">Fréquentes</span>
                </h2>

                <div className="space-y-8">
                  <div className="space-y-2">
                    <h3 className="font-display text-text-primary text-lg">Délai de réponse ?</h3>
                    <p className="text-text-secondary font-sans leading-relaxed">
                      Notre équipe s'engage à vous répondre dans un délai de 24 à 48 heures ouvrées.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-text-primary text-lg">Suivi de commande ?</h3>
                    <p className="text-text-secondary font-sans leading-relaxed">
                      Pour toute question concernant votre commande, merci d'indiquer votre numéro de commande dans le message.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-text-primary text-lg">Service après-vente ?</h3>
                    <p className="text-text-secondary font-sans leading-relaxed">
                      Notre service client est disponible pour vous accompagner dans toutes vos démarches après-vente.
                    </p>
                  </div>

                  <div className="mt-12 p-6 bg-accent-light/5 rounded-sm border border-accent-light/20">
                    <p className="text-text-secondary font-sans text-sm leading-relaxed">
                      Pour une réponse plus rapide, pensez à inclure dans votre message :
                      <br /><br />
                      • Votre numéro de commande (si applicable)<br />
                      • Une description détaillée de votre demande
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="relative">
              <div className="bg-background-light/50 backdrop-blur-sm border border-accent-light/20 rounded-sm p-8">
                {isSubmitted ? (
                  <div className="rounded-sm bg-accent-light/10 p-6 backdrop-blur-sm">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-accent-light" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-display text-text-primary text-lg">Message envoyé</h3>
                        <p className="mt-2 text-text-secondary font-sans">
                          Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <FormField
                      label="Nom complet"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Votre nom"
                    />

                    <FormField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="votre@email.com"
                    />

                    <FormField
                      label="Sujet"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Le sujet de votre message"
                    />

                    <FormField
                      label="Message"
                      name="message"
                      type="textarea"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Votre message..."
                      rows={4}
                    />

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="
                          inline-flex items-center px-8 py-4
                          bg-accent-light/10 hover:bg-accent-light/20
                          text-accent-light border border-accent-light/20
                          rounded-sm transition-all duration-300
                          font-display tracking-wider
                          transform hover:translate-x-1
                        "
                      >
                        Envoyer le message
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
