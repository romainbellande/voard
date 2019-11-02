<template>
  <SelectableItemsList
    :headers="headers"
    :items="formattedItems"
    :selected-items="formattedSelectedItems"
    @input="onInput"
  />
</template>

<script>
import SelectableItemsList from '@/components/SelectableItemsList';

export default {
  components: {
    SelectableItemsList,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    selectedItems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      headers: [
        {
          text: 'Name',
          align: 'left',
          value: 'name',
        },
      ],
    };
  },
  computed: {
    formattedItems() {
      return this.items.map(item => ({ name: item }));
    },
    formattedSelectedItems() {
      return this.selectedItems.map(item => ({ name: item }));
    },
  },
  methods: {
    onInput(items) {
      this.$emit('input', items.map(item => item.name));
    },
  },
};
</script>
