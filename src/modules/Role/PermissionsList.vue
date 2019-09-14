<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="permissions"
      :single-select="false"
      item-key="name"
      show-select
      :search="search"
      class="elevation-1"
      @item-selected="onItemSelected"
      @input="onInput"
    />
  </v-card>
</template>

<script>
export default {
  props: {
    permissions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      search: '',
      selected: [],
      headers: [
        {
          text: 'Name',
          align: 'left',
          value: 'name',
        },
      ],
    };
  },
  methods: {
    onItemSelected({ item, value }) {
      this.$emit('item-selected', { item, value });
    },
    onInput(items) {
      this.$emit('input', items);
    },
  },
};
</script>


<style>

</style>
