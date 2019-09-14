<template>
  <div>
    <form
      novalidate
      class="md-layout"
      @submit.prevent="validateRole"
    >
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">
            Role
          </div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('name')">
                <label for="name">Name</label>
                <md-input
                  id="name"
                  v-model="form.name"
                  name="name"
                  :disabled="sending"
                />
                <span
                  v-if="!$v.form.name.required"
                  class="md-error"
                >The name is required</span>
                <span
                  v-else-if="!$v.form.name.minlength"
                  class="md-error"
                >Invalid name</span>
              </md-field>
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
        </md-card-content>

        <md-progress-bar
          v-if="sending"
          md-mode="indeterminate"
        />

        <md-card-actions>
          <md-button
            type="submit"
            class="md-primary"
            :disabled="sending"
          >
            Submit role
          </md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar
        :md-active="roleSaved"
      >
        The role {{ lastRole && lastRole.name }} was saved with success!
      </md-snackbar>
    </form>
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
    form: {
      name: null,
      price: null,
      shopLink: null,
    },
    roleSaved: false,
    sending: false,
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
      this.form.name = null;
    },
    saveRole() {
      this.sending = true;

      // Instead of this timeout, here you can call your API
      this.roleSaved = true;
      this.sending = false;
      const { name } = this.form;
      this.lastRole = {
        name,
        permissions: this.selectedPermissions.map(item => item.name),
      };
      console.log('this.lastRole', this.lastRole);
      this.source.add(this.lastRole);
      this.clearForm();
      this.selectedPermissions = [];
      this.permissions = [];
    },
    validateRole() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
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
