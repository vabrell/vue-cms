<template>
	<b-container id="app">
		<template v-if="loading">
			<template v-if="databaseExists">
				<div id="nav"><router-link to="/">Home</router-link></div>
				<router-view />
			</template>

			<template v-if="!databaseExists">
				<InstallApp @completed="checkDatabase" />
			</template>
		</template>

		<b-spinner v-if="!loading" variant="secondary" type="grow" />
	</b-container>
</template>

<script>
	import InstallApp from '@/components/install/InstallApp'

	export default {
		beforeCreate() {
			fetch(`http://localhost:8080/api/install-check`)
				.then(response => response.json())
				.then(result => {
					this.databaseExists = result.databaseExists
					this.loading = !this.loading
				})
		},

		components: {
			InstallApp
		},

		data() {
			return {
				databaseExists: true,
				loading: false
			}
		},

		methods: {
			checkDatabase() {
				fetch(`http://localhost:8080/api/install-check`)
					.then(response => response.json())
					.then(result => {
						this.databaseExists = result.databaseExists
					})
			}
		}
	}
</script>

<style></style>
