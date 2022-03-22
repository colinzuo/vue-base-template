<template>
  <div class="layout-container d-flex flex-column">
    <v-app-bar app>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer/>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="accent"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon
              class="mr-1"
              dark
            >
              mdi-account-circle
            </v-icon>
            {{ username }}
          </v-btn>
        </template>
        <div class="d-flex flex-column">
          <v-btn
            @click="onClickSignout"
          >
            Sign out {{ username }}
          </v-btn>
        </div>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import defaultSetting from '@/settings';

export default {
  name: 'MainLayout',
  data: () => ({
    title: defaultSetting.title,
  }),
  components: {
  },
  computed: {
    ...mapState({
      username: state => state.user.name,
    }),
  },
  methods: {
    onClickSignout() {
      this.$store.dispatch('user/logout');
    },
  }
}
</script>

<style lang="scss" scoped>
.layout-container {
  height: calc(100% - 64px);
}
</style>
