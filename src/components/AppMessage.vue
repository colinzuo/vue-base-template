<template>
  <div 
    @mouseleave="mouseleave"
    @mouseover="mouseover"
  >
    <v-alert
      :type="type"
      :value="true"
      @input="onAlertClose"
      dismissible
      transition="scale-transition"
    >
      {{ message }}
    </v-alert>
  </div>
</template>

<script>
import Toggleable from '@/mixins/toggleable';

  export default {
    name: 'AppMessage',

    mixins: [
      Toggleable,
    ],

    props: {
      type: {
        type: String,
        default: 'info',
        validator: function (value) {
          // The value must match one of these strings
          return ['success', 'info', 'warning', 'error'].includes(value)
        },
      },
      message: {
        type: String,
        required: true,
      },
      timeout: {
        type: [Number, String],
        default: 5000,
      },
    },
    data: () => ({
      activeTimeout: -1,
    }),

    watch: {
      isActive: 'setTimeout',
      timeout: 'setTimeout',
    },

    mounted () {
      if (this.isActive) {
        this.setTimeout();
      }
    },

    destroyed() {
      window.clearTimeout(this.activeTimeout);
    },
    
    methods: {
      mouseleave() {
        this.setTimeout();
      },

      mouseover() {
        window.clearTimeout(this.activeTimeout);
      },

      onAlertClose() {
        this.$emit("input", false);
      },

      setTimeout () {
        window.clearTimeout(this.activeTimeout);

        const timeout = Number(this.timeout);

        if (!this.isActive || timeout <= 0) {
          return;
        }

        this.activeTimeout = window.setTimeout(() => {
          this.isActive = false;
        }, timeout)
      },
    },
  }
</script>
