import { Type } from "class-transformer"
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator"
import { ApiProperty, PartialType } from "@nestjs/swagger"
import { Product } from "src/entities/Product.entity"

class productDto extends PartialType(Product){
    @ApiProperty({
        description: 'nombre del producto',
        example: 'string',
    })
    name?: string;
}

export class createOrderDto {
    @IsNotEmpty()
    @IsUUID()
    user_id: string
    @ApiProperty({
        description: 'Lista de productos en la orden',
        type: [productDto],  // Indica que se espera un array de addProductDto
        example: [
            {
                id: 'string',  // Aquí es donde se muestra el ejemplo con solo el nombre del producto
            },
        ],
    })
    @IsArray()
    @ArrayMinSize(1)
    /*@ValidateNested() sin { each: true } solo sirve para un solo objeto*/
    /*con { each: true } cuando se tiene una propiedad que es un array de instancias de clases
    y quieres que cada elemento del array sea validado según sus propias reglas de validación.*/
    @ValidateNested({each: true})
    // convierta cada elemento del array en una instancia de addProductDto
    // y así las validaciones en addProductDto podrán ejecutarse correctamente.
    @Type(() => productDto) 
    products: productDto[]
}