<template>
  <div class="hello-world d-flex justify-center align-center mt-12">
    <v-btn
      color="primary"
      @click="onClickSayHello"
    >
      Say Hello
    </v-btn>
  </div>
</template>

<script>
import { gMessageService } from '@/services';

export default {
  name: 'HelloWorld',

  data: () => ({
  }),

  methods: {
    onClickSayHello() {
      gMessageService.add({
        message: 'Hello world',
        timeout: 5000,
      });
    }
  },
};
</script>

<style scoped>
.hello-world {
  width: 100%;
  height: 100%;
}
</style>
