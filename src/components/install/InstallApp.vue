<template>
	<b-container class="shadow-lg p-5 mt-5 rounded">
		<h2 class="h2 mb-3">Installera Webbshop</h2>
		<p v-if="step === 0">
			För att kunna använda denna applikation, så måste en databas sättas upp
			där bland annat alla produkter och användare sparas i. För att underlätta
			för dig så har vi skapat en installationsguide som hjälper dig att
			installera de nödvändigheter som krävs för att kunna använda
			applikationen. Klicka på <strong>Starta installation</strong> för att
			starta.
		</p>

		<p v-if="step > 0 && step < 2" class="h5">
			Skapar databasen
			<b-spinner variant="warning" v-if="inProgress" />
			<b-icon
				icon="check"
				variant="success"
				font-scale="1.5"
				v-if="!inProgress && step === 1"
			/>
		</p>

		<b-form
			@submit.prevent="createUser"
			v-if="step > 1 && step < 3 && !inProgress"
		>
			<b-form-group id="name-group" label="Namn" label-for="name">
				<b-form-input
					id="name"
					v-model="form.name"
					required
					placeholder="Ditt namn"
				/>
				<p class="small text-danger mt-1 ml-2">{{ errors.name }}</p>
			</b-form-group>

			<b-form-group id="email-group" label="E-post" label-for="email">
				<b-form-input
					id="email"
					type="email"
					v-model="form.email"
					required
					placeholder="Din e-post"
				/>
				<p class="small text-danger mt-1 ml-2">{{ errors.email }}</p>
			</b-form-group>

			<b-form-group id="password-group" label="Lösenord" label-for="password">
				<b-form-input
					id="password"
					type="password"
					v-model="form.password"
					required
					placeholder="Lösenord"
				/>
				<b-form-input
					id="password-confirmation"
					type="password"
					v-model="form.confirmPassword"
					required
					placeholder="Upprepa lösenord"
				/>
				<p class="small text-danger mt-1 ml-2">{{ errors.password }}</p>
			</b-form-group>

			<b-button type="submit" variant="primary">Skapa konto</b-button>
		</b-form>

		<p class="h4" v-if="step > 2">
			Konto skapat
			<b-icon icon="check" variant="success" font-scale="1.5" />
		</p>

		<b-button
			variant="outline-primary"
			v-if="step === 0 && !inProgress"
			@click="migrateDatabase"
		>
			Starta installation
		</b-button>

		<b-button variant="outline-primary" v-if="step === 1" @click="step++">
			Nästa
		</b-button>

		<b-button variant="success" v-if="step > 2" @click="installationCompleted">
			Slutför installationen
		</b-button>
	</b-container>
</template>

<script>
	export default {
		data() {
			return {
				inProgress: false,
				step: 0,
				form: {},
				errors: {
					name: null,
					email: null,
					password: null
				},
				show: false
			}
		},

		methods: {
			migrateDatabase() {
				this.inProgress = !this.inProgress

				fetch(`http://localhost:8080/api/install`)
					.then(response => response.json())
					.then(() => {
						this.step++
						this.inProgress = !this.inProgress
					})
			},

			createUser() {
				this.errors = {
					name: null,
					email: null,
					password: null
				}

				this.form.admin = true

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

			installationCompleted() {
				this.$emit('completed')
				this.$route.push('/login')
			}
		}
	}
</script>
