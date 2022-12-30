<template>
  <div class="layout-container d-flex flex-column">
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title v-if="!drawer">{{ title }}</v-toolbar-title>

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
            @click="onClickUpdatePassword"
          >
            Update Password
          </v-btn>
          <v-btn
            @click="onClickSignout"
          >
            Sign out {{ username }}
          </v-btn>
        </div>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Help make zhiyou
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <template
          v-for="level1Item in mainNavItemsActive"
        >
          <v-list-item
            v-if="!level1Item.children"
            :key="level1Item.title"
            :to="level1Item.route"
          >
            <v-list-item-icon>
              <v-icon>{{ level1Item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-list-item-title
                    v-bind="attrs"
                    v-on="on"
                  >{{ level1Item.title }}</v-list-item-title>
                </template>
                <span>{{ level1Item.title }}</span>
              </v-tooltip>
            </v-list-item-content>
          </v-list-item>
          <v-list-group
            v-else
            :key="`group-${level1Item.title}`"
            :value="false"
            :prepend-icon="level1Item.icon"
          >
            <template v-slot:activator>
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-list-item-title
                    v-bind="attrs"
                    v-on="on"
                  >{{ level1Item.title }}</v-list-item-title>
                </template>
                <span>{{ level1Item.title }}</span>
              </v-tooltip>
            </template>

            <v-list-item
              v-for="level2Item in level1Item.children"
              :key="level2Item.title"
              :to="level2Item.route"
            >
              <v-list-item-content>
                <v-tooltip right>
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item-title
                      class="ml-4"
                      v-bind="attrs"
                      v-on="on"
                    >{{ level2Item.title }}</v-list-item-title>
                  </template>
                  <span>{{ level2Item.title }}</span>
                </v-tooltip>
              </v-list-item-content>
            </v-list-item> 
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>

    <v-dialog v-model="dialogUpdatePassword" content-class="update-password-dialog">
      <UpdatePasswordDialog
        @ok="closeUpdatePassword"
        @cancel="closeUpdatePassword"
      >
      </UpdatePasswordDialog>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import defaultSetting from '@/settings';
import { mainNavItemsFull } from '@/router/sidebar-nav';
import { processNavigationItems } from '@/utils/navigation';
import UpdatePasswordDialog from '@/components/UpdatePasswordDialog.vue';

export default {
  name: 'MainLayout',
  data: () => ({
    drawer: true,
    title: defaultSetting.title,
    mainNavItemsActive: [],
    dialogUpdatePassword: false,
  }),
  components: {
    UpdatePasswordDialog,
  },
  computed: {
    ...mapState({
      username: state => state.user.name,
    }),
  },
  created() {
    this.mainNavItemsActive = processNavigationItems(mainNavItemsFull);
  },
  methods: {
    onClickSignout() {
      this.$store.dispatch('user/logout');
    },
    onClickUpdatePassword() {
      this.dialogUpdatePassword = true;
    },
    closeUpdatePassword() {
      this.dialogUpdatePassword = false;
    },
  }
}
</script>

<style lang="scss">
.v-dialog.update-password-dialog {
  max-width: 500px;
}
</style>

<style lang="scss" scoped>
.layout-container {
  height: calc(100% - 0px);
  // height: calc(100% - 64px);
}
</style>
