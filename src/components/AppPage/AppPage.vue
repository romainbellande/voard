<template>
  <AppLoading v-if="loading" />
  <div v-else>
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
  },
};
</script>

<style>

</style>
