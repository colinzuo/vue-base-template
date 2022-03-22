import { authService } from './auth-service';
import { messageService } from './message-service';
import { storageService } from './storage-service';
import { userService } from './user-service';

export let gAuthService = authService;
export let gMessageService = messageService;
export let gStorageService = storageService;
export let gUserSerivce = userService;

console.log('Leave service repository init');
