<template>
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
    />
  </v-card>
</template>

<script>
// import firebase from 'firebase';
import { mapGetters } from 'vuex';
import { FirestoreManager } from '@/store';

export default {
  data() {
    return {
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
      ],
    };
  },
  computed: {
    loading() {
      return this.users.length === 0;
    },
    ...mapGetters(['users']),
  },
  created() {
    const firestoreManager = new FirestoreManager(this.$store);
    firestoreManager.init(['users']);
  },
};
</script>

<style>

</style>
