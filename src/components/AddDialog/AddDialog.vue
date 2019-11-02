<template>
  <v-dialog
    :value="dialog"
    max-width="500"
    @click:outside="$emit('close', false)"
  >
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ description }}
      </v-card-text>

      <slot />

      <v-card-actions>
        <div class="flex-grow-1" />

        <v-btn
          color="green darken-1"
          text
          @click="$emit('close', false)"
        >
          Cancel
        </v-btn>

        <v-btn
          color="green darken-1"
          text
          data-testid="dialog-add-button"
          @click="$emit('add')"
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  model: {
    prop: 'dialog',
    event: 'close',
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>
