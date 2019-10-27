<template>
  <app-page
    :loading="loading"
    parent-route="users"
  >
    <div class="d-flex flex-wrap flex-row justify-space-around">
      <UserForm
        v-if="user"
        v-bind="user"
        :saved="saved"
        @submit="onSubmit"
      />
      <div>
        <SelectableItemsList
          :selected-items="userDetails.roles"
          :headers="rolesHeaders"
          :items="roles"
          @input="onRoleInput"
        />
        <v-btn
          data-testid="user-edit-submit"
          color="primary"
          @click="updateRoles"
        >
          Update roles
        </v-btn>
      </div>
    </div>
    <v-simple-table
      fixed-header
      height="300px"
    >
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Permission
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in permissions"
            :key="item"
          >
            <td>{{ item }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </app-page>
</template>

<script>
import uniq from 'lodash/uniq';
import UserForm from '@/components/User/UserForm';
import SelectableItemsList from '@/components/SelectableItemsList';
import userService from '@/services/user.service';
import roleService from '@/services/role.service';

export default {
  components: {
    UserForm,
    SelectableItemsList,
  },
  data() {
    return {
      saved: false,
      loading: true,
      selectedRoles: [],
      roles: [],
      rolesHeaders: [{
        text: 'Name',
        align: 'left',
        value: 'name',
      }],
      userId: this.$route.params.id,
      userDetails: {},
      user: null,
    };
  },
  computed: {
    permissions() {
      return uniq(this.userDetails.roles.map(role => role.permissions)
        .reduce((prev, current) => [...prev, ...current], []));
    },
  },
  async created() {
    this.roles = await roleService.fetchAll();
    this.userDetails = await userService.fetchDetails(this.userId);

    const {
      email, disabled, displayName, phoneNumber,
    } = await userService.fetchOne(this.userId);

    this.user = {
      email, disabled, displayName, phoneNumber,
    };
    this.loading = false;
  },
  methods: {
    async onSubmit(data) {
      await userService.update(this.userId, data);
      this.saved = true;
    },
    onRoleInput(roles) {
      this.selectedRoles = roles;
    },
    async updateRoles() {
      const permissions = uniq(this.selectedRoles.map(role => role.permissions)
        .reduce((prev, current) => [...prev, ...current], []));
      try {
        await userService.updateDetails(this.userId, {
          roles: this.selectedRoles,
          permissions,
        });
        this.userDetails.roles = this.selectedRoles;
      } catch (error) {
        // TODO: error message
      }
    },
  },
};
</script>

<style>

</style>
