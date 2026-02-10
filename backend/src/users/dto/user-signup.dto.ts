import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { UserSigninDto } from "./user-signin.dto";

export class UserSignupDto extends UserSigninDto {

    @IsNotEmpty({message:"Name is required"})
    @IsString()
    name: string;


}