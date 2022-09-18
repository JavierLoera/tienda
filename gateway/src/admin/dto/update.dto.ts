import { IsNotEmpty, IsString } from "class-validator";

export class StoreProduct{
    @IsNotEmpty()
    @IsString()    
    name:string;
    @IsNotEmpty()
    @IsString()
    description:string
    @IsNotEmpty()
    @IsString()
    price:string
    image: string;
}