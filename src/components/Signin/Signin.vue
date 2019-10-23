<template>
  <div class="root">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Sign in</v-toolbar-title>
      <div class="flex-grow-1" />
    </v-toolbar>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-text-field
        v-model="email"
        label="Email"
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
    <div class="flex-grow-1" />
    <v-btn
      data-testid="signin-submit"
      color="primary"
      @click="submit"
    >
      Login
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
  },
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
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.onSubmit(this.email, this.password)
          .then(() => {
            this.reset();
            this.$router.push('/');
          })
          .catch((error) => {
            this.errorMessage = error.message;
            this.showError = true;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.root {
  max-width: 500px;
}
</style>
