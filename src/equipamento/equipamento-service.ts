import { Equipamento, ITankModel } from "./equipamento-model";

export class EquipamentoService {
  public static async obterEquipamento() {
    return Equipamento.findOne();
  }
}
