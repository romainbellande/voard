<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Equipment</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('name')">
                <label for="name">Name</label>
                <md-input name="name" id="name" v-model="form.name" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.name.required">The name is required</span>
                <span class="md-error" v-else-if="!$v.form.name.minlength">Invalid name</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('price')">
                <label for="price">Price</label>
                <md-input name="price" id="price" v-model="form.price" :disabled="sending" type="number" />
                <span class="md-error" v-if="!$v.form.price.required">The price is required</span>
                <span class="md-error" v-else-if="!$v.form.price.minlength">Invalid price</span>
              </md-field>
            </div>
          </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('shopLink')">
                <label for="shopLink">Shop link</label>
                <md-input id="shopLink" name="shopLink" v-model="form.shopLink" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.shopLink.required">The shop link is required</span>
                <span class="md-error" v-else-if="!$v.form.shopLink.maxlength">Invalid shop link</span>
              </md-field>
            </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Submit equipment</md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">The equipment {{ lastEquipment && lastEquipment.name }} was saved with success!</md-snackbar>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  required,
  minLength,
  maxLength,
} from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  data: () => ({
    form: {
      name: null,
      price: null,
      shopLink: null,
    },
    userSaved: false,
    sending: false,
    lastEquipment: null,
  }),
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3),
      },
      price: {
        required,
      },
      shopLink: {
        required,
      },
    },
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
      this.$v.$reset();
      this.form.name = null;
      this.form.price = null;
      this.form.shopLink = null;
    },
    saveUser() {
      this.sending = true;

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.userSaved = true;
        this.sending = false;
        const { name, price, shopLink } = this.form;
        console.log('hello');
        this.lastEquipment = {
          name,
          price,
          shopLink,
        };
        console.log('this.lastEquipment', this.lastEquipment);
        this.clearForm();
      }, 10);
    },
    validateUser() {
      this.$v.$touch();

      console.log('this.$v.$invalid', this.$v);
      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
</style>
