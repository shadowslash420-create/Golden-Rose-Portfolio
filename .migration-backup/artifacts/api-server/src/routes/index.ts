import { Router, type IRouter } from "express";
import healthRouter from "./health";
import inquireRouter from "./inquire";

const router: IRouter = Router();

router.use(healthRouter);
router.use(inquireRouter);

export default router;
