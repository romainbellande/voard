<template>
  <v-card>
    <v-card-title>
      Roles
      <div class="flex-grow-1" />
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="roles"
      :search="search"
      :single-select="false"
      show-select
      :single-expand="true"
      show-expand
      @input="onSelectedRoles"
    >
      <template v-slot:top>
        <div class="mx-4">
          <v-btn
            v-if="selectedRoles.length"
            small
            color="error"
            @click="onRemove"
          >
            Remove
          </v-btn>
        </div>
      </template>
      <template v-slot:item.nbPermissions="{ item }">
        {{ item.permissions.length }}
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td
          :colspan="headers.length"
          class="py-3"
        >
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">
                  Permission
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="permission in item.permissions"
                :key="permission"
              >
                <td>{{ permission }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import firebase from 'firebase';
import { collections } from '@/store';

const db = firebase.firestore();

export default {
  computed: {
    ...mapGetters(['roles']),
  },
  data() {
    return {
      search: '',
      selectedRoles: [],
      headers: [
        {
          text: 'Name',
          align: 'left',
          value: 'name',
        },
        {
          text: 'Number of permission',
          value: 'nbPermissions',
        },
      ],
    };
  },
  methods: {
    onSelectedRoles(roles) {
      this.selectedRoles = roles;
      console.log('roles', roles);
      console.log('roles', roles);
    },
    onRemove() {
      this.selectedRoles.map(item => db.collection(collections.ROLES).doc(item.id).delete());
    },
  },
};
</script>

<style>

</style>
