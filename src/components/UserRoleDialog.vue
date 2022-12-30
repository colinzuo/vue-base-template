<template>
  <v-card class="user-role-card flex-grow-1">
    <v-tabs
      v-model="tab"
      :centered="true"
    >
      <v-tab
        v-for="item in items"
        :key="item.tab"
        class="user-role-tab"
      >
        {{ item.tab }}
      </v-tab>
    </v-tabs>
    
    <v-tabs-items v-model="tab">
      <v-tab-item
        key="User Roles"
      >
        <div>
          <v-list>
            <v-subheader>Roles</v-subheader>
            <v-list-item
              v-for="item in curUserRoleList"
              :key="item.name"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-icon
                  @click="deleteItem(item)"
                >
                  mdi-delete
                </v-icon>
              </v-list-item-action>
            </v-list-item>            
          </v-list>

          <v-row
            class="ma-4"
          >
            <v-btn
              color="primary"
              @click="onClickSave"
            >
              Save
            </v-btn>

            <v-btn
              class="ml-4"
              @click="onClickCancel"
            >
              Cancel
            </v-btn>         
          </v-row>
        </div>
      </v-tab-item>

      <v-tab-item
        key="All Roles"
      >
        <div>
          <v-row class="mx-2 mt-2">
            <v-col
              cols="12"
              md="6"
            >
              <v-text-field
                :disabled="disableBtn"
                v-model="keyword"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                @click:append="refreshAllRoleList"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-data-table
            :loading="allRolesLoading"
            :headers="headers"
            :items="allRoleList"
            :options.sync="options"
            :server-items-length="totalAllRoles"
            item-key="name"
            show-expand
            :footer-props="footerProps"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-toolbar-title>Roles</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                v-if="!hasItem(item)"
                @click="addItem(item)"
              >
                mdi-plus
              </v-icon>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div>
                  Description: {{ item.description }}
                </div>
              </td>
            </template>
          </v-data-table>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import { gUserService } from '@/services';
import { processOptions } from '@/utils/veutify';

export default {
  name: 'UserRoleDialog',

  props: {
    user: {
      type: Object,
      require: true,
    },
    visible: Boolean,
  },

  data () {
    return {
      tab: null,
      items: [
        { tab: 'User Roles' },
        { tab: 'All Roles' },
      ],
      allRolesLoading: false,
      handling: false,
      options: {},
      footerProps: {
        "items-per-page-options": [10, 20, 30],
      },
      keyword: '',
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description', sortable: false },
        { text: 'Enabled', value: 'enabled', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
        { text: '', value: 'data-table-expand' },
      ],
      allRoleList: [],
      totalAllRoles: 0,
      userRolesLoading: false,
      origUserRoleList: [],
      curUserRoleList: [],
    }
  },

  computed: {
    disableBtn() {
      return this.allRolesLoading || this.handling;
    },
    userId() {
      return this.user.id;
    },
  },

  watch: {
    options: {
      handler () {
        this.refreshAllRoleList();
      },
      deep: true,
    },
    user: 'onUpdateUser',
  },

  mounted() {
    this.refreshAllRoleList();
    this.getUserRoleList();
  },

  methods: {
    onUpdateUser() {
      if (!this.visible) {
        return;
      }

      this.origUserRoleList = [];
      this.curUserRoleList = [];

      this.getUserRoleList();
    },

    async getUserRoleList() {
      try {
        this.userRolesLoading = true;

        const userRoleListResult = await gUserService.getUserRoleList(this.userId);

        this.origUserRoleList = userRoleListResult.data || [];
        this.curUserRoleList = [...this.origUserRoleList];
      } finally {
        this.userRolesLoading = false;
      }
    },

    async refreshAllRoleList() {
      try {
        this.allRolesLoading = true;

        const params = processOptions(this.options);
        params.keyword = this.keyword || undefined;

        const roleListResult = await gUserService.getRoleList(params);
        
        this.allRoleList = roleListResult.data.list;
        this.totalAllRoles = roleListResult.data.total;
      } finally {
        this.allRolesLoading = false;
      }
    },

    hasItem(item) {
      const found = this.curUserRoleList.find(
              value => value.id === item.id);
      return found ? true : false;
    },

    addItem (item) {
      console.log('addItem', item);
      const found = this.curUserRoleList.find(
        value => value.id === item.id);
      if (!found) {
        this.curUserRoleList.push(item);
      }
    },

    deleteItem(item) {
      console.log('deleteItem', item);
      const itemIdx = this.curUserRoleList.indexOf(item);
      this.curUserRoleList.splice(itemIdx, 1);
    },

    async onClickSave() {
      console.log('onClickSave');

      console.log('curUserRoleList', this.curUserRoleList);
      console.log('origUserRoleList', this.origUserRoleList);

      const addRoles = [];
      const delRoles = [];

      for (let role of this.curUserRoleList) {
        const found = this.origUserRoleList.find(
          value => value.id === role.id
        );

        if (!found) {
          addRoles.push({
            id: role.id,
            name: role.name,
          });
        }
      }

      for (let role of this.origUserRoleList) {
        const found = this.curUserRoleList.find(
          value => value.id === role.id
        );

        if (!found) {
          delRoles.push({
            id: role.id,
            name: role.name,
          });
        }
      }

      console.log('addRoles', addRoles);
      console.log('delRoles', delRoles);

      if (!(addRoles.length || delRoles.length)) {
        this.$emit('ok');
        return;
      }

      try {
        this.handling = true;

        await gUserService.updateUserRoleList({
          userId: this.userId,
          data: {
            addRoles,
            delRoles,
          },
        });

        this.$emit('ok');
      } finally {
        this.handling = false;
      }
    },

    onClickCancel() {
      console.log('onClickCancel');
      this.$emit('cancel');
    },
  },
}
</script>

<style lang="scss" scoped>
.v-tab.user-role-tab {
  text-transform: none;
}
.v-card.user-role-card {
  min-height: inherit;
}
</style>
