<template>
  <b-navbar class="mb-3" toggleable="lg" type="light">
    <b-navbar-brand v-if="brand" to="/">{{ brand.value }}</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <router-link to="/SignIn" class="nav-link">
          <b-icon-person></b-icon-person>Logga in
        </router-link>
        <router-link to="/Cart" class="nav-link">
          <b-icon-Bucket></b-icon-Bucket>Kundvagn
          <b-badge class="ml-1" variant="danger">{{ $store.state.cartCount }}</b-badge>
        </router-link>

        <!-- <b-nav-item href="#">Logga ut</b-nav-item> -->
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <!-- <b-navbar-nav class="ml-auto"> -->
      <!-- <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
      </b-nav-form>-->
      <!--
          <b-nav-item-dropdown right>
            Using 'button-content' slot 
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown> 
      -->
      <!-- </b-navbar-nav> -->
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      brand: null
    };
  },
  name: "Navbar",
  created() {
    fetch("http://localhost:8080/api/settings?name=brandName")
      .then(response => response.json())
      .then(result => {
        this.brand = result;
      });
  }
};
</script>

<style>
</style>
