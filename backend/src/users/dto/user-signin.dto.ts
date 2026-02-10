import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class UserSigninDto {

    @IsNotEmpty({message:"Email is required"})  
    @IsEmail({}, {message:"Invalid email format"})
    email: string;      


    @IsNotEmpty({message:"Password is required"})
    @IsString()
    password: string;

}