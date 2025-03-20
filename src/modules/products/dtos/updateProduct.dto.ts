import { IsString, IsDecimal, IsInt, IsOptional, Length, IsUrl, Min } from 'class-validator';

export class updateProductDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDecimal()
  @Min(0, { message: 'El precio debe ser mayor o igual a 0' })
  price?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @IsOptional()
  @IsUrl()
  imgUrl?: string
}
