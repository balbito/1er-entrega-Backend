import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import __dirname from './utils.js';
import {ProductManager} from './controllers/ProductManager.js';
import { Product } from './controllers/ProductManager.js';
import viewsRouter from './routes/views.router.js';


const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`)});

const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("hbs", handlebars.engine({ extname: "hbs", defaultLayout: "main" }));
app.set("views", `${__dirname}/views`);
app.set("view engine", "hbs");

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

app.use(express.static(`${__dirname}/public`));

const manager = new ProductManager("./src/products.json");
const productos = manager.getProducts();

socketServer.on("connection", (socketClient) => {
    console.log("Nuevo cliente conectado");

    socketClient.emit('product_list', productos)
    socketClient.on('product', (product) => {
        console.log(product)
        productos.push(product)
        socketClient.emit('product_list', productos)
    })
})



