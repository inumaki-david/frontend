import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String }, // Ex: "Pão brioche, blend 180g..."
  imagem: { type: String }, // URL ou caminho da imagem
  categoria: { type: String, required: true },
  preco: { type: Number, required: true },
  custoEstimado: { type: Number, default: 0 }, // Para o cálculo de margem do Gerente
  disponivel: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);
