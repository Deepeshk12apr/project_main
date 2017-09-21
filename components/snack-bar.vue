<template>
<main>
     <v-snackbar
    :top="y === 'top'"
    :bottom="y === 'bottom'"
    :right="x === 'right'"
    :left="x === 'left'"
    :timeout="timeout"
    :success="context === 'success'"
    :info="context === 'info'"
    :warning="context === 'warning'"
    :error="context === 'error'"
    :primary="context === 'primary'"
    :secondary="context === 'secondary'"
    :multi-line="mode === 'multi-line'"
    :vertical="mode === 'vertical'"
    v-model="snackbar"
  >
    {{ snacktext }}
    <v-btn dark flat @click.native="snackbar = false">Close</v-btn>
  </v-snackbar>
</main>
    
</template>
<script>
    export default {
        props: ['result'],
        data(){
            return {
              snackbar: true,
              y: 'top',
              x: 'right',
              context: '',
              mode: '',
              timeout: 6000,
              snacktext: 'default'
            }
        },
      computed :{
        reset: function(){
        this.snackbar = this.result.snackbar
        this.y = this.result.y
        this.x = this.result.x
        this.context = this.result.context
        this.snacktext = this.result.snacktext
        this.snackbar = this.result.snackbar

          return 0
        }
      },  
      created(){
        console.log(this.result)
        this.snackbar = this.result.snackbar
        this.y = this.result.y
        this.x = this.result.x
        this.context = this.result.context
        this.snacktext = this.result.snacktext
        this.snackbar = this.result.snackbar

      }  
    }
</script>