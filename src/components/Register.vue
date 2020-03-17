<template>
    <b-container id="sign-in" class="w-75">
        <h1 class="title">Registrering</h1>
        <b-form @submit.prevent="createUser">
            <b-form-group id="name-group" label="Namn" label-for="name">
                <b-form-input id="name" v-model="form.name" required placeholder="Ditt namn" />
                <p class="small text-danger mt-1 ml-2">{{ errors.name }}</p>
            </b-form-group>

            <b-form-group id="email-group" label="E-post" label-for="email">
                <b-form-input id="email" type="email" v-model="form.email" required placeholder="Din e-post" />
                <p class="small text-danger mt-1 ml-2">{{ errors.email }}</p>
            </b-form-group>

            <b-form-group id="password-group" label="Lösenord" label-for="password">
                <b-form-input id="password" type="password" v-model="form.password" required placeholder="Lösenord" />
                <b-form-input class="mt-2" id="password-confirmation" type="password" v-model="form.confirmPassword" required
                    placeholder="Upprepa lösenord" />
                <p class="small text-danger mt-1 ml-2">{{ errors.password }}</p>
            </b-form-group>

            <b-button type="submit" variant="primary">Skapa konto</b-button>
        </b-form>
        <p class="h4 pt-3" v-if="step >= 1">
            Konto skapat
            <b-icon icon="check" variant="success" font-scale="1.5" />
        </p>
    </b-container>
</template>

<script>
    export default {
        data() {
            return {
                step: 0,
                form: {
                },
                errors: {
					name: null,
					email: null,
					password: null
				},
            };
        },
        methods: {
            createUser() {
				this.errors = {
					name: null,
					email: null,
					password: null
				}

				fetch('http://localhost:8080/api/users', {
					body: JSON.stringify(this.form),
					headers: {
						'Content-Type': 'application/json'
					},
					method: 'POST'
				})
					.then(response => response.json())
					.then(result => {
						if (result.length > 0) {
							result.forEach(error => {
								this.errors[error.field] = error.message
							})
						} else {
							this.step++
						}
					})
			},
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