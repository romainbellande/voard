<template>
  <div class="root">
    <v-form
      ref="form"
      v-model="valid"
    >
      <div class="md-layout md-gutter">
        <div class="md-layout-item md-small-size-100">
          <VTextField
            v-model="form.displayName"
            data-testid="user-form-displayname"
            label="displayName"
            name="displayName"
            prepend-icon="person"
            type="text"
            :rules="rules.displayName"
          />
          <VTextField
            v-model="form.email"
            data-testid="user-form-email"
            label="email"
            name="email"
            prepend-icon="email"
            type="text"
            :rules="rules.email"
          />
          <VTextField
            v-model="form.phoneNumber"
            data-testid="user-form-phonenumber"
            label="phoneNumber"
            name="phoneNumber"
            prepend-icon="phone"
            type="text"
            :rules="rules.phoneNumber"
          />
          <VTextField
            v-if="!editMode"
            v-model="form.password"
            data-testid="user-form-password"
            label="password"
            name="password"
            prepend-icon="password"
            type="password"
            :rules="rules.password"
          />
          <VCheckbox
            v-if="editMode"
            v-model="form.disabled"
            data-testid="user-form-disabled"
            label="Disabled"
          />
        </div>
      </div>
      <v-btn
        data-testid="user-form-submit"
        color="primary"
        @click="validateUser"
      >
        Submit user
      </v-btn>
      <v-snackbar
        v-model="saved"
      >
        The user {{ lastUser && lastUser.displayName }} was saved with success!
      </v-snackbar>
    </v-form>
  </div>
</template>

<script>
import cleanObject from '@/common/helpers/clean-object';

export default {
  props: {
    displayName: {
      type: String,
      default: '',
    },
    phoneNumber: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    reset: {
      type: Boolean,
      default: false,
    },
    saved: {
      type: Boolean,
      default: false,
    },
    editMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valid: false,
      form: {
        displayName: this.displayName,
        phoneNumber: this.phoneNumber,
        email: this.email,
        ...(this.editMode ? { disabled: this.disabled } : { password: '' }),
      },
      rules: {
        displayName: [
          value => !!value || 'Display name is required !',
          value => value.length > 3 || 'Display name must have at least 3 characters',
        ],
        phoneNumber: [],
        email: [
          value => !!value || 'Email name is required !',
          value => value.length > 3 || 'Email name must have at least 3 characters',
        ],
        password: [
          value => !!value || 'Password is required !',
          value => value.length >= 6 || 'Password must have at least 6 characters',
        ],
      },
      lastUser: null,
    };
  },
  methods: {
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
      this.$refs.form.reset();
      Object.keys(this.form).forEach((key) => {
        this.form[key] = '';
      });
    },
    onSubmit() {
      this.lastUser = cleanObject(this.form);
      this.$emit('submit', this.lastUser);
      if (this.reset) {
        this.clearForm();
      }
    },
    validateUser() {
      if (this.$refs.form.validate()) {
        this.onSubmit();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .root {
    max-width: 500px;
    padding: 25px 15px;
  }
</style>
