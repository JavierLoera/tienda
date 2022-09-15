import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class loginUserDTO {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, {
        message: "Password debe ser mayor a 6 caracteres, contener una letra y un caracter especial"
    })
    password: string;
}