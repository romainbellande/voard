<template>
  <app-page
    :loading="loading"
    parent-route="users"
  >
    <UserForm
      :loading="loading"
      :user="user"
      :roles="roles"
      :edit-mode="true"
      :default-selected-roles="userDetails.roles"
      @submit="onSubmit"
    />
  </app-page>
</template>

<script>
import uniq from 'lodash/uniq';
import UserForm from '@/components/User/UserForm';
import userService from '@/services/user.service';
import roleService from '@/services/role.service';

export default {
  components: {
    UserForm,
  },
  data() {
    return {
      saved: false,
      loading: true,
      selectedRoles: [],
      roles: [],
      userId: this.$route.params.id,
      userDetails: {},
      user: null,
    };
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
    async onSubmit({ user, roles }) {
      await userService.update(this.userId, user);
      await this.updateRoles(roles);
      this.saved = true;
    },
    updateRoles(roles) {
      const permissions = uniq(roles.map(role => role.permissions)
        .reduce((prev, current) => [...prev, ...current], []));
      return userService.updateDetails(this.userId, {
        roles,
        permissions,
      });
    },
  },
};
</script>

<style>

</style>
