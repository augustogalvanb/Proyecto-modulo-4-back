import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/Category.entity";
import { Repository } from "typeorm";
import * as data from "../../data.json"

@Injectable()
export class CategoriesRepository {
    constructor(@InjectRepository(Category) private categoriesRepository: Repository<Category>) {}

    async getCategories(): Promise<Category[]> {
        const categories = await this.categoriesRepository.find()
        return categories
    }

    async addCategories() {
        const savedCategories: Category[] = [];
                    
        for (const category of data) {
            const existingCategory = await this.categoriesRepository.findOne({
            where: { name: category.category }
        });

            if (!existingCategory) {
                const newCategory = await this.categoriesRepository.save({name: category.category});
                savedCategories.push(newCategory);
            } 
            }

        if(savedCategories.length === 1) {
            return 'Categoría cargada con éxito'
        } else if (savedCategories.length > 1) {
            return 'Categorías cargadas con éxito'
        } return 'La o las categorías ya existen'
         
    }
}

