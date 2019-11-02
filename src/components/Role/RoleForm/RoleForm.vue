<template>
  <div>
    <v-form
      ref="form"
    >
      <v-card class="md-layout-item md-size-50 md-small-size-100">
        <v-card-title>Role</v-card-title>
        <v-card-text>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <VTextField
                v-model="form.name"
                label="name"
                name="name"
                prepend-icon="person"
                type="text"
                :rules="rules.name"
              />
              <v-btn
                large
                data-testid="add-permission-button"
                @click="dialog = true"
              >
                Add permissions
              </v-btn>
              <add-dialog
                v-model="dialog"
                title="Manage permissions"
                description="Select the permissions you want to add."
                @add="addPermissions"
              >
                <PermissionList
                  :items="allPermissions"
                  @input="onAddedPermissionsInput"
                />
              </add-dialog>
              <div
                class="py-3"
                data-testid="role-permissions"
              >
                <span class="font-weight-black">
                  Permissions ({{ selectedPermissions.length }})
                </span>
                <div
                  v-if="selectedPermissions.length"
                  class="my-3"
                >
                  <PermissionList
                    :items="permissions"
                    :selected-items="permissions"
                    @input="onSelectedPermissionsInput"
                  />
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            data-testid="submit-role-button"
            color="primary"
            @click="validateRole"
          >
            Submit role
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-snackbar
        v-model="roleSaved"
      >
        The role {{ lastRole && lastRole.name }} was saved with success!
      </v-snackbar>
    </v-form>
  </div>
</template>

<script>
import AddDialog from '@/components/AddDialog';
import PermissionList from '@/components/Permission/PermissionList';

export default {
  components: {
    AddDialog,
    PermissionList,
  },
  props: {
    allPermissions: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    permissions: [],
    selectedPermissions: [],
    addedPermissions: [],
    form: {
      name: '',
    },
    rules: {
      name: [
        value => !!value || 'Name is required !',
        value => value.length > 3 || 'Name must have at least 3 characters',
      ],
    },
    roleSaved: false,
    lastRole: null,
    dialog: false,
  }),
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty,
        };
      }
      return {};
    },
    clearForm() {
      this.$refs.form.reset();
      this.form.name = '';
    },
    saveRole() {
      this.roleSaved = true;
      const { name } = this.form;
      this.lastRole = {
        name,
        permissions: this.selectedPermissions,
      };
      this.$emit('submit', this.lastRole);
      this.clearForm();
      this.selectedPermissions = [];
      this.permissions = [];
    },
    validateRole() {
      if (this.$refs.form.validate()) {
        this.saveRole();
      }
    },
    addPermissions() {
      this.permissions = this.addedPermissions;
      this.selectedPermissions = this.addedPermissions;
      this.dialog = false;
    },
    onAddedPermissionsInput(permissions) {
      this.addedPermissions = permissions;
    },
    onSelectedPermissionsInput(permissions) {
      this.selectedPermissions = permissions;
    },
  },
};
</script>

<style>

</style>
