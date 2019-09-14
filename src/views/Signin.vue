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
import { ma } from 'vuex';
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
  // mixins: [validationMixin],
  // data: () => ({
  //   form: {
  //     email: null,
  //     password: null,
  //   },
  //   sending: false,
  // }),
  // validations: {
  //   form: {
  //     email: {
  //       required,
  //       minLength: minLength(3),
  //     },
  //     password: {
  //       required,
  //     },
  //   },
  // },
  // mounted() {
  //   // console.log('firebase', firebase.auth());
  //   // ui.start('#signin', uiConfig);
  // },
  // methods: {
  //   getValidationClass(fieldName) {
  //     const field = this.$v.form[fieldName];

  //     if (field) {
  //       return {
  //         'md-invalid': field.$invalid && field.$dirty,
  //       };
  //     }
  //     return {};
  //   },
  // },
  // signIn() {
  //   const { email, password } = this.form;
  // firebase.auth().signInWithEmailAndPassword(email, password)
  //   .then((test) => {
  //     console.log('test', test);
  //   })
  //   .catch((error) => {
  //   // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log('errorCode', errorCode);
  //     console.log('errorMessage', errorMessage);
  //   });
  // },
  // clearForm() {
  //   this.$v.$reset();
  //   this.form.email = null;
  //   this.form.password = null;
  // },
  // validateCredentials() {
  //   this.$v.$touch();

  //   if (!this.$v.$invalid) {
  //     this.signIn();
  //   }
  // },
};
</script>

<style lang="css" scoped>
.fill-height {
  height: 100vh;
}
</style>>
