import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['GERENTE', 'GARCOM', 'COZINHA'], // Restringe as opções apenas a estes 3 perfis
    required: true 
  }
}, { timestamps: true }); // Adiciona automaticamente a data de criação e atualização

// Verifica se o modelo já existe para evitar erros de sobrescrita, senão, cria-o.
export default mongoose.models.User || mongoose.model('User', UserSchema);
