import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface UserResponse {
    id: string;
    name: string;
    email: string;
    password: string;
}

@Injectable()
export class UserClientService {
    constructor(private readonly httpService: HttpService) { }

    async findByEmail(email: string): Promise<UserResponse | null> {
        try {
            const url = `${process.env.USER_SERVICE_URL}/users/by-email/${email}`;
            const response = await firstValueFrom(
                this.httpService.get<UserResponse>(url),
            );
            return response.data;
        } catch {
            return null;
        }
    }
}
