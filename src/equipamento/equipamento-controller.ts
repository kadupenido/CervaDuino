import { NextFunction, Request, Response } from "express";
import { EquipamentoService } from "./equipamento-service";
import { IEquipamentoModel, Equipamento } from "./equipamento-model";

export class EquipamentoController {

  /**
   * Busca o equipamento cadastrado
   * @param req request
   * @param res respose
   * @param next next
   */
  public static async obterEquipamento(req: Request, res: Response, next: NextFunction) {
    try {
      const equip = await EquipamentoService.obterEquipamento();
      res.status(200).send(equip);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  /**
   * Salva o equipamento
   * @param req request
   * @param res response
   * @param next next
   */
  public static async salvarEquipamento(req: Request, res: Response, next: NextFunction) {
    try {

      let equip = await EquipamentoService.obterEquipamento();

      if (equip) {
        equip.set(req.body);
      } else {
        equip = <IEquipamentoModel>req.body;
      }

      equip = await equip.save();
      res.status(200).send(equip);

    } catch (e) {
      res.status(500).send(e.message);
    }
  }

}
