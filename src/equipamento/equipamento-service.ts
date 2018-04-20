import { Equipamento, ITankModel } from "./equipamento-model";

export class EquipamentoService {
  public static async obterEquipamento() {
    const e = new Equipamento();

    e.hlt = <ITankModel>{
      altura: 36,
      diametro: 36,
      espacoPerdido: 36
    };

    e.mlt = <ITankModel>{
      altura: 36,
      diametro: 36,
      espacoPerdido: 36
    };

    e.bk = <ITankModel>{
      altura: 36,
      diametro: 36,
      espacoPerdido: 36,
      taxaEvaporacao: 9
    };

    const e1 = await e.save();
    console.log(e1);

    return Equipamento.find();
  }
}
