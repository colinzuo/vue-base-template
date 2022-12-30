<template>
  <v-card>
    <v-card-title class="text-h5">
      Are you sure you want to delete this item?
    </v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn 
        :disabled="disableBtn"
        color="blue darken-1" 
        text 
        @click="onClickCancel"
      >
        Cancel
      </v-btn>
      <v-btn 
        :disabled="disableBtn"
        color="blue darken-1" 
        text 
        @click="onClickOk"
      >
        OK
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'DeleteConfirmDialog',

  props: {
      disableBtn: {
        type: Boolean,
        default: false,
      },
    },

  data: () => ({
  }),

  methods: {
    onClickOk() {
      this.$emit('ok');
    },

    onClickCancel() {
      this.$emit('cancel');
    }
  },
};
</script>

<style lang="scss">
.v-dialog.delete-confirm-dialog {
  max-width: 500px;
}
</style>
