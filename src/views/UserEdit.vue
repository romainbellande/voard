<template>
  <app-page :loading="loading">
    <UserForm
      v-if="user"
      v-bind="user"
      @submit="onSubmit"
    />
    <SelectableItemsList
      :headers="rolesHeaders"
      :items="roles"
      @input="onRoleInput"
      @item-selected="onRoleSelected"
    />
  </app-page>
</template>

<script>
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
    onSubmit(data) {
      console.log('data', data);
    },
    onRoleInput(role) {
      console.log('role', role);
    },
    onRoleSelected(role) {
      console.log('role', role);
    },
  },
};
</script>

<style>

</style>
