<template>
  <v-app
    v-if="user"
    id="inspire"
  >
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item :to="{ name: 'home' }">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'roles' }">
          <v-list-item-action>
            <v-icon>mdi-shield-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Roles</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          prepend-icon="account_circle"
        >
          <template v-slot:activator>
            <v-list-item-title>Users</v-list-item-title>
          </template>
          <v-list-item :to="{ name: 'users' }">
            <v-list-item-action>
              <v-icon>supervised_user_circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Manage users</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name: 'newUser' }">
            <v-list-item-action>
              <v-icon>person_add</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>New User</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-calendar-clock</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Events</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-chat</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Chat</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-post</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Blog</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-file-document</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Documents</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-file-document</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Absences</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-file-document</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Pay slips</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
        class="app-container"
      >
        <router-view />
      </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    drawer: null,
  }),
  computed: mapGetters(['user']),
};
</script>

<style lang="scss" scoped>
  .app-container {
    align-items: start;
    height: 100%;
  }
</style>
