<template>
  <v-dialog
    :value="dialog"
    max-width="500"
    @click:outside="$emit('close', false)"
  >
    <v-card>
      <v-card-title class="headline">
        Manage permissions
      </v-card-title>
      <v-card-text>
        Select the permissions you want to add.
      </v-card-text>

      <permissions-list
        :permissions="permissions"
        @input="onInput"
      />

      <v-card-actions>
        <div class="flex-grow-1" />

        <v-btn
          color="green darken-1"
          text
          @click="$emit('close', false)"
        >
          Cancel
        </v-btn>

        <v-btn
          color="green darken-1"
          text
          @click="add"
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from 'firebase';

import PermissionsList from './PermissionsList.vue';

export default {
  components: { PermissionsList },
  model: {
    prop: 'dialog',
    event: 'close',
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedPermissions: [],
      permissions: [],
    };
  },
  created() {
    firebase.functions().httpsCallable('app/permissions')().then(({ data }) => {
      this.permissions = data.map(item => ({ name: item }));
    });
  },
  methods: {
    onInput(permissions) {
      this.selectedPermissions = permissions;
    },
    add() {
      this.$emit('add', this.selectedPermissions);
      this.$emit('close', false);
    },
  },
};
</script>

<style>

</style>
