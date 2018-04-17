"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get("/", (req, res, next) => {
    res.status(200).send({
        app: 'CervaDuino',
        version: '1.0.0',
    });
});
exports.default = router;
