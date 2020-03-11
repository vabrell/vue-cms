<template>
	<b-container>
		<h2>Inställningar</h2>
		<b-alert
			variant="success"
			dismissible
			@dismissed="dismissCoutdown = 0"
			@dismiss-count-down="countDownChange"
			:show="dismissCountDown"
			class="mt-3"
		>
			<strong>Inställningar sparade!</strong>
			<b-progress
				variant="success"
				:max="5"
				:value="dismissCountDown"
				height="4px"
				class="mt-1"
			/>
		</b-alert>

		<b-form @submit.prevent="saveSettings" v-if="settings">
			<b-form-group
				label="Visa produkt saldo"
				label-for="show-stock"
				description="Om du vill att antal produkter som finns kvar skall synas på varje produkt"
			>

				<b-form-checkbox
					id="show-stock"
					v-model="settings.show_stock"
				/>

			</b-form-group>

			<b-button type="submit" variant="outline-primary">Spara</b-button>
		</b-form>
	</b-container>
</template>

<script>
export default {
	data() {
		return {
			settings: null,
			dismissCountDown: 0
		}
	},

	created() {
		fetch('http://localhost:8080/api/settings/all')
			.then(response => response.json())
			.then(result => {
				this.settings = result
			})
	},

	methods: {
		saveSettings() {
			fetch('http://localhost:8080/api/settings', {
				body: JSON.stringify([
				{
					key: 'show_stock',
					value: String(Boolean(this.settings.show_stock))
				}
				]),
				headers: {
					'Content-Type': 'application/json'
				},
				method: 'PUT'
			})
				.then(() => {
					this.dismissCountDown = 5
				})
		},

		countDownChange(dismissCountDown) {
			this.dismissCountDown = dismissCountDown
		}
	}
}
</script>

<style></style>

