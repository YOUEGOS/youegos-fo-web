import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter l'inscription à la newsletter
    console.log('Email soumis:', email);
    setEmail('');
  };

  return (
    <section className="w-full py-24 bg-background-light/50 backdrop-blur-sm border-t border-accent-light/10">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-4 mb-8">
          <div className="h-px w-12 bg-accent/50"></div>
          <span className="font-display text-accent tracking-wider text-sm uppercase">
            Newsletter
          </span>
          <div className="h-px w-12 bg-accent/50"></div>
        </div>

        <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-6">
          Restez informé
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto mb-12 font-sans">
          Recevez en avant-première nos nouveautés, offres exclusives et conseils de style.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            className="
              flex-1 px-6 py-4 rounded-sm
              bg-background-light/50 backdrop-blur-sm
              border border-accent-light/20
              text-text-primary placeholder:text-text-secondary/50
              focus:outline-none focus:border-accent-light/40
              transition-all duration-300
              font-sans
            "
            required
          />
          <button 
            type="submit"
            className="
              px-8 py-4 rounded-sm
              bg-accent hover:bg-accent-light
              text-text-primary font-display
              transition-all duration-300
              border border-accent hover:border-accent-light
              shadow-sm shadow-accent/10 hover:shadow-md hover:shadow-accent/20
            "
          >
            S'abonner
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
