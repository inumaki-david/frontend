'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const perfis = [
  { role: 'GARCOM', label: 'Garçom', email: 'garcom@pequenobistro.com.br', icon: '01' },
  { role: 'COZINHA', label: 'Cozinha', email: 'cozinha@pequenobistro.com.br', icon: '02' },
  { role: 'GERENTE', label: 'Gerente', email: 'gerente@pequenobistro.com.br', icon: '03' }
];

const rotas = { GARCOM: '/garcom', COZINHA: '/cozinha', GERENTE: '/gerente' };

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const router = useRouter();

  const preencherAtalho = (perfil) => {
    setEmail(perfil.email);
    setSenha('admin123');
    setErro('');
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setCarregando(true);
    setErro('');
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.erro || 'Não foi possível entrar.');
      if (!rotas[data.usuario?.role]) throw new Error('Perfil sem acesso ao sistema.');
      router.replace(rotas[data.usuario.role]);
    } catch (error) {
      setErro(error.message || 'Falha ao conectar com o servidor.');
      setCarregando(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <span className="brand-mark large" aria-hidden="true">BD</span>
          <p className="eyebrow">Pequeno Bistrô Sabor Local</p>
          <h1>Bistrô Dionísio</h1>
          <p className="login-description">
            Um só lugar para organizar os pedidos do salão e a rotina da cozinha.
          </p>
        </div>

        <div className="demo-access">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Acesso de demonstração</p>
              <h2>Escolha seu perfil</h2>
            </div>
          </div>
          <div className="demo-profiles">
            {perfis.map((perfil) => (
              <button
                type="button"
                key={perfil.role}
                className="demo-profile"
                onClick={() => preencherAtalho(perfil)}
              >
                <span className="profile-number">{perfil.icon}</span>
                <span>{perfil.label}</span>
              </button>
            ))}
          </div>
          <p className="muted small-text">Preenche o e-mail e a senha da conta de demonstração.</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          <label className="field-label" htmlFor="email">E-mail</label>
          <input
            id="email"
            className="text-input"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="nome@pequenobistro.com.br"
          />

          <label className="field-label" htmlFor="password">Senha</label>
          <div className="password-field">
            <input
              id="password"
              className="text-input"
              type={mostrarSenha ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              placeholder="Digite sua senha"
            />
            <button type="button" className="password-toggle" onClick={() => setMostrarSenha(!mostrarSenha)}>
              {mostrarSenha ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>

          {erro && <p className="feedback error" role="alert">{erro}</p>}

          <button className="button button-primary full-width login-submit" type="submit" disabled={carregando}>
            {carregando ? 'Validando acesso...' : 'Entrar no sistema'}
          </button>
        </form>

        <footer className="login-footer">
          <span>Autenticação com sessão segura</span>
          <span>Atendimento · Cozinha · Gestão</span>
        </footer>
      </section>
    </main>
  );
}
