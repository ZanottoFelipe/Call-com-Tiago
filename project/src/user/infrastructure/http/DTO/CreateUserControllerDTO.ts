import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserControllerDTO {
    @IsString()
    @MaxLength(255)
    @MinLength(3)
    name!: string;

    @IsEmail()
    @MaxLength(255)
    email!: string;

    @IsString()
    @MinLength(8)
    @MaxLength(128)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
        message: 'password must contain uppercase, lowercase, number and special character',
    })
    password!: string;
}