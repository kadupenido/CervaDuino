import { Router } from "express";
import { EquipamentoController } from "./equipamento-controller";

const router: Router = Router();

router.get("/", EquipamentoController.obterEquipamento);
router.post("/", EquipamentoController.salvarEquipamento);

export default router;
