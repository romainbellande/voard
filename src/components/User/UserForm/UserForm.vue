<template>
  <div>
    <div class="d-flex flex-wrap flex-row justify-space-around">
      <UserIdentityForm
        :edit-mode="editMode"
        v-bind="user"
        :saved="saved"
        @submit="onUserIdentitySubmit"
      />
      <SelectableItemsList
        :selected-items="defaultSelectedRoles"
        :headers="rolesHeaders"
        :items="roles"
        @input="onRoleInput"
      />
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
  </div>
</template>

<script>
import uniq from 'lodash/uniq';
import UserIdentityForm from '@/components/User/UserIdentityForm';
import SelectableItemsList from '@/components/SelectableItemsList';

export default {
  components: {
    UserIdentityForm,
    SelectableItemsList,
  },
  props: {
    user: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    editMode: {
      type: Boolean,
      default: false,
    },
    saved: {
      type: Boolean,
      default: false,
    },
    defaultSelectedRoles: {
      type: Array,
      default: () => [],
    },
    roles: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedRoles: this.defaultSelectedRoles,
      rolesHeaders: [{
        text: 'Name',
        align: 'left',
        value: 'name',
      }],
    };
  },
  computed: {
    permissions() {
      return uniq(this.selectedRoles.map(role => role.permissions)
        .reduce((prev, current) => [...prev, ...current], []));
    },
  },
  methods: {
    onRoleInput(roles) {
      this.selectedRoles = roles;
    },
    onUserIdentitySubmit(data) {
      this.$emit('submit', { user: data, roles: this.selectedRoles });
    },
  },
};
</script>

<style>

</style>
