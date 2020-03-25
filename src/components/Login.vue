<template>
  <b-container id="sign-in" class="w-75">
    <b-form @submit.prevent="onSubmit">
      <b-card title="Logga in">
        <b-form-group label="E-post" label-for="input-2">
          <b-form-input required placeholder="name@example.com" v-model="email" type="email"></b-form-input>
          <p class="text-danger">{{errorMessageEmail}}</p>
        </b-form-group>

        <b-form-group label="Lösenord" label-for="input-2">
          <b-form-input type="password" required placeholder="Skriv in lösenord" v-model="password"></b-form-input>
          <p class="text-danger">{{errorMessagePassword}}</p>
        </b-form-group>
        <b-button type="submit" variant="primary">Logga in</b-button>
        <router-link class="ml-2" to="/register">Inte registrerad?</router-link>
        <router-link class="ml-2" to="/">Glömt lösenordet?</router-link>
      </b-card>
    </b-form>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      cookie: null,
      email: null,
      password: null,
      errorMessageEmail: null,
      errorMessagePassword: null
    };
  },
  methods: {
    onSubmit() {
      fetch("http://localhost:8080/api/users/login", {
        body: JSON.stringify({
          email: this.email,
          password: this.password
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      })
        .then(response => response.json())
        .then(result => {
          if (result.error) {
            this.errorMessageEmail = result.messageEmail;
            this.errorMessagePassword = result.messagePassword;
          } else {
            this.cookie = result.id;
            this.$router.push("/");
            this.$store.dispatch("getCookie");
          }
        });
    }
  }
};
</script>
<style>
#sign-in {
  margin-top: 25vh;
}

@media screen and (min-width: 768px) {
  #sign-in {
    max-width: 50%;
  }
}
</style>