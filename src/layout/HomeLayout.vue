<template>
  <div class="layout-container d-flex flex-column">
    <v-app-bar app>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import defaultSetting from '@/settings';

export default {
  name: 'HomeLayout',
  data: () => ({
    title: defaultSetting.title,
  }),
  components: {
  },
  computed: {
    // ...mapState({
    // }),
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.layout-container {
  height: calc(100% - 64px);
}
</style>
