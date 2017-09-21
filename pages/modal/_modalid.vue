<template>
  <main>
  <v-layout>
    <v-dialog v-model="dialog">
          <v-card >
            <h1>hello</h1>    
          </v-card>
        </v-dialog>
    </v-layout>  

  </main>

</template>
<script>
export default {

  data(){
    return {
      dialog:true
    }
  }
}
</script>

<style>

</style>
