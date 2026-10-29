import nextEnv from '@next/env';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('Defina MONGODB_URI no arquivo .env.local antes de popular o banco.');
}

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  role: { type: String, enum: ['GERENTE', 'GARCOM', 'COZINHA'], required: true }
});
const menuItemSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String,
  categoria: { type: String, required: true },
  preco: { type: Number, required: true },
  disponivel: { type: Boolean, default: true }
});
const User = mongoose.models.User || mongoose.model('User', userSchema);
const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);

const usuariosDemo = [
  { nome: 'Garçom Demonstração', email: 'garcom@pequenobistro.com.br', role: 'GARCOM' },
  { nome: 'Cozinha Demonstração', email: 'cozinha@pequenobistro.com.br', role: 'COZINHA' },
  { nome: 'Gerente Demonstração', email: 'gerente@pequenobistro.com.br', role: 'GERENTE' }
];
const itensDemo = [
  { nome: 'Risoto de cogumelos', categoria: 'Pratos', descricao: 'Arroz arbóreo, cogumelos e parmesão.', preco: 42.9 },
  { nome: 'Bruschetta da casa', categoria: 'Entradas', descricao: 'Tomate fresco, manjericão e pão tostado.', preco: 24.5 },
  { nome: 'Suco natural', categoria: 'Bebidas', descricao: 'Suco feito na hora.', preco: 12 },
  { nome: 'Torta de chocolate', categoria: 'Sobremesas', descricao: 'Fatia de torta artesanal.', preco: 18.9 }
];

try {
  await mongoose.connect(uri, { bufferCommands: false });
  const senha = await bcrypt.hash('admin123', 12);

  for (const usuario of usuariosDemo) {
    await User.findOneAndUpdate(
      { email: usuario.email },
      { $set: { ...usuario, senha } },
      { upsert: true, runValidators: true }
    );
  }

  for (const item of itensDemo) {
    await MenuItem.findOneAndUpdate(
      { nome: item.nome, categoria: item.categoria },
      { $setOnInsert: { ...item, disponivel: true } },
      { upsert: true, runValidators: true }
    );
  }

  console.info('Banco preparado com 3 usuários e itens de demonstração.');
  console.info('Senha local de demonstração: admin123');
} finally {
  await mongoose.disconnect();
}
