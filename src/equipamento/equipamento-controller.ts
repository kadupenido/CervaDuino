import { NextFunction, Request, Response } from "express";
import { EquipamentoService } from "./equipamento-service";

export class EquipamentoController {
  public static async obterEquipamento(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const equip = await EquipamentoService.obterEquipamento();
    res.status(200).send(equip[equip.length - 1]);
  }
}
