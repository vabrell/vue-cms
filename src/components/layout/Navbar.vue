<template>
  <b-navbar class="mb-3" toggleable="lg" type="light">
    <b-navbar-brand v-if="brand" to="/">{{ brand.value }}</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link to="/products" class="nav-link">Produkter</router-link>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto mt-3 mt-lg-0">
				
        <router-link to="/Cart" class="nav-link">
          <b-icon-Bucket></b-icon-Bucket> Kundvagn
          <b-badge class="ml-1" variant="danger">{{ $store.state.cartCount }}</b-badge>
        </router-link>

        <router-link v-if="!cookie" to="/login" class="nav-link">
          <b-icon-lock></b-icon-lock> Logga in
        </router-link>

        <b-nav-item-dropdown right v-if="cookie"  >
          <template v-slot:button-content class="text-capitalize">
            <b-icon icon="person-fill" /> {{ user.name }}
          </template>
          <b-dropdown-item v-if="$store.state.cookie.admin > 0" to="/admin">Kontrollpanel</b-dropdown-item>
          <b-dropdown-item to="/profile">Min profil</b-dropdown-item>
          <b-dropdown-item to="#">
            <b-button v-b-modal.modal-1 variant="link" class="text-left nav-link" v-if="cookie">
              <b-icon-unlock></b-icon-unlock> Logga ut
              <b-modal ref="my-modal" hide-footer id="modal-1" title="Logga ut">
                <p class="my-4">Är du säker på att du vill logga ut?</p>
                <b-button class="mt-3" variant="primary" @click.prevent="logout">Logga ut</b-button>
                <b-button class="mt-3 ml-1" @click="cancelLogout" variant="secondary">Avbryt</b-button>
              </b-modal>
              </b-button>
          </b-dropdown-item>
        </b-nav-item-dropdown> 
				
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      brand: null,
      user: null
    };
  },
  name: "Navbar",
  created() {
    fetch("/api/settings?name=brandName")
      .then(response => response.json())
      .then(result => {
        this.brand = result;
      });
    this.$store.dispatch("getCookie");

    this.getUser()

  },

  updated() {
    this.getUser()
  },

  methods: {
    logout() {
      fetch("/api/users/logout").then(() => {
        this.$store.dispatch("getCookie");
      });
    },
    cancelLogout() {
      this.$refs["my-modal"].hide();
    },

    getUser() {
      if ( this.$store.state.cookie ) {
        fetch(`/api/users/${ this.$store.state.cookie.id }`)
          .then( response => response.json() )
          .then( result => {
            this.user = result
          })
      }
    }
  },
  computed: {
    cookie() {
      return this.$store.state.cookie;
    }
  }
};
</script>

<style>
</style>
