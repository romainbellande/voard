<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <Signin :on-submit="onSubmit" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase';
import { actions, collections } from '@/store';
import Signin from '@/components/Signin';

export default {
  components: {
    Signin,
  },
  methods: {
    onSubmit(email, password) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(({ user }) => {
          const db = firebase.firestore();
          const userRef = db.collection(collections.USERS).doc(user.uid);
          this.$store.dispatch(actions.setUserRef, userRef);
        });
    },
  },
};
</script>

<style lang="css" scoped>
.fill-height {
  height: 100vh;
}
</style>>
