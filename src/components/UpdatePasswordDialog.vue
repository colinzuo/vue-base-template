<template>
  <v-card class="update-password-card pa-4">
    <v-form ref="form" v-model="valid">
      <v-text-field
        ref="username"
        v-model="usernameConfirm"
        :rules="usernameRules"
        label="Username"
        required
      ></v-text-field>

      <v-text-field
        v-model="oldPassword"
        :rules="passwordRules"
        label="OldPassword"
        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordShow ? 'text' : 'password'"
        @click:append="passwordShow = !passwordShow"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="NewPassword"
        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordShow ? 'text' : 'password'"
        @click:append="passwordShow = !passwordShow"
        required
      ></v-text-field>

      <v-text-field
        v-model="passwordConfirm"
        :rules="passwordConfirmRules"
        label="NewPasswordConfirm"
        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordShow ? 'text' : 'password'"
        @click:append="passwordShow = !passwordShow"
        required
      ></v-text-field>
      
      <v-btn
        :disabled="!valid || disableBtn"
        color="primary"
        class="mt-4"
        @click="onClickOk"
      >
        {{ okText }}
      </v-btn>

      <v-btn
        v-if="showCancel"
        :disabled="disableBtn"
        class="mt-4 ml-4"
        @click="onClickCancel"
      >
        {{ cancelText }}
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

import { gUserService } from '@/services';

export default {
  name: 'UpdatePasswordDialog',

  props: {
      okText: {
        type: String,
        default: 'Save',
      },
      showCancel: {
        type: Boolean,
        default: true,
      },
      cancelText: {
        type: String,
        default: 'Cancel',
      }
    },

  data: () => ({
    valid: false,
    handling: false,
    usernameConfirm: '',
    oldPassword: '',
    password: '',
    passwordConfirm: '',
    passwordShow: false,
  }),

  computed: {
    ...mapGetters([
      'username',
    ]),
    disableBtn() {
      return this.handling;
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
    usernameConfirm: 'validateField',
    oldPassword: 'validateField',
    password: 'validateField',
    passwordConfirm: 'validateField',
  },

  created() {
    this.usernameConfirm = this.username;
  },

  methods: {
    validateField () {
      this.$refs.form.validate();
    },

    async onClickOk() {
      let data;

      data = {
        username: this.username,
        oldPassword: this.oldPassword,
        newPassword: this.password,
      };

      try {
        this.handling = true;

        await gUserService.updateUserPassword(data);

        this.$emit('ok');
      } finally {
        this.handling = false;
      }
    },

    onClickCancel() {
      this.$emit('cancel');
    }
  },
};
</script>

<style scoped>
</style>
