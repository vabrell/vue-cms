<template>
	<div id="app" :class="{ sidebar_padding: $route.path.startsWith('/admin') }">
		<template v-if="!loading">
			<Controlpanel v-if="$route.path.startsWith('/admin')" />

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
	import InstallApp from '@/components/install/InstallApp'
	import Controlpanel from '@/components/Controlpanel'

	export default {
		beforeCreate() {
			fetch(`http://localhost:8080/api/install-check`)
				.then(response => response.json())
				.then(result => {
					this.databaseExists = result.databaseExists
					this.loading = !this.loading
				})
			this.$store.dispatch('getCart')
			this.$store.dispatch('getCartCount')
		},

		components: {
			InstallApp,
			Controlpanel
		},

		data() {
			return {
				databaseExists: true,
				loading: true
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

<style>
	@media screen and (min-width: 576px) {
		.sidebar_padding {
			padding-left: 200px;
		}
	}
</style>
