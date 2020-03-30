<template>
    <b-container>
        <h2 class="m-3">Statistik</h2>
        <Barchart v-if="loaded" :chartdata="chartdata" :options="options" />
        <!-- <Linechart v-if="loaded" :chartdata="chartdata" :options="options" /> -->
        <!-- <Doughnutchart class="m-5" :chartdata2="chartdata2" :options2="options2" /> -->
    </b-container>
</template>

<script>
    import Barchart from './charts/Barchart.vue'
    //import Linechart from './charts/Linechart.vue'
    //import Doughnutchart from './charts/Doughnutchart.vue'

    export default {
        components: {
            Barchart
            //Linechart,
            //Doughnutchart
        },
        data() {
            return {
                // randomBorderColor: null,
                // randomBackgroundColor: null,
                ordersData: null,
                loaded: false,
                chartdata: {
                    labels: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
                    datasets: [{
                            label: 'Ordrar Mottagna',
                            backgroundColor: 'rgba(25, 140, 255, .5)',
                            pointBorderColor: 'rgb(80, 80, 80)',
                        },
                        // {
                        //     label: 'Ordrar Genomförda',
                        //     borderColor: 'rgb(25, 140, 255)',
                        //     backgroundColor: 'rgba(25, 140, 255, .5)',
                        //     pointBorderColor: 'rgb(50, 50, 50)',
                        //     data: [24, 70, 45, 25, 69, 80]
                        // }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: 'Försäljningsstatistik',
                        fontSize: 22
                    }
                },
                // chartdata2: {
                //     labels: [
                //         'Sko 1',
                //         'Sko 2',
                //         'Sko 3'
                //     ],
                //     datasets: [{
                //         backgroundColor: ['rgb(255, 51, 51)', 'rgb(255, 221, 51)', 'rgb(25, 140, 255)'],
                //         data: [34, 22, 45]
                //     }]
                // },
                // options2: {
                //     title: {
                //         display: true,
                //         text: 'Andelar sålda produkter',
                //         fontSize: 32
                //     }
                // }
            }
        },
        created() {
            fetch('http://localhost:8080/api/orders/statistics')
                .then(response => response.json())
                .then(result => {
                    this.ordersData = result
                    this.chartdata.datasets[0].data = [this.getStatistics('january'), this.getStatistics('february'), this.getStatistics('mars'), this.getStatistics('april'), this.getStatistics('may'), this.getStatistics('june'), this.getStatistics('july'), this.getStatistics('august'), this.getStatistics('september'), this.getStatistics('oktober'), this.getStatistics('november'), this.getStatistics('december')]
                    this.loaded = true
                })
        },
        methods: {
            // generateColor() {
            //     this.randomBorderColor = 'rgba(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() *
            //         256) + ', ' + Math.floor(Math.random() * 256) + ', 1)'
            //     this.randomBackgroundColor = 'rgba(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math
            //     .random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', 0.5)'
            // },
            getStatistics(month) {
                let counter = 0
                for (let [key, value] of Object.entries(this.ordersData)) {
                    if (key.startsWith(month)) {
                        counter += value.length
                    }
                }
                return counter
            }
        }
    }
</script>

<style scoped>
    #doughnut-chart {
        width: 80% !important;
        height: 80% !important;
        margin: auto;
    }
</style>