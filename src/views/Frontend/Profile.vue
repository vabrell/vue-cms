<template>
  <b-container>
    <b-row>
      <h2>Användarprofil</h2>
    </b-row>

    <b-row>
      <b-col cols="12">
        <h4>Adressuppgifter</h4>
      </b-col>

      <b-col cols="12">
        <AddressDetails />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12 mt-3">
        <h4>Mina ordrar</h4>
      </b-col>
      <b-col cols="12">
        <ProfileOrders />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import AddressDetails from '@/components/profile/AddressDetails'
  import ProfileOrders from '@/components/profile/ProfileOrders'

  export default {
    components: {
      AddressDetails,
      ProfileOrders
    }

  }
</script>

<style>

</style>