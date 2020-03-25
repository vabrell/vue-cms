<template>
    <b-container>
        <h2 class="m-3">Statistik</h2>
        <Linechart :chartdata="chartdata" :options="options" />
        <Doughnutchart :chartdata2="chartdata2" :options2="options2" />
    </b-container>
</template>

<script>
    import Linechart from './charts/Linechart.vue'
    import Doughnutchart from './charts/Doughnutchart.vue'


    export default {
        components: {
            Linechart,
            Doughnutchart
        },
        data() {
            return {
                chartdata: {
                    labels: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni'],
                    datasets: [{
                        label: 'Produkter Sålda',
                        backgroundColor: '#f87979',
                        data: [40, 20, 30, 55, 17, 38]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: 'Produkter sålda per månad',
                        fontSize: 16
                    }
                },
                chartdata2: {
                    labels: [
                        'Sko 1',
                        'Sko 2',
                        'Sko 3'
                    ],
                    datasets: [{
                        backgroundColor: ['rgb(250,128,114)', 'rgb(255,255,51)', 'rgb(0,191,255)'],
                        data: [34, 22, 45]
                    }]
                },
                options2: {
                    title: {
                        display: true,
                        text: 'Andel sålda produkter',
                        fontSize: 16
                    }
                }
            }
        },
    }
</script>

<style>

</style>