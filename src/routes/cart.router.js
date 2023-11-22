import { Router } from "express";
import { CartManager } from "../classes/CartManager.js";


const router = Router();
const nuevoCartManager = new CartManager();

router.post("/", async (req, res) => {
    try {
        await nuevoCartManager.addCart();
        res.json({
            message: "Carrito creado."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    const numberCid = Number(cid)

    const cart = await nuevoCartManager.getCartById(numberCid)

    if (cart) {
        return res.json(cart)
    } else {
        return res.send("ERROR: producto no encontrado.")
    }

});

router.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    await nuevoCartManager.addProductToCart(Number(cid), Number(pid))
    
    res.json({message: `Producto con ID ${pid} agregado al carrito nro ${cid}`})
})

export default router;