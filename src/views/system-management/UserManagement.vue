<template>
  <div>
    <v-row class="mx-2 mt-2">
      <v-col
        cols="6"
        md="3"
      >
        <v-text-field
          :disabled="disableBtn"
          v-model="keyword"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          @click:append="refreshUserList"
        ></v-text-field>
      </v-col>
      <v-col
        v-if="isSysAdmin"
        cols="1"
      >
        <v-select
          v-model="optionIsSysAdmin"
          :items="optionYesNoItems"
          label="Sysadmin?"
        ></v-select>
      </v-col>
      <v-col
        cols="1"
      >
        <v-select
          v-model="optionIsAdmin"
          :items="optionYesNoItems"
          label="Admin?"
        ></v-select>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogUserRole" content-class="user-role-dialog">
      <UserRoleDialog
        :user="editedItem"
        :visible="dialogUserRole"
        @ok="closeUserRole"
        @cancel="closeUserRole"
      >
      </UserRoleDialog>
    </v-dialog>

    <v-data-table
      :loading="loading"
      :headers="headers"
      :items="userList"
      :options.sync="options"
      :server-items-length="totalUsers"
      item-key="username"
      show-expand
      :footer-props="footerProps"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Users</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-if="isSysAdmin"
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                New User
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <UserForm
                :disableBtn="disableBtn"
                :user="editedItem"
                @cancel="close"
                @ok="onUserFormOk"
              >
              </UserForm>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                  :disabled="disableBtn"
                  color="blue darken-1" 
                  text 
                  @click="closeDelete"
                >
                  Cancel
                </v-btn>
                <v-btn 
                  :disabled="disableBtn"
                  color="blue darken-1" 
                  text 
                  @click="deleteItemConfirm"
                >
                  OK
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
            >
              mdi-dots-vertical
            </v-icon>
          </template>
          <v-list>
            <v-list-item
              v-if="isSysAdmin"
              @click="editItem(item)"
            >
              <v-list-item-title> Edit </v-list-item-title>
            </v-list-item>
            <v-list-item
              v-if="isSysAdmin"
              @click="deleteItem(item)"
            >
              <v-list-item-title> Delete </v-list-item-title>
            </v-list-item>
            <v-list-item
              @click="manageUserRole(item)"
            >
              <v-list-item-title> Management Roles </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <div class="my-1">
            CreateTime: {{ item.createTime }}
          </div>
          <div class="my-1">
            Note: {{ item.note }}
          </div>
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { gUserService } from '@/services';
import UserForm from '@/components/UserForm.vue';
import UserRoleDialog from '@/components/UserRoleDialog.vue';
import { processOptions } from '@/utils/veutify';

export default {
  name: 'UserManagement',

  components: {
    UserForm,
    UserRoleDialog,
  },

  data() {
    return {
      dialog: false,
      dialogDelete: false,
      dialogUserRole: false,
      loading: false,
      handling: false,
      options: {},
      footerProps: {
        "items-per-page-options": [10, 20, 30],
      },
      keyword: '',
      optionIsAdmin: 'Any',
      optionYesNoItems: [
        'Any',
        'Yes',
        'No',
      ],
      optionIsSysAdmin: 'Any',
      headers: [
        { text: 'Name', value: 'username' },
        { text: 'Email', value: 'email' },
        { text: 'Enabled', value: 'enabled', sortable: false },
        { text: 'LoginTime', value: 'loginTime' },
        { text: 'Actions', value: 'actions', sortable: false },
        { text: '', value: 'data-table-expand' },
      ],
      userList: [],
      totalUsers: 0,
      editedIndex: -1,
      editedItem: null,
    }
  },
  computed: {
    ...mapGetters([
      'isAdmin',
      'isSysAdmin',
    ]),
    formTitle () {
      return this.editedIndex === -1 ? 'New User' : 'Edit User';
    },
    disableBtn() {
      return this.loading || this.handling;
    },
  },

  watch: {
    dialog (val) {
      val || this.close();
    },
    dialogDelete (val) {
      val || this.closeDelete();
    },
    dialogUserRole (val) {
      val || this.closeUserRole();
    },
    options: {
      handler () {
        this.refreshUserList();
      },
      deep: true,
    },
  },

  mounted() {
    this.refreshUserList();
  },

  methods: {
    camelToKebab(params) {
      if (params['sortBy'] === 'loginTime') {
        params['sortBy'] = 'login_time';
      }
    },
    async refreshUserList() {
      try {
        this.loading = true;

        const params = processOptions(this.options);
        this.camelToKebab(params);
        params.keyword = this.keyword || undefined;

        if (this.optionIsSysAdmin === 'Yes') {
          params.sysAdmin = true;
        } else if (this.optionIsSysAdmin === 'No') {
          params.sysAdmin = false;
        }

        if (this.optionIsAdmin === 'Yes') {
          params.admin = true;
        } else if (this.optionIsAdmin === 'No') {
          params.admin = false;
        }

        const userListResult = await gUserService.getUserList(params);
        
        this.userList = userListResult.data.list;
        this.totalUsers = userListResult.data.total;
      } finally {
        this.loading = false;
      }
    },

    editItem (item) {
      this.editedIndex = this.userList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem (item) {
      this.editedIndex = this.userList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm () {
      try {
        this.handling = true;

        await gUserService.delUser(this.editedItem.id);
        await this.refreshUserList();
      } finally {
        this.handling = false;
      }
      
      this.closeDelete();
    },

    close () {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = null;
        this.editedIndex = -1;
      });
    },

    closeDelete () {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = null;
        this.editedIndex = -1;
      });
    },

    manageUserRole(item) {
      this.editedIndex = this.userList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogUserRole = true;
    },

    closeUserRole() {
      console.log('closeUserRole');
      this.dialogUserRole = false;
    },

    async onUserFormOk(data) {
      try {
        this.handling = true;

        if (this.editedIndex === -1) {
          await gUserService.addUser(data);
          await this.refreshUserList();
        } else {
          if (Object.keys(data).length !== 0) {
            await gUserService.updateUser({
              userId: this.editedItem.id, 
              data,
            });
            await this.refreshUserList();
          }
        }
      } finally {
        this.handling = false;
      }
      
      this.close();
    },
  },
}
</script>

<style lang="scss">
.v-dialog.user-role-dialog {
  min-width: 500px;
  max-width: 800px;
  min-height: 600px;
  display: flex;
}
</style>