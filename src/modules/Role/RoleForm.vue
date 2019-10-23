<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-card class="md-layout-item md-size-50 md-small-size-100">
        <v-card-title>Role</v-card-title>
        <v-card-text>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <v-text-field
                v-model="form.name"
                label="name"
                name="name"
                prepend-icon="person"
                type="text"
                :rules="rules.name"
              />
              <v-btn
                large
                @click="dialog = true"
              >
                Add permissions
              </v-btn>
              <permissions-dialog
                v-model="dialog"
                @add="addPermissions"
              />
              <div class="py-3">
                <span class="font-weight-black">Permissions ({{ selectedPermissions.length }})</span>
                <div class="my-3">
                  <permissions-list
                    :permissions="permissions"
                    @input="onSelectedPermissionsInput"
                  />
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
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
import { validationMixin } from 'vuelidate';
import {
  required,
  minLength,
} from 'vuelidate/lib/validators';
import firebase from 'firebase';

import { collections, actions } from '@/store';
import PermissionsDialog from './PermissionsDialog.vue';
import PermissionsList from './PermissionsList.vue';

export default {
  components: {
    PermissionsDialog,
    PermissionsList,
  },
  mixins: [validationMixin],
  data: () => ({
    permissions: [],
    selectedPermissions: [],
    valid: false,
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
  created() {
    const db = firebase.firestore();
    this.source = db.collection(collections.ROLES);
    this.$store.dispatch(actions.setRolesRef, this.source);
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
      },
    },
  },
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
      this.$v.$reset();
      this.form.name = '';
    },
    saveRole() {
      this.roleSaved = true;
      const { name } = this.form;
      this.lastRole = {
        name,
        permissions: this.selectedPermissions.map(item => item.name),
      };
      this.source.add(this.lastRole);
      this.clearForm();
      this.selectedPermissions = [];
      this.permissions = [];
    },
    validateRole() {
      if (this.$refs.form.validate()) {
        this.saveRole();
      }
    },
    addPermissions(permissions) {
      this.permissions = permissions;
    },
    onSelectedPermissionsInput(permissions) {
      this.selectedPermissions = permissions;
    },
  },
};
</script>

<style>

</style>
