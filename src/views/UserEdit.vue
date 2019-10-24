<template>
  <div>
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
  </div>
</template>

<script>
import firebase from 'firebase/app';

import UserForm from '@/components/User/UserForm';
import SelectableItemsList from '@/components/SelectableItemsList';
import userService from '@/services/user.service';

export default {
  components: {
    UserForm,
    SelectableItemsList,
  },
  data() {
    return {
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
    this.roles = await this.fetchRoles();
    this.userDetails = await this.fetchUserDetails();
    const {
      email, disabled, displayName, phoneNumber,
    } = await userService.fetchOne(this.userId);

    this.user = {
      email, disabled, displayName, phoneNumber,
    };
  },
  // computed: mapGetters(['roles']),
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
    fetchRoles() {
      const db = firebase.firestore();
      return db.collection('roles')
        .get()
        .then(querySnapshot => querySnapshot.docs.map(doc => doc.data()));
    },
    fetchUserDetails() {
      const db = firebase.firestore();
      return db.collection('users')
        .doc(this.userId)
        .get()
        .then(snapshot => snapshot.data());
    },
  },
};
</script>

<style>

</style>
