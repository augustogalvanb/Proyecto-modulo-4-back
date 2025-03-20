import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { updateProductDto } from "./dtos/updateProduct.dto";

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}

    getProducts(page: number, limit: number) {
        return this.productsRepository.getProducts(page, limit)
    }

    getProductById(id: string) {
        return this.productsRepository.getProductById(id)
    }

    addProduct() {
        return this.productsRepository.addProduct()
    }

    updateProduct(id: string, productData: updateProductDto) {
        return this.productsRepository.updateProduct(id, productData)
    }

    deleteProduct(id: string) {
        return this.productsRepository.deleteProduct(id)
    }
}