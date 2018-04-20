import mongoose, { Document, Schema, Model, model } from "mongoose";

export interface ITankModel extends Document {
  altura: number;
  diametro: number;
  capacidade: number;
  espacoPerdido: number;
  taxaEvaporacao?: number;
}

export interface IEquipamentoModel extends Document {
  hlt: ITankModel;
  mlt: ITankModel;
  bk: ITankModel;
}

export const TankSchema: Schema = new Schema({
  altura: {
    type: Number,
    required: true
  },
  diametro: {
    type: Number,
    required: true
  },
  espacoPerdido: {
    type: Number,
    required: true
  },
  taxaEvaporacao: {
    type: Number,
    required: false
  },
  capacidade: {
    type: Number
  }
});

export const EquipamentoSchema: Schema = new Schema({
  hlt: TankSchema,
  mlt: TankSchema,
  bk: TankSchema
});

EquipamentoSchema.pre("save", function(next) {
  const doc = <IEquipamentoModel>this;

  doc.hlt.capacidade = calcCapacidade(doc.hlt.diametro, doc.hlt.altura);
  doc.mlt.capacidade = calcCapacidade(doc.mlt.diametro, doc.mlt.altura);
  doc.bk.capacidade = calcCapacidade(doc.bk.diametro, doc.bk.altura);

  next();
});

function calcCapacidade(diametro: number, altura: number): number {
  const raio = diametro / 2;
  return Math.round(Math.PI * raio * raio * (altura / 1000) * 100) / 100;
}

export const Equipamento: Model<IEquipamentoModel> = model<IEquipamentoModel>(
  "Equipamento",
  EquipamentoSchema,
  "equipamento"
);
