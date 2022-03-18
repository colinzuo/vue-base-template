<template>
  <div>
    <v-app-bar app>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </div>
</template>

<script>
import defaultSetting from '@/settings';

export default {
  name: 'NotLoginLayout',

  data: () => ({
    title: defaultSetting.title,
  }),
}
</script>
