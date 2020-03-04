<template>
    <section>
        <b-form class="mt-4" @submit.prevent="createProduct" v-if="show">
            <b-form-group id="input-group-1" label="Namn:" label-for="input-1">
                <b-form-input id="input-1" v-model="form.name" required placeholder="Namn på produkten"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Beskrivning:" label-for="input-2">
                <b-form-input id="input-2" v-model="form.description" required placeholder="Beskrivning av produkten">
                </b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Pris:" label-for="input-3">
                <b-form-input id="input-3" v-model="form.price" required placeholder="Pris på produkten"></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" label="Lager:" label-for="input-4">
                <b-form-input id="input-4" v-model="form.stock" required placeholder="Antal kvar på lager">
                </b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Lägg till produkt</b-button>
        </b-form>
        <b-alert variant="success" dismissible @dismissed="dismissCoutdown=0" @dismiss-count-down="countDownChange"
            :show="dismissCountDown" class="mt-3">
            <strong>Produkten har lagts till!</strong>
            <b-progress variant="success" :max="5" :value="dismissCountDown" height="4px" class="mt-1" />
        </b-alert>
    </section>
</template>

<script>
    export default {
        name: 'AddProduct',
        components: {},
        data() {
            return {
                form: {
                    name: '',
                    description: '',
                    price: null,
                    stock: 0
                },
                show: true,
                dismissSecs: 10,
                dismissCountDown: 0,
                showDismissibleAlert: false
            }
        },
        methods: {
            createProduct() {
                fetch('http://localhost:8080/api/products', {
                        body: JSON.stringify(this.form),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        method: 'POST'
                    })
                    .then(response => response.json())
                    .then(result => {
                        console.log(result)
                    })
                this.form.name = ''
                this.form.description = ''
                this.form.price = null
                this.form.stock = 0
                this.dismissCountDown = 5
            },
            countDownChange(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            }
        }
    }
</script>