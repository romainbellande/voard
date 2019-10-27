<template>
  <div>
    <v-text-field
      v-model="search"
      append-icon="search"
      label="Search"
      single-line
      hide-details
    />
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :single-select="false"
      :item-key="itemKey"
      show-select
      :search="search"
      class="elevation-1"
      :value="[{ name: 'SUPER_ADMIN' }]"
      @item-selected="onItemSelected"
      @input="onInput"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
    headers: {
      type: Array,
      default: () => ({}),
      validator(value) {
        return value.map(item => typeof item === 'object' && 'text' in item && 'value' in item)
          .reduce((prev, current) => prev && current, true);
      },
    },
    selectedItems: {
      type: Array,
      default: () => [],
    },
    defaultKey: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      search: '',
      selected: this.selectedItems,
    };
  },
  computed: {
    itemKey() {
      return this.defaultKey || this.headers[0] ? this.headers[0].value : null;
    },
  },
  methods: {
    onItemSelected({ item }) {
      this.$emit('item-selected', item);
    },
    onInput(items) {
      this.$emit('input', items);
    },
  },
};
</script>

<style>

</style>
