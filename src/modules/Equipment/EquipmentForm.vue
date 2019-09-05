<template>
  <div>
    <form
      novalidate
      class="md-layout"
      @submit.prevent="validateUser"
    >
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">
            Equipment
          </div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('name')">
                <label for="name">Name</label>
                <md-input
                  id="name"
                  v-model="form.name"
                  name="name"
                  :disabled="sending"
                />
                <span
                  v-if="!$v.form.name.required"
                  class="md-error"
                >The name is required</span>
                <span
                  v-else-if="!$v.form.name.minlength"
                  class="md-error"
                >Invalid name</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('price')">
                <label for="price">Price</label>
                <md-input
                  id="price"
                  v-model="form.price"
                  name="price"
                  :disabled="sending"
                  type="number"
                />
                <span
                  v-if="!$v.form.price.required"
                  class="md-error"
                >The price is required</span>
                <span
                  v-else-if="!$v.form.price.minlength"
                  class="md-error"
                >Invalid price</span>
              </md-field>
            </div>
          </div>

          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('shopLink')">
              <label for="shopLink">Shop link</label>
              <md-input
                id="shopLink"
                v-model="form.shopLink"
                name="shopLink"
                :disabled="sending"
              />
              <span
                v-if="!$v.form.shopLink.required"
                class="md-error"
              >The shop link is required</span>
              <span
                v-else-if="!$v.form.shopLink.maxlength"
                class="md-error"
              >Invalid shop link</span>
            </md-field>
          </div>
        </md-card-content>

        <md-progress-bar
          v-if="sending"
          md-mode="indeterminate"
        />

        <md-card-actions>
          <md-button
            type="submit"
            class="md-primary"
            :disabled="sending"
          >
            Submit equipment
          </md-button>
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved">
        The equipment {{ lastEquipment && lastEquipment.name }} was saved with success!
      </md-snackbar>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  required,
  minLength,
} from 'vuelidate/lib/validators';
import firebase from 'firebase';

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
  created() {
    const db = firebase.firestore();
    const equipmentRef = db.collection('equipment');
    this.source = equipmentRef;
    this.$store.dispatch('setEquipmentRef', this.source);
  },
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
      this.userSaved = true;
      this.sending = false;
      const { name, price, shopLink } = this.form;
      this.lastEquipment = {
        name,
        price,
        shopLink,
      };
      // this.$store.commit('addEquipment', this.lastEquipment);
      this.source.add({
        name,
        price: parseFloat(price),
        shopLink,
        status: 'IN_VALiDATION', // IN_VALiDATION, VALIDATED, ORDERED, RECEIVED
        userId: this.$store.state.user.uid,
      });
      this.clearForm();
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
