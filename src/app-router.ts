import { Router } from "express";

const router: Router = Router();

router.get("/", (req, res, next) => {
  res.status(200).send({
    app: 'CervaDuino',
    version: '1.0.0',
  });
});

export default router;
