'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RoleGuard({ role, children }) {
  const [autorizado, setAutorizado] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let ativo = true;
    const verificarSessao = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();
        if (!response.ok || data.usuario?.role !== role) {
          router.replace('/');
          return;
        }
        if (ativo) setAutorizado(true);
      } catch {
        router.replace('/');
      }
    };

    const inicializacao = setTimeout(verificarSessao, 0);
    return () => {
      ativo = false;
      clearTimeout(inicializacao);
    };
  }, [role, router]);

  if (!autorizado) {
    return <main className="app-shell"><p className="empty-state">Verificando acesso...</p></main>;
  }
  return children;
}
