import { Router } from "express";
import ItemController from "../controllers/ItemController";

const itemsRouter = Router();

const itemController = new ItemController();

itemsRouter.get('/',itemController.index);
itemsRouter.get('/:id', itemController.index);

export default itemsRouter;