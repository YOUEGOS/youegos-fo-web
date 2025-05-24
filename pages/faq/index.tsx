import React from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';

const FAQPage = () => {
  const faqs = [
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Les commandes sont généralement expédiées sous 24-48h. La livraison prend ensuite 1 à 3 jours ouvrés en France métropolitaine."
    },
    {
      question: "Quelles sont les modalités de retour ?",
      answer: "Vous pouvez retourner les articles sous 14 jours suivant la réception. Les articles doivent être en parfait état, avec leurs étiquettes."
    },
    {
      question: "Comment suivre ma commande ?",
      answer: "Un numéro de suivi vous sera envoyé par email dès l'expédition de votre commande."
    },
    {
      question: "Quels sont les moyens de paiement acceptés ?",
      answer: "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), PayPal et Apple Pay."
    },
    {
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
      
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Questions fréquentes</h1>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-sky-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Vous ne trouvez pas votre réponse ?</h2>
          <p className="text-gray-600 mb-4">Notre équipe est là pour vous aider.</p>
          <a 
            href="/contact" 
            className="inline-flex items-center text-sky-600 hover:text-sky-800 font-medium"
          >
            Contactez-nous
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default FAQPage;
