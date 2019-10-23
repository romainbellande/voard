<template>
  <section>
    <role-form />
    <div class="mt-3">
      <roles-list />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import RoleForm from '@/modules/Role/RoleForm.vue';
import RolesList from '@/modules/Role/RolesList.vue';

export default {
  components: { RoleForm, RolesList },
  data: () => ({
    selected: [],
    boolean: true,
  }),
  computed: mapGetters(['roles', 'permissions']),
};
</script>

<style>

</style>
