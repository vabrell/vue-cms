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
  </b-container>
</template>

<script>
import AddressDetails from '@/components/profile/AddressDetails'

export default {
  components: {
    AddressDetails
  }

}
</script>

<style>

</style>