<template>
  <AppLoading v-if="loading" />
  <div v-else>
    <router-link
      v-if="parentRoute"
      :to="{ name: parentRoute }"
    >
      <v-btn
        class="mx-2"
        fab
        dark
        small
        color="primary"
      >
        <v-icon dark>
          arrow_back
        </v-icon>
      </v-btn>
    </router-link>
    <slot />
  </div>
</template>

<script>
import AppLoading from '../AppLoading';

export default {
  components: {
    AppLoading,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    parentRoute: {
      type: String,
      default: null,
    },
  },
};
</script>

<style>

</style>
