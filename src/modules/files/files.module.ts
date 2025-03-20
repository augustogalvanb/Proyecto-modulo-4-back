import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/entities/Product.entity";
import { FilesController } from "./files.controller";
import { cloudinaryConfig } from "src/config/cloudinary";
import { CloudinaryService } from "src/common/cloudinary.service";
import { ProductsRepository } from "../products/products.repository";
import { ProductsService } from "../products/products.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [cloudinaryConfig, CloudinaryService, ProductsService, ProductsRepository],
    controllers: [FilesController],
    exports: []
})
export class FileModule{}