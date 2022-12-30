<template>
  <div class="page-container d-flex flex-column ma-4">
    <div>
      <v-btn
        color="accent"
        @click="back"
      >
        <v-icon
          class="mr-2"
        >
          mdi-arrow-left
        </v-icon>
        Back
      </v-btn>
    </div>
    
    <div class="mx-10 text-h4 flex-grow-1 d-flex justify-center align-center">
      Sorry, page not found.
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
  data() {
    return {
    }
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ name: 'home' });
      } else {
        this.$router.go(-1);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  height: 100%;
}
</style>