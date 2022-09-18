import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";

class products
{
    @IsNotEmpty()
    @IsNumber()
    id:number;
    @IsNotEmpty()
    @IsNumber()
    quantity:number;
    }


export class OrderDTO{
@Type(()=>products)
@IsArray()
@ArrayMinSize(1)
@ValidateNested({ each: true })
    products:products[]
}


