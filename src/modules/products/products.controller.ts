import { BadRequestException, Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/roles.enum";
import { ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { updateProductDto } from "./dtos/updateProduct.dto";
import { limitDto, pageDto } from "../users/dtos/pagination.dto";
import { Signin } from "src/guards/signin.guard";

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService
    ){}
    
    @Get()
    @ApiQuery({ name: 'page', required: false, description: 'Número de página', type: String, default: 1 })
    @ApiQuery({ name: 'limit', required: false, description: 'Número de límite', type: String, default: 5 })
    getProducts (
        @Query(new ValidationPipe({ transform: true })) pageData: pageDto,
        @Query(new ValidationPipe({ transform: true })) limitData: limitDto
    ) {
        const page = pageData.page || 1
        const limit = limitData.limit || 5
        try {
            return this.productsService.getProducts(page, limit)
        } catch (error) {
            throw new HttpException(
                {
                    status: 400,
                    error: "No se pudo obtener los usuarios"
                },
                400
            )
        }
    }

    @Get(':id')
    getProductById(@Param('id') id: string) {
        return this.productsService.getProductById(id)
    }

    @Post('seeder')
    @UsePipes(new ValidationPipe({
        whitelist: true,
        exceptionFactory: (errors) => {
            const cleanErrors = errors.map((error) => {
                return {property: error.property, constraints: error.constraints}
            })
            return new BadRequestException({
                alert: "error detectado",
                errors: cleanErrors
            })
        }
    }))
    addProduct() {
        return this.productsService.addProduct()
    }

    @ApiBearerAuth()
    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(Signin, RolesGuard)
    updateProduct(@Param('id') id: string, @Body() productData: updateProductDto) {
        return this.productsService.updateProduct(id, productData)
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: string) {
        return this.productsService.deleteProduct(id)
    }
}