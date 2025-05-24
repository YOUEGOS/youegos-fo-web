import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { User, Package, Clock, MapPin, LogOut, ChevronRight } from 'lucide-react';
import Layout from '@/components/Layout';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const userData = {
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    memberSince: "Janvier 2024",
    orders: 3,
    wishlistItems: 5,
    address: {
      street: "123 Rue de la Mode",
      city: "Paris",
      postalCode: "75001",
      country: "France"
    },
    defaultPayment: {
      type: "Visa",
      last4: "4242"
    }
  };

  const menuItems = [
    {
      id: 'overview',
      icon: <User className="h-5 w-5" />,
      title: "Vue d'ensemble",
      description: "Résumé de votre compte"
    },
    {
      id: 'orders',
      icon: <Package className="h-5 w-5" />,
      title: "Mes commandes",
      description: "Suivez, retournez ou achetez à nouveau"
    },
    {
      id: 'addresses',
      icon: <MapPin className="h-5 w-5" />,
      title: "Adresses",
      description: "Gérez vos adresses de livraison"
    },
    {
      id: 'history',
      icon: <Clock className="h-5 w-5" />,
      title: "Historique des commandes",
      description: "Consultez vos achats précédents"
    }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Informations du compte</h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Nom complet</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.name}</dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Adresse email</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.email}</dd>
                  </div>
                  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Membre depuis</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{userData.memberSince}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Dernière commande</h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <p className="text-sm text-gray-500">Vous n'avez pas encore passé de commande.</p>
                  <div className="mt-6">
                    <Link href="/shop" className="text-sm font-medium text-sky-600 hover:text-sky-500">
                      Faire du shopping <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Adresse par défaut</h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <address className="not-italic text-sm text-gray-700">
                    {userData.address.street}<br />
                    {userData.address.postalCode} {userData.address.city}<br />
                    {userData.address.country}
                  </address>
                  <div className="mt-4">
                    <Link href="/account/addresses" className="text-sm font-medium text-sky-600 hover:text-sky-500">
                      Gérer les adresses <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      // Ajouter les autres cas (orders, wishlist, etc.) ici
      default:
        return (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {menuItems.find(item => item.id === activeTab)?.title}
            </h3>
            <p className="text-gray-600">Cette section sera bientôt disponible.</p>
          </div>
        );
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <Head>
          <title>Mon compte - YOUegos</title>
          <meta name="description" content="Gérez votre compte YOUegos" />
        </Head>

        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-3 mb-8 lg:mb-0">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Bonjour, {userData.name.split(' ')[0]}</h2>
                  <p className="mt-1 text-sm text-gray-500">Membre depuis {userData.memberSince}</p>
                </div>
                
                <nav className="divide-y divide-gray-200">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left px-6 py-4 flex items-center justify-between text-sm font-medium ${
                        activeTab === item.id 
                          ? 'bg-sky-50 text-sky-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-3 text-gray-400 group-hover:text-gray-500">
                          {item.icon}
                        </span>
                        <span>{item.title}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </button>
                  ))}
                </nav>
                
                <div className="px-6 py-4 border-t border-gray-200">
                  <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 bg-white hover:bg-red-50 rounded-md border border-red-200">
                    <LogOut className="h-4 w-4 mr-2" />
                    Se déconnecter
                  </button>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <main className="lg:col-span-9">
              {renderTabContent()}
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountPage;
