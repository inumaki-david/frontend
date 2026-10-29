import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  numeroMesa: { type: Number, required: true },
  itens: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    nome: { type: String },
    preco: { type: Number, min: 0 },
    quantidade: { type: Number, required: true, default: 1 },
    modificadores: { type: String, default: '' } // Ex: "1 SEM CEBOLA"
  }],
  status: { 
    type: String, 
    enum: ['RECEBIDO', 'EM_PREPARO', 'ENTREGUE'], 
    default: 'RECEBIDO' 
  },
  garcom: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  total: { type: Number, required: true, default: 0, min: 0 },
  contaFechada: { type: Boolean, default: false },
  contaFechadaEm: { type: Date }
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
