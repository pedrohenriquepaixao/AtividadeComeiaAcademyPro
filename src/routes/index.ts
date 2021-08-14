import { Router } from "express";
import itemsRouter from "./items.routes";
import locationRouter from "./location.routes";
import employeeRouter from "./employees.routes";

const routes = Router();

routes.use("/items", itemsRouter);
routes.use("/location", locationRouter);
routes.use("/employee", employeeRouter);

export default routes;
