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
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Sign in</v-toolbar-title>
                <div class="flex-grow-1" />
              </v-toolbar>
              <v-card-text>
                <v-form
                  ref="form"
                  v-model="valid"
                >
                  <v-text-field
                    v-model="email"
                    label="email"
                    name="email"
                    prepend-icon="person"
                    type="text"
                    :rules="emailRules"
                  />

                  <v-text-field
                    id="password"
                    v-model="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  />
                </v-form>
                <v-snackbar
                  v-model="showError"
                  :timeout="4000"
                >
                  {{ errorMessage }}
                  <v-btn
                    text
                    color="blue"
                    @click="errorMessage = null"
                  >
                    Close
                  </v-btn>
                </v-snackbar>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1" />
                <v-btn
                  color="primary"
                  @click="validate"
                >
                  Login
                </v-btn>
              </v-card-actions>
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

export default {
  data: () => ({
    showError: false,
    errorMessage: null,
    valid: false,
    password: '',
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(({ user }) => {
            const db = firebase.firestore();
            const userRef = db.collection(collections.USERS).doc(user.uid);
            this.$store.dispatch(actions.setUserRef, userRef);
            this.reset();
            this.$router.push('/');
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            this.errorMessage = error.message;
            this.showError = true;
            console.log('errorCode', errorCode);
          });
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style lang="css" scoped>
.fill-height {
  height: 100vh;
}
</style>>
