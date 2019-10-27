<template>
  <app-page :loading="loading">
    <UserForm
      :roles="roles"
      :saved="saved"
      @submit="onSubmit"
    />
  </app-page>
</template>

<script>
import UserForm from '@/components/User/UserForm';
import extractPermissionsFromRoles from '@/common/helpers/extract-permissions-from-roles';
import userService from '@/services/user.service';
import roleService from '@/services/role.service';

export default {
  components: {
    UserForm,
  },
  data() {
    return {
      saved: false,
      roles: [],
      loading: true,
    };
  },
  async created() {
    try {
      this.roles = await roleService.fetchAll();
    } catch (error) {
      console.error('fetch roles error:', error.message);
    }
    this.loading = false;
  },
  methods: {
    async onSubmit({ user, roles }) {
      const { uid } = await userService.create(user);
      const permissions = extractPermissionsFromRoles(roles);
      await userService.createDetails(uid, { roles, permissions });
      this.saved = true;
    },
  },
};
</script>

<style>

</style>
