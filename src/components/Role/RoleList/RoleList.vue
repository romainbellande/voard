<template>
  <v-card>
    <v-card-title>
      Roles
      <div class="flex-grow-1" />
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :single-select="false"
      show-select
      :single-expand="true"
      show-expand
      @input="onSelectedRoles"
    >
      <template v-slot:top>
        <div class="mx-4">
          <v-btn
            v-if="selectedRoles.length"
            small
            color="error"
            @click="onRemove"
          >
            Remove
          </v-btn>
        </div>
      </template>
      <template v-slot:item.nbPermissions="{ item }">
        {{ item.permissions.length }}
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td
          :colspan="headers.length"
          class="py-3"
        >
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">
                  Permission
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="permission in item.permissions"
                :key="permission"
              >
                <td>{{ permission }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    /**
     * user roles
     */
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      search: '',
      selectedRoles: [],
      headers: [
        {
          text: 'Name',
          align: 'left',
          value: 'name',
        },
        {
          text: 'Number of permission',
          value: 'nbPermissions',
        },
      ],
    };
  },
  methods: {
    onSelectedRoles(roles) {
      this.selectedRoles = roles;
    },
    onRemove() {
      /**
       *  event emitted regarding all selected roles we want to remove
       *
       * @event remove
       * @type {object}
       * @property {object} [{ name: 'SUPER_ADMIN', permissions: ['documents.users.get'] }]
       */
      this.$emit('remove', this.selectedRoles);
    },
  },
};
</script>
