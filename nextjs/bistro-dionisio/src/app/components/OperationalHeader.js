'use client';

import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/garcom', label: 'Salão' },
  { href: '/cozinha', label: 'Cozinha' },
  { href: '/gerente', label: 'Cardápio' }
];

export default function OperationalHeader({ title, description, active }) {
  const [saindo, setSaindo] = useState(false);
  const [erroLogout, setErroLogout] = useState('');

  const sair = async () => {
    setSaindo(true);
    setErroLogout('');

    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Não foi possível encerrar a sessão. Tente novamente.');
      }

      window.location.replace('/');
    } catch (error) {
      setErroLogout(error.message || 'Falha ao encerrar a sessão.');
      setSaindo(false);
    }
  };

  return (
    <header className="app-header">
      <div className="header-top">
        <Link className="brand" href="/" aria-label="Bistrô Dionísio - início">
        <span className="brand-mark" aria-hidden="true">BD</span>
        <span>
          <strong>Bistrô Dionísio</strong>
          <small>Pedidos da casa</small>
        </span>
        </Link>

        <div className="header-actions">
          <nav className="main-nav" aria-label="Navegação principal">
            {links.map((link) => (
              <Link
                key={link.href}
                className={active === link.href ? 'nav-link active' : 'nav-link'}
                href={link.href}
                aria-current={active === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <button
            className="button button-quiet logout-button"
            onClick={sair}
            disabled={saindo}
          >
            {saindo ? 'Saindo...' : 'Sair'}
          </button>
        </div>
      </div>

      {erroLogout && <p className="feedback error" role="alert">{erroLogout}</p>}
      <div className="page-heading">
        <p className="eyebrow">{description}</p>
        <h1>{title}</h1>
      </div>
    </header>
  );
}
