<template>
  <div class="message-panel">
    <template v-for="(item, index) in messages">
        <div class="d-flex justify-center" transition="slide-y-transition" :key="item.id">
          <AppMessage 
            v-bind="item"
            :value="true"
            @input="onMessageClose(item, index)"
          >
          </AppMessage>
        </div>
    </template>
  </div>
</template>

<script>
import { gMessageService } from '@/services';

import AppMessage from './AppMessage.vue';

export default {
  name: 'MessagePanel',

  components: {
    AppMessage,
  },

  data: () => ({
    messages: [
    ],
  }),

  mounted() {
    gMessageService.register(this);
  },

  destroyed() {
    gMessageService.unregister(this);
  },

  methods: {
    add(message) {
      this.messages.unshift(message);
    },

    onMessageClose(item, index) {
      console.log(`onMessageClose: index ${index}, 
        message ${item.message}`);

      this.messages.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.message-panel {
  z-index: 9999;
  position: fixed;
  top: 80px;
  right: 40px;
  min-width: 300px;
  max-width: 460px;
  display: flex;
  flex-direction: column;
}
</style>
