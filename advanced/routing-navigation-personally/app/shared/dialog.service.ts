import { Injectable } from '@angular/core';

/**
 * ## 供全局使用的功能类
 */
@Injectable()
export class DialogService {
    confirm(message?: string) {
        return new Promise<boolean>(resolve => {
            return resolve(window.confirm(message || 'OK不？'));
        });
    }
}