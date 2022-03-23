<template>
  <div>
    <v-card 
      class="mx-auto"
      max-width="500"
    >
      <div class="text-h6 ml-4 mt-6">Signup</div>

      <v-form class="pa-4" ref="form" v-model="valid">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Email"
          required
        ></v-text-field>

        <div class="d-flex align-center">
          <v-text-field
            v-model="idCode"
            :rules="idCodeRules"
            label="IdCode"
            required
            :disabled="sendIdCodeDisabled"
          ></v-text-field>
          <v-btn
            class="ml-4 request-id-code-btn"
            :disabled="sendIdCodeDisabled || loading || !!requestIdCodeEnableTime"
            @click="onClickSendIdCode"
          >
            <template v-if="requestIdCodeEnableTime">
              {{ requestIdCodeEnableTime }}
            </template>
            <template v-else>
              <v-icon
                class="mr-1"
                dark
              >
                mdi-send
              </v-icon>
              Request IdCode
            </template>
          </v-btn>
        </div>

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

        <v-text-field
          v-model="passwordConfirm"
          :rules="passwordConfirmRules"
          label="PasswordConfirm"
          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
          :type="passwordShow ? 'text' : 'password'"
          @click:append="passwordShow = !passwordShow"
          required
        ></v-text-field>
        
        <v-btn
          :disabled="!valid || loading"
          color="primary"
          class="mt-4"
          @click="onClickSignup"
        >
          Signup
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import { validateEmail } from '@/utils/validate';
import { gStorageService, gUserSerivce, gMessageService } from '@/services';

const requestIdCodeKey = 'request-id-code';
const minRequestIdCodeInterval = 60;

export default {
  name: 'Signup',
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      passwordConfirm: '',
      email: '',
      requestIdCodeEnableTime: '',
      lastRequestTime: '',
      updateEnableTimeIntervalId: -1,
      idCode: '',
      passwordShow: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
    }
  },
  computed: {
    emailRules() {
      const rules = [
        v => !!v || 'Email is required',
        v => validateEmail(v) || 'Not a valid email',
      ]

      return rules
    },
    idCodeRules() {
      const rules = [
        () => !!this.email || 'Input email field first to know where to send',
        v => !!v || 'IdCode is required',
        v => v.length == 8 || 'IdCode should be length 8',
      ]

      return rules
    },
    sendIdCodeDisabled() {
      if (!this.email || !validateEmail(this.email)) {
        return true;
      }
      return false;
    },
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
    passwordConfirmRules() {
      const rules = [
        v => !!v || 'PasswordConfirm is required',
        v => v === this.password || 'PasswordConfirm doesn\'t match password',
      ]

      return rules
    },
  },
  watch: {
    email: 'validateField',
    idCode: 'validateField',
    username: 'validateField',
    password: 'validateField',
    passwordConfirm: 'validateField',
  },
  created() {
    this.lastRequestTime = gStorageService.getItem(requestIdCodeKey);

    if (this.lastRequestTime) {
      this.lastRequestTime = new Date(this.lastRequestTime);

      const curTime = new Date();
      const leftSeconds = minRequestIdCodeInterval - (curTime.getMilliseconds() 
        - this.lastRequestTime.getMilliseconds()) / 1000;
      
      if (leftSeconds > 0 && leftSeconds <= minRequestIdCodeInterval) {
        this.requestIdCodeEnableTime = `${leftSeconds}s`;
        this.updateEnableTimeIntervalId = setInterval(this.onUpdateEnableTime, 1000);
      }
    }
  },
  mounted() {
    this.$refs.username.focus();
  },
  methods: {
    validateField () {
      this.$refs.form.validate()
    },
    async onClickSendIdCode() {
      const requestIdCodeData = {
        kind: 'email',
        email: this.email,
      };

      try {
        this.loading = true;

        await gUserSerivce.requestIdCode(requestIdCodeData);

        this.lastRequestTime = new Date();
        gStorageService.setItem(requestIdCodeKey, this.lastRequestTime.toJSON());
        this.requestIdCodeEnableTime = `${minRequestIdCodeInterval}s`;
        this.updateEnableTimeIntervalId = setInterval(this.onUpdateEnableTime, 1000);
      } finally {
        this.loading = false;
      }
    },
    async onClickSignup() {
      if (!this.valid) {
        console.error('unexpected error: onClickSignup is called when valid is false')
        return;
      }

      let signupData = {
        username: this.username,
        password: this.password,
        email: this.email,
        idCode: this.idCode,
      }

      try {
        this.loading = true;

        const rsp = await gUserSerivce.register(signupData);

        if (rsp.error) {
          gMessageService.add({
            type: 'error',
            message: rsp.error.detail,
          });
        } else {
          this.$router.push({name: 'login'});
        }
      } finally {
        this.loading = false;
      }
    },
    onUpdateEnableTime() {
      const curTime = new Date();
      const leftSeconds = Math.round(minRequestIdCodeInterval - (curTime.getTime() 
        - this.lastRequestTime.getTime()) / 1000);

      if (leftSeconds > 0 && leftSeconds <= minRequestIdCodeInterval) {
        this.requestIdCodeEnableTime = `${leftSeconds}s`;
      } else {
        clearInterval(this.updateEnableTimeIntervalId);
        this.updateEnableTimeIntervalId = -1;
        this.requestIdCodeEnableTime = '';
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.request-id-code-btn.v-btn {
  min-width: 180px;
}
</style>
