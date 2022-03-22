<template>
  <v-app>
    <router-view/>
    <MessagePanel/>
  </v-app>
</template>

<script>
import MessagePanel from '@/components/MessagePanel.vue';

export default {
  name: 'App',

  components: {
    MessagePanel,
  },

  data: () => ({
    //
  }),
};
</script>
