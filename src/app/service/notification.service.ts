import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

enum Type {
  DEFAULT = 'default',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

@Injectable({
  providedIn: 'root',
})
export class NotificatioionService {
  constructor(private notifierService: NotifierService) {}

  onDefault(message: string): void {
    this.notifierService.notify(Type.DEFAULT, message);
  }
  onSuccess(message: string): void {
    this.notifierService.notify(Type.SUCCESS, message);
  }
  onWarning(message: string): void {
    this.notifierService.notify(Type.WARNING, message);
  }
  onInfo(message: string): void {
    this.notifierService.notify(Type.INFO, message);
  }
  onError(message: string): void {
    this.notifierService.notify(Type.ERROR, message);
  }
}
