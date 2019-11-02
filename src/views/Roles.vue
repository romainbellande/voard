<template>
  <app-page :loading="loading">
    <RoleForm
      :all-permissions="permissions"
      @submit="onSubmit"
    />
    <div class="mt-3">
      <RoleList
        :items="roles"
        @remove="onRolesRemove"
      />
    </div>
  </app-page>
</template>

<script>
import { mapState } from 'vuex';

import roleService from '@/services/role.service';
import RoleForm from '@/components/Role/RoleForm';
import RoleList from '@/components/Role/RoleList';

export default {
  components: {
    RoleForm,
    RoleList,
  },
  data: () => ({
    selected: [],
    boolean: true,
    loading: false,
  }),
  computed: mapState(['roles', 'permissions']),
  async created() {
    this.$store.dispatch('bindRoles');
    this.$store.dispatch('fetchPermissions');
  },
  methods: {
    onSubmit(role) {
      roleService.add(role);
    },
    onRolesRemove(roles = []) {
      roles.forEach((role) => {
        roleService.delete(role.id);
      });
    },
  },
};
</script>

<style>

</style>
