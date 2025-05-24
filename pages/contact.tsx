import React, { useState } from 'react';
import Head from 'next/head';
import { CheckCircle } from 'lucide-react';
import Layout from '@/components/Layout';

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

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      subject: e.target.value
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
      
      <div className="bg-white py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">
              Contactez-nous
            </h1>
            <p className="mt-2 text-gray-600">
              Notre équipe est à votre disposition pour répondre à vos questions.
            </p>
          </div>
          
          <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10">
            {isSubmitted ? (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Message envoyé</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>Merci pour votre message. Nous vous répondrons dans les plus brefs délais.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nom complet
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="py-3 px-4 block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="py-3 px-4 block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                      Sujet
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleSubjectChange}
                        required
                        className="py-3 px-4 block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="py-3 px-4 block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  >
                    Envoyer le message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
