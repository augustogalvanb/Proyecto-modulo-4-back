import { HttpCode, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entities/Product.entity";
import { Repository } from "typeorm";
import * as data from "../../data.json"
import { updateProductDto } from "./dtos/updateProduct.dto";

@Injectable()
export class ProductsRepository {
  constructor(@InjectRepository(Product) private productsRepository: Repository<Product>) {}

    @HttpCode(200)
    async getProducts(page: number, limit: number): Promise<Product[]> {
      const [products] = await this.productsRepository.findAndCount({
        skip: (page - 1) * limit,  // Desplazamiento (offset)
        take: limit,               // Número de elementos a traer
    });
      return products
    }

    @HttpCode(200)
    async getProductById(id: string) {
        return this.productsRepository.findOneBy({id})
    }

    @HttpCode(201)
    async addProduct(){
      const savedProducts: Product[] = [];
                    
        for (const product of data) {
            const existingProduct = await this.productsRepository.findOne({
            where: { name: product.name }
        });

            if (!existingProduct) {
                const { category, ...productData } = product;
                const newProduct = await this.productsRepository.save(productData);
                savedProducts.push(newProduct);
            } 
        }

        if(savedProducts.length === 1) {
            return 'Producto cargado con éxito'
        } else if (savedProducts.length > 1) {
            return 'Productos cargados con éxito'
        } return 'La o los productos ya existen'
         
    }
    
    @HttpCode(200)
    async updateProduct(id: string, productData: updateProductDto) {
        const product = await this.productsRepository.findOneBy({id})
        if(!product) throw new NotFoundException(`producto con id ${id} no encontrado`)
        
        Object.keys(productData).forEach(key => {
            if (productData[key] !== undefined) {
              product[key] = productData[key];
            }
        });
        await this.productsRepository.save(product)
        return `El producto de id: ${id} fue actualizado con éxito`
    }

    async deleteProduct(id: string) {
      const product = await this.productsRepository.findOneBy({id})
      if(!product) throw new NotFoundException(`producto con id ${id} no encontrado`)
      await this.productsRepository.delete(id)
      return 'Producto eliminado con éxito'
  }
}