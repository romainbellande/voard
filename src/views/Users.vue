<template>
  <app-page :loading="loading">
    <v-card>
      <v-card-title>
        Users
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
        :loading="loading"
        item-key="email"
        loading-text="Loading... Please wait"
        :headers="headers"
        :items="users"
        :search="search"
      >
        <template v-slot:item.uid="{ item }">
          <router-link :to="'/users/' + item.uid">
            Edit
          </router-link>
        </template>
      </v-data-table>
    </v-card>
  </app-page>
</template>

<script>
import userService from '@/services/user.service';

export default {
  data() {
    return {
      users: [],
      search: '',
      headers: [
        {
          text: 'Email',
          align: 'left',
          value: 'email',
        },
        {
          text: 'Display name',
          value: 'displayName',
        },
        {
          text: 'Phone',
          value: 'phoneNumber',
        },
        {
          text: 'Actions',
          value: 'uid',
        },
      ],
    };
  },
  computed: {
    loading() {
      return this.users.length === 0;
    },
    // ...mapGetters(['users']),
  },
  async created() {
    this.users = await userService.fetchAll();
    console.log('this.users', this.users);
  },
};
</script>

<style>

</style>
