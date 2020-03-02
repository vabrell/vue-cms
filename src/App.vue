<template>
  <div id="app">
    <template v-if="!loading">
      <template v-if="databaseExists">
        <!-- bode läggas utanför b-container för snyggare lösning -->
        <router-view />

        <!-- <div id="nav">
          <router-link to="/">Home</router-link>
        </div>-->
      </template>

      <template v-if="!databaseExists">
        <InstallApp @completed="checkDatabase" />
      </template>
    </template>

    <b-spinner v-if="loading" variant="secondary" type="grow" />
  </div>
</template>

<script>
import InstallApp from "@/components/install/InstallApp";

export default {
  beforeCreate() {
    fetch(`http://localhost:8080/api/install-check`)
      .then(response => response.json())
      .then(result => {
        this.databaseExists = result.databaseExists;
        this.loading = !this.loading;
      });
  },

  components: {
    InstallApp
  },

  data() {
    return {
      databaseExists: true,
      loading: true
    };
  },

  methods: {
    checkDatabase() {
      fetch(`http://localhost:8080/api/install-check`)
        .then(response => response.json())
        .then(result => {
          this.databaseExists = result.databaseExists;
        });
    }
  }
};
</script>

<style></style>
