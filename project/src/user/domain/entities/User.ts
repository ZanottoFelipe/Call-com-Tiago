import { Name } from "../value-objects/Name";
import { Email } from "../value-objects/Email";
import { plainToClass } from "class-transformer";


interface UserProps {
    id?: string;
    name: string;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export class User {
    public id?: string;
    public name: string;
    public email: string;
    public password?: string;
    public createdAt?: Date;
    public updatedAt?: Date;

    constructor({ id, name, email, password, createdAt, updatedAt }: UserProps) {
        this.id = id;
        this.name = new Name(name).value;
        this.email = new Email(email).value;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    upadateInfoUser(name: string, email: string) {
        this.name = name;
        this.email = email;
        this.updatedAt = new Date();
    }

    updatePassword(password: string) {
        this.password = password;
        this.updatedAt = new Date();
    }

}

