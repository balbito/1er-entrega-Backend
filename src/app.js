import express from 'express';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        mensaje: "Bienvenido"
    })
})

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));