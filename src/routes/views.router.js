import { Router } from "express";
import {ProductManager} from "../controllers/ProductManager.js";
import { Product} from "../controllers/ProductManager.js";

const router = Router();

let manager = new ProductManager('./src/models/products.json');
let productos = manager.getProducts();

router.get("/", (req, res) => {
    res.render('home', { productos })
})

router.get("/realtimeproducts", (req, res) => {
    res.render('realTimeProducts')
})

export default router;