<template>
	<b-container class="shadow-sm p-5 mt-5 bg-light">
		<h2 class="h2 mb-3">Install E-Commerce</h2>
		<p>
			To be able to use this application, a database must be setup. To make this
			easy for you the application will be able to do this by itself, but it
			will need some information from you during the installation process. Click
			<strong>Start installation</strong> to begin.
		</p>

		<b-button
			variant="outline-primary"
			v-if="!installationStarted"
			@click="migrateDatabase"
		>
			Start installation
		</b-button>

		<p v-if="installationStarted" class="h4">
			Skapar databasen
			<b-spinner variant="warning" v-if="inProgress" />
			<b-icon
				icon="check"
				variant="success"
				font-scale="2"
				v-if="!inProgress && databaseCreated"
			/>
		</p>

		<b-button
			variant="success"
			v-if="databaseCreated"
			@click="installationCompleted"
		>
			Complete installation
		</b-button>
	</b-container>
</template>

<script>
	export default {
		data() {
			return {
				inProgress: false,
				databaseCreated: false,
				installationStarted: false
			}
		},

		methods: {
			migrateDatabase() {
				this.inProgress = !this.inProgress
				this.installationStarted = !this.installationStarted

				fetch(`http://localhost:8080/api/install`)
					.then(response => response.json())
					.then(result => {
						this.databaseCreated = result.created
						this.inProgress = !this.inProgress
					})
			},

			installationCompleted() {
				this.$emit('completed')
			}
		}
	}
</script>
