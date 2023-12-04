import { Router } from "express";
import { ProductManager } from "../controllers/ProductManager.js";

const router = Router();

const manager = new ProductManager("./products.json");

router.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await manager.getProducts();
        
        let responseProducts = products;

        if (limit && limit <= 5) {
            responseProducts = products.slice(0, limit);
        }

        res.json(responseProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const products = await manager.getProductById(Number(pid));

        if(products){
          return res.json(products);  // Devuelve la respuesta y sale de la función
        }

        // Si products no existe, envía una respuesta indicando que no se encontró el producto
        res.status(404).json({ error: "Product not found" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post("/", async (req, res) => {
    try {
       let product = req.body
       const newProduct = await manager.addProduct(product)
       
       if(newProduct?.error) {
        return res.status(404).json(newProduct.error)
       }
       res.status(201).json({message: "Producto agregado correctamente"})
    } catch (error) {
    res.status(500).json({error:error})
    }
})

router.put("/:pid", async (req, res) => {
    try {
      let modifiedProduct = req.body;
      res.json(await manager.updateProduct(Number(req.params.pid), modifiedProduct));
    } catch(error) {
       res.status(500).json({error:error})
    }
})

router.delete("/:pid", async (req, res) => {
    try {
      res.json(await manager.deleteProduct(Number(req.params.pid)))  
    } catch(error) {
       res.status(500).json({error:error})
    }
})
export default router;