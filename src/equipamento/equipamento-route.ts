import { Router } from "express";
import { EquipamentoController } from "./equipamento-controller";

const router: Router = Router();

router.get("/", EquipamentoController.obterEquipamento);

export default router;
