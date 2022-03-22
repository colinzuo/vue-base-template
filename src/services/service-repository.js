export let gAuthService = null;
export let gMessageService = null;
export let gStorageService = null;
export let gUserSerivce = null;

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
