import { Injectable } from '@angular/core';

@Injectable()
export class TestService {
    toString(): string {
        return 'Hello i am TestService';
    }
}