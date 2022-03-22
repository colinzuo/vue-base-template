import { authService } from './auth-service';
import { messageService } from './message-service';
import { storageService } from './storage-service';
import { userService } from './user-service';

export let gAuthService = authService;
export let gMessageService = messageService;
export let gStorageService = storageService;
export let gUserSerivce = userService;

export function setGlobalService(name, value) {
  if (name == 'AuthService') {
    gAuthService = value;
  } else if (name == 'MessageService') {
    gMessageService = value;
  } else if (name == 'StorageService') {
    gStorageService = value;
  } else if (name == 'UserService') {
    gUserSerivce = value;
  } else {
    throw new Error(`Unknow service name ${name}`);
  }

  console.log(`setGlobalService: name ${name}`, value);
}
