// Arquivo: src/app/layout.js
import { Epilogue, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.scss'; // Vamos criar este arquivo no próximo passo

// Configuração das fontes conforme o DESIGN.md
const epilogue = Epilogue({ subsets: ['latin'], variable: '--font-epilogue' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta' });

export const metadata = {
  title: 'Bistrô Dionísio',
  description: 'Sistema integrado de pedidos de restaurante',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${epilogue.variable} ${jakarta.variable}`}>
        {children}
      </body>
    </html>
  );
}