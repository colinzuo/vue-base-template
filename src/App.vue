<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script>
import { serviceRepository } from '@/services';
import { createStorageService } from '@/services';

let storageService = createStorageService({keyPrefix: "VUEBASETPL"});
serviceRepository.storageService = storageService;

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
