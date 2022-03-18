<template>
  <div>
    <v-card 
      class="mx-auto"
      max-width="500"
    >
      <div class="text-h6 ml-4 mt-6">Login</div>

      <v-form class="pa-4" ref="form" v-model="valid">
        <v-text-field
          ref="username"
          v-model="username"
          :rules="usernameRules"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
          :type="passwordShow ? 'text' : 'password'"
          @click:append="passwordShow = !passwordShow"
          required
        ></v-text-field>
        
        <v-btn
          :disabled="!valid || loading"
          color="primary"
          class="mt-4"
          @click="onClickLogin"
        >
          Login
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      passwordShow: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
    }
  },
  computed: {
    usernameRules() {
      const rules = [
        v => !!v || 'Username is required',
        v => v.length >= 3 || 'Username must be at least 3 characters',
      ]

      return rules
    },
    passwordRules() {
      const rules = [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be at least 6 characters',
      ]

      return rules
    },
  },
  watch: {
    username: 'validateField',
    password: 'validateField',
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  mounted() {
    this.$refs.username.focus();
  },
  methods: {
    validateField () {
      this.$refs.form.validate()
    },
    onClickLogin() {
      if (!this.valid) {
        console.log('unexpected error: onClickLogin is called when valid is false')
        return;
      }

      let formLoginData = {
        username: this.username,
        password: this.password,
      }

      this.loading = true
      this.$store.dispatch('user/formLogin', formLoginData)
        .then(() => {
          this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
        })
        .finally(() => {
          this.loading = false
        })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }    
  },
}
</script>

<style lang="scss" scoped>

</style>
