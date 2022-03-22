import { authService } from './auth-service';
import { messageService } from './message-service';
import { storageService } from './storage-service';
import { userService } from './user-service';

import { setGlobalService } from './service-repository';

function defaultInitServiceReposity() {
  console.log('defaultInitServiceReposity Enter');

  setGlobalService('AuthService', authService);
  setGlobalService('MessageService', messageService);
  setGlobalService('StorageService', storageService);
  setGlobalService('UserService', userService);

  console.log('defaultInitServiceReposity Leave');
}

defaultInitServiceReposity();
