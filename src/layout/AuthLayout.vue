<template>
  <div>
    <v-app-bar app>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer/>

      <v-btn
        v-if="showSignin"
        color="accent"
        @click="onClickSignin"
      >
        Signin
      </v-btn>

      <v-btn 
        v-if="showSignup"
        class="ml-2"
        color="accent"
        @click="onClickSignup"
      >
        Signup
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </div>
</template>

<script>
import defaultSetting from '@/settings';

export default {
  name: 'AuthLayout',

  data: () => ({
    title: defaultSetting.title,
  }),

  computed: {
    showSignin() {
      if (this.$route.name !== 'login') {
        return true;
      }

      return false;
    },

    showSignup() {
      if (this.$route.name !== 'signup') {
        return true;
      }

      return false;
    },
  },

  methods: {
    onClickSignin() {
      this.$router.push({name: "login"});
    },

    onClickSignup() {
      this.$router.push({name: "signup"});
    },
  }
}
</script>
