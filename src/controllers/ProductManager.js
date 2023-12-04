import fs from "fs";

class ProductManager {
    constructor(path) {
        this.path = path;

        if (fs.existsSync(path)) {
            try {
                let products = fs.readFileSync(path, "utf-8")
                this.products = JSON.parse(products);
            } catch (error) {
                this.products = [];
            }
        } else {
            this.products = [];
        }
    }

    async saveFile(data) {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, '\t'));
            return true
        } catch {
            console.log(error)
            return false
        }
    }

    getProducts() {
        return this.products;
    }

    async addProduct(product) {
        const existsProduct = this.products.find((p) => p.code === product.code);
        if (existsProduct) {
            console.log(`El producto con este codigo ${product.code} ya existe`);
        } else {
            if (this.products.length === 0) {
                product.id = 1;
            } else {
                product.id = this.products[this.products.length - 1].id + 1;
            }

            this.products.push(product);
            const respuesta = await this.saveFile(this.products);

            if (respuesta) {
                console.log("Producto añadido");
            } else {
                console.log("Hubo un error al añadir el producto");
            }
        }
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            return console.log("No se ha encontrado el id");
        } else {
            return product;
        }
    }

    async updateProduct(id, updatedProduct) {
        const existsProduct = this.products.find((p) => p.id === id);

        if (existsProduct) {
            existsProduct.title = updatedProduct.title;
            existsProduct.description = updatedProduct.description;
            existsProduct.price = updatedProduct.price;
            existsProduct.thumbnail = updatedProduct.thumbnail;
            existsProduct.code = updatedProduct.code;
            existsProduct.stock = updatedProduct.stock;
            existsProduct.category = updatedProduct.category;

            const respuesta = await this.saveFile(this.products);

            if (respuesta) {
                console.log(`ID ${id} actualizado`);
            } else {
                console.log("No se actualizo el ID")
            }
        } else {
            console.log(`El producto con ese ID ${id} no existe`);
        }
    }

    async deleteProduct(id) {
        const index = this.products.findIndex((p) => p.id === id);

        if(index !== -1){
            this.products.splice(index, 1);

            const respuesta = await this.saveFile(this.products);

            if(respuesta) {
                console.log("producto eliminado");
            } else {
                console.log("no se pudo eliminar el producto");
            }            
        } else {
            console.log(`El producto con ID ${id} no existe`);
        }
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock, category) {
      this.title = title || "";
      this.description = description || "";
      this.price = price || 0;
      this.thumbnail = thumbnail || "";
      this.code = code || "";
      this.stock = stock || 0;
      this.category = category || "";
    }
  }

export {ProductManager};
export { Product };