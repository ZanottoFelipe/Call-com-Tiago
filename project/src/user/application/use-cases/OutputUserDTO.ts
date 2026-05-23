export class OutputUserDTO {
    id!: string;
    name!: string;
    email!: string;
    createdAt!: Date;
    updatedAt!: Date;

    constructor(partial: Partial<OutputUserDTO>) {
        Object.assign(this, partial);
    }
}