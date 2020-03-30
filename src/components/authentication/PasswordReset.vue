<template>
  <b-container id="sign-in" class="w-75">
    <b-form v-if="!past" @submit.prevent="resetPassword">
      <b-card title="Glömt lösenordet">
        <b-form-group label="E-post" label-for="input-2">
          <b-form-input
            autofocus
            required
            placeholder="name@example.com"
            v-model="email"
            type="email"
          ></b-form-input>
          <p class="text-danger">{{errorMessageEmail}}</p>
        </b-form-group>

        <b-form-group label="Säkerhetsfråga">
          <b-form-select v-model="securityQuestion">
            <template v-slot:first>
              <b-form-select-option :value="null" disabled>--Välj ett alternativ--</b-form-select-option>
            </template>

            <b-form-select-option
              required
              value="Vad var ditt smeknamn när du var liten?"
            >Vad var ditt smeknamn när du var liten?</b-form-select-option>
            <b-form-select-option required value="Vad heter ditt husdjur?">Vad heter ditt husdjur?</b-form-select-option>
          </b-form-select>

          <b-form-input
            required
            v-model="securityAnswer"
            class="mt-2"
            placeholder="Skriv in ditt svar"
          ></b-form-input>
          <p class="text-danger">{{errorMessageSecurityQuestion}}</p>
        </b-form-group>

        <b-button class="mb-4" type="submit" variant="primary">Skicka</b-button>
      </b-card>
    </b-form>

    <b-form @submit.prevent="newPassword" v-if="past">
      <b-card title="Återställ lösenord">
        <b-card-text
          class="text-danger"
          v-if="invalidInput"
        >Du måste måste skriva in ett nytt lösenord!</b-card-text>
        <b-form-group>
          <label for="input-live">Skriv in nytt lösenord</label>
          <b-form-input
            autofocus
            id="input-live"
            v-model="password"
            type="password"
            :state="passwordState"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Skriv in lösenord"
            trim
          ></b-form-input>
        </b-form-group>

        <b-form-group>
          <label for="input-live">Skriv in de nya lösenord igen</label>
          <b-form-input
            id="input-live"
            v-model="repeatPassword"
            type="password"
            :state="passwordState"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Skriv in lösenord"
            trim
          ></b-form-input>
          <!-- This will only be shown if the preceding input has an invalid state -->
          <b-form-invalid-feedback
            :state="passwordState"
            id="input-live-feedback"
          >Kontrollera lösenordet så dom stämmer överrens!</b-form-invalid-feedback>
        </b-form-group>

        <b-button class="mt-2" type="submit" variant="primary">Spara</b-button>
      </b-card>
      <b-form-text class="h4 text-success" v-if="pastNewPassword">
        {{confirmedMessage }}
        <b-icon class="h2 mb-0" shift-v="-2" shift-h="-2" icon="check-circle" variant="success"></b-icon>
      </b-form-text>
    </b-form>
  </b-container>
</template>

<script>
export default {
  computed: {
    passwordState() {
      if (this.repeatPassword === null) {
        return null;
      }

      return this.password === this.repeatPassword;
    }
  },
  data() {
    return {
      email: null,
      errorMessageEmail: null,
      securityQuestion: null,
      securityAnswer: null,
      errorMessageSecurityQuestion: null,
      past: false,
      password: null,
      repeatPassword: null,
      invalidInput: false,
      user: null,
      confirmedMessage: null,
      pastNewPassword: false
    };
  },
  methods: {
    resetPassword() {
      fetch("/api/users/passwordreset", {
        body: JSON.stringify({
          email: this.email,
          securityQuestion: this.securityQuestion,
          securityAnswer: this.securityAnswer
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      })
        .then(response => response.json())
        .then(result => {
          this.errorMessageEmail = null;
          this.errorMessageSecurityQuestion = null;
          if (result.error) {
            this.errorMessageEmail = result.messageEmail;
            this.errorMessageSecurityQuestion = result.messageSecurityQuestion;
          } else {
            this.past = true;
            this.user = result.user;
          }
        });
    },
    newPassword() {
      if (this.password && this.repeatPassword === this.password) {
        fetch("/api/users/newpassword", {
          body: JSON.stringify({
            user: this.user,
            password: this.password
          }),
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST"
        })
          .then(response => response.json())
          .then(result => {
            this.confirmedMessage = result.message;
            this.pastNewPassword = true;
          });
      } else {
        this.invalidInput = true;
      }
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