<template>
<v-layout column>
	<!-- <v-flex xs4>
	    <v-breadcrumbs divider="-">
	      <v-breadcrumbs-item 
	        v-for="item in items" :key="item.text"
	        :disabled="item.disabled"
	      >
	        {{ item.text }}
	      </v-breadcrumbs-item>
	    </v-breadcrumbs>
    </v-flex> -->
    <v-flex style="display: flex;">
	    <v-dialog v-model="dialog1" scrollable>
	      <v-btn primary slot="activator">Open Dialog</v-btn>
	      <v-card>
	        <v-card-title>Select Country</v-card-title>
	        <v-divider></v-divider>
	        <v-card-text style="height: 300px;">
	          <v-radio label="Bahamas, The" v-model="dialogm1" value="bahamas"></v-radio>
	          <v-radio label="Bahrain" v-model="dialogm1" value="bahrain"></v-radio>
	          <v-radio label="Bangladesh" v-model="dialogm1" value="bangladesh"></v-radio>
	          <v-radio label="Barbados" v-model="dialogm1" value="barbados"></v-radio>
	          <v-radio label="Belarus" v-model="dialogm1" value="belarus"></v-radio>
	          <v-radio label="Belgium" v-model="dialogm1" value="belgium"></v-radio>
	          <v-radio label="Belize" v-model="dialogm1" value="belize"></v-radio>
	          <v-radio label="Benin" v-model="dialogm1" value="benin"></v-radio>
	          <v-radio label="Bhutan" v-model="dialogm1" value="bhutan"></v-radio>
	          <v-radio label="Bolivia" v-model="dialogm1" value="bolivia"></v-radio>
	          <v-radio label="Bosnia and Herzegovina" v-model="dialogm1" value="bosnia"></v-radio>
	          <v-radio label="Botswana" v-model="dialogm1" value="botswana"></v-radio>
	          <v-radio label="Brazil" v-model="dialogm1" value="brazil"></v-radio>
	          <v-radio label="Brunei" v-model="dialogm1" value="brunei"></v-radio>
	          <v-radio label="Bulgaria" v-model="dialogm1" value="bulgaria"></v-radio>
	          <v-radio label="Burkina Faso" v-model="dialogm1" value="burkina"></v-radio>
	          <v-radio label="Burma" v-model="dialogm1" value="burma"></v-radio>
	          <v-radio label="Burundi" v-model="dialogm1" value="burundi"></v-radio>
	        </v-card-text>
	        <v-divider></v-divider>
	        <v-card-actions>
	          <v-btn class="blue--text darken-1" flat @click.native="dialog1 = false">Close</v-btn>
	          <v-btn class="blue--text darken-1" flat @click.native="dialog1 = false">Save</v-btn>
	        </v-card-actions>
	      </v-card>
	    </v-dialog>
	    <label>{{dialogm1}}</label>
	    <v-dialog v-model="dialog2" scrollable>
	      <v-btn primary dark slot="activator">Open Dialog</v-btn>
	      <v-card>
	        <v-card-title>Select Country</v-card-title>
	        <v-divider></v-divider>
	        <v-card-text style="height: 300px;">
	          <v-radio label="Bahamas, The" v-model="dialogm2" value="bahamas"></v-radio>
	          <v-radio label="Bahrain" v-model="dialogm2" value="bahrain"></v-radio>
	          <v-radio label="Bangladesh" v-model="dialogm2" value="bangladesh"></v-radio>
	          <v-radio label="Barbados" v-model="dialogm2" value="barbados"></v-radio>
	          <v-radio label="Belarus" v-model="dialogm2" value="belarus"></v-radio>
	          <v-radio label="Belgium" v-model="dialogm2" value="belgium"></v-radio>
	          <v-radio label="Belize" v-model="dialogm2" value="belize"></v-radio>
	          <v-radio label="Benin" v-model="dialogm2" value="benin"></v-radio>
	          <v-radio label="Bhutan" v-model="dialogm2" value="bhutan"></v-radio>
	          <v-radio label="Bolivia" v-model="dialogm2" value="bolivia"></v-radio>
	          <v-radio label="Bosnia and Herzegovina" v-model="dialogm2" value="bosnia"></v-radio>
	          <v-radio label="Botswana" v-model="dialogm2" value="botswana"></v-radio>
	          <v-radio label="Brazil" v-model="dialogm2" value="brazil"></v-radio>
	          <v-radio label="Brunei" v-model="dialogm2" value="brunei"></v-radio>
	          <v-radio label="Bulgaria" v-model="dialogm2" value="bulgaria"></v-radio>
	          <v-radio label="Burkina Faso" v-model="dialogm2" value="burkina"></v-radio>
	          <v-radio label="Burma" v-model="dialogm2" value="burma"></v-radio>
	          <v-radio label="Burundi" v-model="dialogm2" value="burundi"></v-radio>
	        </v-card-text>
	        <v-divider></v-divider>
	        <v-card-actions>
	          <v-btn class="blue--text darken-1" flat @click.native="dialog2 = false">Close</v-btn>
	          <v-btn class="blue--text darken-1" flat @click.native="dialog2 = false">Save</v-btn>
	        </v-card-actions>
	      </v-card>
	    </v-dialog>	 
	    <label>{{dialogm2}}</label>
    </v-flex>
    <v-container fluid grid-list-md class="grey lighten-4">
        <v-layout row wrap>
          <v-flex xs6 v-for="product in products" :key="product.title">
            <!-- <v-card>
              <v-card-media :src="card.src" height= "250px">                
              </v-card-media>
            </v-card>-->
            <nuxt-link :to="'/products/'+product.id">
            <v-card> 
	        <v-card-media :src="product.src" height="200px">
	        </v-card-media>
	        <v-card-title primary-title>
	          <div>
	            <h3 class="title mb-0">{{product.brand}}</h3>
	            <h4 class="subheading mb-0">{{product.title}}</h4>
	            <h4 class= "subheading">{{product.price}}</h4>
	          </div>
	        </v-card-title>
	      </v-card>
	      </nuxt-link>
          </v-flex>
        </v-layout>
     </v-container>
</v-layout>

</template>

<script>
  export default {
    data () {
      return {
        dialogm1: '',
        dialogm2: '',
        dialog: false,
        dialog1: false,
        dialog2: false,
        items: [
          {
            text: 'Dashboard',
            disabled: false
          },
          {
            text: 'Link 1',
            disabled: false
          },
          {
            text: 'Link 2',
            disabled: true
          }
        ],
        products: [
        { id:1,brand:'Molly', title: 'Pre-fab homes', src: 'https://prod.zapyle.com/zapmedia/uploads/homepage_images/banner/14-8-17_Smallbanner1_1.jpg', price :'500' ,to:'/productlist' },
        { id:2,brand:'Molly', title: 'Favorite road trips', src: 'https://prod.zapyle.com/zapmedia/uploads/homepage_images/banner/14-8-17_banner1.jpg', price:'500',to:'/' },
        { id:3,brand:'Molly', title: 'Best airlines', src: 'https://prod.zapyle.com/zapmedia/uploads/homepage_images/banner/2-Column_A1_Copy_1.jpg', price:'500' ,to:'/'},
        { id:2,brand:'Molly', title: 'Favorite road trips', src: 'https://prod.zapyle.com/zapmedia/uploads/homepage_images/banner/14-8-17_banner1.jpg', price:'500' ,to:'/' },
        { id:2,brand:'Molly', title: 'Best airlines', src: 'https://prod.zapyle.com/zapmedia/uploads/homepage_images/banner/2-Column_A1_Copy_1.jpg', price:'500' ,to:'/'},
        { id:2,brand:'Molly', title: 'Favorite road trips', src: 'https://prod.zapyle.com/zapmedia/uploads/homepage_images/banner/14-8-17_banner1.jpg', price:'500' ,to:'/' }
      ]
      }
    }
  }
</script>