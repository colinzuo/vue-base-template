<template>
  <v-form class="user-form pa-4" ref="form" v-model="valid">
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Email"
      required
    ></v-text-field>

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

    <v-checkbox
      v-model="enabled"
      label="Enabled"
      dense
    ></v-checkbox>

    <v-checkbox
      v-if="isSysAdmin"
      v-model="sysAdmin"
      label="SysAdmin"
      dense
    ></v-checkbox>

    <v-checkbox
      v-if="isSysAdmin"
      v-model="admin"
      label="Admin"
      dense
    ></v-checkbox>

    <v-textarea
      v-model="note"
      label="Note"
    ></v-textarea>
    
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
</template>

<script>
import { mapGetters } from 'vuex'

import { validateEmail } from '@/utils/validate';

const passwordPlaceholder = 'ChangeIt';

export default {
  name: 'UserForm',

  props: {
      user: {
        type: Object,
      },
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
      },
      disableBtn: {
        type: Boolean,
        required: true,
      }
    },

  data: () => ({
    valid: false,
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    note: '',
    enabled: true,
    sysAdmin: false,
    admin: false,
    passwordShow: false,
  }),

  computed: {
    ...mapGetters([
      'isSysAdmin',
    ]),

    emailRules() {
      const rules = [
        v => !!v || 'Email is required',
        v => validateEmail(v) || 'Not a valid email',
      ]

      return rules
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
    username: 'validateField',
    password: 'validateField',
    passwordConfirm: 'validateField',
    user: 'updateUser',
  },

  created() {
    this.updateUser();
  },

  methods: {
    updateUser() {
      if (this.user?.id) {
        this.username = this.user.username;
        this.password = passwordPlaceholder;
        this.passwordConfirm = passwordPlaceholder;
        this.email = this.user.email;
        this.note = this.user.note;
        this.enabled = this.user.enabled;
        this.sysAdmin = this.user.sysAdmin;
        this.admin = this.user.admin;
      } else {
        this.username = '';
        this.password = '';
        this.passwordConfirm = '';
        this.email = '';
        this.note = '';
        this.enabled = true;
        this.sysAdmin = false;
        this.admin = false;
      }
    },

    validateField () {
      this.$refs.form.validate();
    },

    onClickOk() {
      let data;

      if (this.user == null) {
        data = {
          email: this.email,
          username: this.username,
          password: this.password,
          note: this.note,
          enabled: this.enabled,
        };

        if (this.isSysAdmin) {
          data.sysAdmin = this.sysAdmin;
          data.admin = this.admin;
        }
      } else {
        data = {};

        let propertyList = ['email', 'username', 'note', 'enabled'];

        if (this.isSysAdmin) {
          propertyList.push('sysAdmin', 'admin');
        }

        for (let property of propertyList) {
          if (this[property] !== this.user[property]) {
            data[property] = this[property];
          }
        }

        if (this.password !== passwordPlaceholder) {
          data.password = this.password;
        }
      }    

      this.$emit('ok', data);
    },

    onClickCancel() {
      this.$emit('cancel');
    }
  },
};
</script>

<style scoped>
.user-form {
  min-height: 400px;
}
</style>
