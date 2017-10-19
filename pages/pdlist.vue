<template>
    <v-layout column>
    
    <p>{{loadfilter}}</p>          
    <v-dialog class="hidden-md-and-up" persistent v-model="dialog" fullscreen :overlay=false>
        <v-card >
            <v-toolbar dark  class="primary">
                <v-btn icon @click.native="dialog = false" dark>
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Settings</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark flat @click.native="applyfilter()">Save</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <hr>
            <div v-if="filters" class="faded"><br>
                <h4>Brand</h4>
                <div class="maincategory" v-for="brand in filters.brand">
                    <v-checkbox :label="brand.key" v-model="brands" :value="brand.key"></v-checkbox>
                </div>
                <h4>Colors</h4>
                <!-- <p>{{filters}}</p> -->
                <div class="maincategory colorfilter" v-for="c in filters.color">
                <v-layout>
                <v-flex xs6 sm5 md4>
                    <v-checkbox :label="c.key" v-model="colors" :value="c.key"></v-checkbox>
                </v-flex>
                </v-layout>
                </div>
                <hr>
                <h6>Category</h6>
                <div v-for="cat in filters.category">
                  <!-- <span>{{cat.key}}</span> -->                 
                  <v-checkbox :label="cat.key" v-model="category" :value= "`${parentcat(cat)}`"></v-checkbox>
                  <!-- <li  v-for="c in cat.sub_category_count.buckets">
                    {{c.key}} ({{c.doc_count}})
                  </li> -->
                  <div class="subCat" v-for="c in cat.subcategory">
                    <v-checkbox :label="c.key" v-model="category" :value="c.key"></v-checkbox>  
                  </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
    <v-dialog class="hidden-md-and-up" persistent v-model="sortby_dialog" fullscreen :overlay=false>
      <v-card>
            <v-toolbar dark  class="primary">
                <v-btn icon @click.native="sortby_dialog = false" dark>
                    <v-icon>close</v-icon>
                 </v-btn>
                 <v-toolbar-title>Settings</v-toolbar-title>
                 <v-spacer></v-spacer>
                 <v-toolbar-items>
                    <v-btn dark flat @click.native="applyfilter()">Save</v-btn>
                 </v-toolbar-items>
              </v-toolbar>
                <h4>Sort By</h4>
                <v-radio-group v-model="sortby" :mandatory="false">
                <v-radio label="Popularity" value="radio-1"></v-radio>
                <v-radio label="Latest" value="radio-2"></v-radio>
                <v-radio label="Price-Low to High" value="radio-1"></v-radio>
                <v-radio label="Price-High to Low" value="radio-2"></v-radio>
                </v-radio-group>
      </v-card>
    </v-dialog>
    <div class="csdk">
    <v-dialog v-model="brand_dialog" persistent width="900px" :nudge-left="40">
     <!--  <v-card>
       <v-flex xs4 row v-for="(brand,i) in filters.brand">
              <v-checkbox :label="brand.key" @change = "applyfilter" v-model="brands" :value="brand.key"></v-checkbox>
       </v-flex>
      </v-card> -->
      <v-card class="dialogBrand" id="ghghg">
      <v-card-title>
      BRANDS
      </v-card-title>
      <v-container fluid v-bind="{ [`grid-list-4`]: true }">
          <v-layout row wrap>
            <v-flex
              xs4
              v-for="(brand,i) in filters.brand"
              :key= "brand.key" 
            >
            <v-checkbox :label="brand.key" v-model="brands" :value="brand.key"></v-checkbox>
            </v-flex>            
          </v-layout>       
          <hr>
          <div class="btn_section">
            <v-btn color="blue darken-1" flat @click.native="clearbrandfilter">clear</v-btn>
            <v-btn color="blue darken-1" flat @click.native="applyfilter">apply filter</v-btn>          
            <v-btn id="close_brand"@click.native="brand_dialog = !brand_dialog" color="blue darken-1" flat>Close</v-btn>  
          </div>             
        </v-container>
        </v-card>
    </v-dialog>
    </div>
    <div v-if="filters" ></div>
    <v-layout row  class="scroll_pdlist">
          <v-flex id="filter_Panel" md2 lg2 offset-md1 offset-lg1 class="hidden-sm-and-down">
              <div class="filter_container">
              <p class="filterlabel">&#9472&#9472 SORT</p>
              <v-radio-group v-model="sortby" :mandatory="false">
              <v-radio label="Popularity" value="radio-1"></v-radio>
              <v-radio label="Latest" value="radio-2"></v-radio>
              <v-radio label="Price-Low to High" value="radio-1"></v-radio>
              <v-radio label="Price-High to Low" value="radio-2"></v-radio>
            </v-radio-group>
              </div>              
              <div class="filter_container">
              <p class="filterlabel">&#9472&#9472 STYLE</p>
              <div class="maincategory" v-for="styl in filters.style">                                  
                  <v-checkbox :label="styl.key" @change = "applyfilter" v-model="style" :value="styl.key"></v-checkbox>
              </div>
              </div>
              <div class="filter_container brands">               
                <p>BRAND</p>                 
                <div class="clear_brand" v-if="checkBrandlist">
                 <v-icon standard @click.stop ="clearBrands">clear</v-icon>
                </div>
                <div v-if="filters.brand" class="maincategory" v-for="(brand,i) in filters.brand">                 
                    <div v-if="i<5">
                        <v-checkbox :label="brand.key" @change = "applyfilter" v-model="brands" :value="brand.key"></v-checkbox>
                    </div>
                    <div v-if="isShowmore(i,filters.brand)">
                            <a @click="showbrands()"> + {{filters.brand.length - 5}} more </a>
                    </div>
                    <!-- <div v-else>
                        <v-checkbox class="brandfilter hidden" :label="brand.key" v-model="brands" :value="brand.key"></v-checkbox>
                        <div v-if="isShowmore(i,filters.brand)">
                            <a @click="showbrands()"> + {{filters.brand.length - 5}} more </a>
                        </div>
                    </div> -->
                </div>
                <div v-else>
                  <p>No filters</p>
                </div>
              </div>              
              <div class="filter_container">
              <p>COLOUR</p>
              <div class="maincategory" v-for="(color,i) in filters.color">
                  <!-- <div v-if="i<5"> -->  
                      <div class="color_box">
                      <v-checkbox :label="color.key" v-model="colors" :value="color.key"></v-checkbox>  
                      </div>                      
                      <div class="color_box divColor" v-bind:style="{ 'background-color': `${color.key}`,height: '14px',width: '14px','margin-top': '7px', 'position': 'absolute', 'margin-left':'5px'}"></div>
                  <!-- </div> -->
<!--                   <div v-else>
                      <v-checkbox class="colorfilter hidden" :label="color.key" v-model="colors" :value="color.key">                      
                      </v-checkbox>
                       <div v-bind:style="{ 'background-color': `${color.key}`,height: '50px',width: '50px' }"></div>
                      <div v-if="isShowmore(i,filters.color)">
                          <a @click="showcolor()"> + {{filters.color.length - 5}} more </a>
                      </div>
                  </div> -->
              </div>
              </div>
              <div class="filter_container">
              <p>DISCOUNT</p>
              <div class="maincategory" v-for="dist in filters.discountpercent">                  
                  <v-checkbox :label="dist" @change = "applyfilter" v-model="discount" :value="dist"></v-checkbox>
              </div>
              </div>
              <!-- <p>Dress Length</p> -->
              <!-- <p>{{filters.dress_length}}</p> -->
              <!-- <div class="maincategory" v-for="dl in filters.dress_length">                  
                  <v-checkbox :label="dl.key" @change = "applyfilter" v-model="dress_length" :value="dl.key"></v-checkbox>
              </div> -->
              <div class="filter_container">
              <p>PRICE</p>         
              <div class="maincategory" v-for="price in filters.price">
                  <!-- <p>{{price}}</p>                   -->
                  <v-checkbox :label="price" @change = "applyfilter" v-model="listing_price" :value="price"></v-checkbox>
              </div>
              </div>
          </v-flex>
           <v-flex  offset >
                <div class="hidden-sm-and-down top-banner"></div>                
                <v-toolbar id="filter_toolbar" class= "hidden-md-and-up"
                   fixed
                   scroll-off-screen
                   scroll-target="#scrolling-techniques"
                >
                <v-btn primary dark flat  @click.native="openfilters()" class= "filterbtn">REFINE BY</v-btn>
                <v-btn primary dark flat  @click.native="sortby_dialog = true" class= "filterbtn">SORT BY</v-btn>
                </v-toolbar>
                <main>
                <v-layout class="inline" row wrap >
                    <div class="pdlist_comp">
                       <no-ssr>                    
                          <product-list-mob-paged></product-list-mob-paged>
                       </no-ssr>                      
                    </div>    
                    </v-layout>              
                </main>

                    <!-- <div class= "hidden-sm-and-down ">
                        <product-list-page></product-list-page>                      
                    </div> -->
          </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
// import ProductListPage from '../components/product-list-page.vue'
import ProductListMobPaged from '../components/product-list-mob-paged.vue'
import eventHub from '~plugins/event-hub' 
import NoSSR from 'vue-no-ssr'
import Raven from '~plugins/Raven' 
//import vuescroll from 'vue-scroll'
import axios from 'axios'
import { setfilters} from '../utils/filter'

export default {
    // for filters
    asyncData({ store, params}, callback) {
        axios.get('http://apidev.zapyle.com/api/v2/catalogue/filters')
            .then((res) => {
                callback(null, {
                    filters: res.data.data[0]
                })
            })
    },
    data() {
        return {
            filters:{},
            dialog: false,   
            brand_dialog:false,     
            sortby_dialog:false,    
            position:0,
            brands: [],
            category: [],
            colors: [],
            discount:[],
            dress_length:[],
            listing_price:[],
            sleeve_length:[],
            style:[],
            top_length:[],
            dp:true,
            sortby:[],
            filter:false,
            mobile:true
        }
    },
    computed : {
            loadfilter :function(){
            let vm = this
            let cat_query = vm.$nuxt.$route.query.category
            let subcat_query = vm.$nuxt.$route.query.subcat
            // let category = {"category":[cat_query]}
            let url
            url =  'http://apidev.zapyle.com/api/v2/catalogue/filters/'
            // if(subcat_query != undefined){
            //    url =  'http://apidev.zapyle.com/api/v2/catalogue/filters/?applied_filter={"parent_category_name":["'+ cat_query +'"],"category":["'+ subcat_query +'"]}'
            // } else {
            //    url =  'http://apidev.zapyle.com/api/v2/catalogue/filters/?applied_filter={"parent_category_name":["'+ cat_query +'"]}'
            // }
            
            axios.get(url)
            .then((res) => {
               console.log(res.data.data[0])
                console.log(res.data.data[0])
                vm.filters = res.data.data[0]
                vm.filters.price = ''//Object.keys(res.data.data[0].listing_price) 
                vm.filters.discountpercent = ''//Object.keys(res.data.data[0].discount)                
                
            })
          },
          checkBrandlist: function(){
            if(this.brands.length > 0){
              return true
            } else {
              return false
            }
          }
    },
    created() {
          alert('called from pdlist')
          eventHub.$on('updatefiler', this.updatefilter)
    },
    methods: {   
          clearBrands:function(){
            alert("cleared")
            this.brands.length = 0
            this.checkBrandlist
          },       
          updatefilter :function(name){
            let vm = this
            let url =  'http://apidev.zapyle.com/api/v2/catalogue/filters/?applied_filter={"parent_category_name":["'+ name +'"]}'
            axios.get(url)
            .then((res) => {
              console.log(res.data.data[0])

              vm.filters = res.data.data[0]
                
            })
          },
          parentcat : function(data){
          // let v =  data.sub_category_count.buckets.map(function(obj){
          //       return obj.key
          //   }).join('","')
          let v =  data.subcategory.map(function(obj){
              return obj.key
            }).join('","')
          //console.log(v)
          return v
          },
          clearbrandfilter: function(){
            this.brands = []            
          },
          applyfilter : function(){

            let vm = this
            if(this.brand_dialog){
              this.brand_dialog = false
            }

            console.log("applyfilter")
              let filters = { }

              if(this.brands){
                 if(this.brands.length)
                 filters["brand"] = [].concat(this.brands)
              }
              if(this.colors){
                if(this.colors.length)
                filters["color"] = [].concat(this.colors)
              }
              if(this.category){
                if(this.category.length)
                filters["category"] = [].concat(this.category)
              }
              if(this.discount){
                if(this.discount.length)
                filters["discount"] = [].concat(this.discount)
              }
              if(this.dress_length){
                if(this.dress_length.length)
                filters["dress_length"] = [].concat(this.dress_length)
              }
              if(this.listing_price){
                if(this.listing_price.length)

                filters["listing_price"] = [].concat(this.listing_price)
              }
              if(this.sleeve_length){
                if(this.sleeve_length.length)
                filters["sleeve_length"] = [].concat(this.sleeve_length)
              }
              if(this.style){
                if(this.style.length)
                filters["style"] = [].concat(this.style)
              }
              if(this.top_length){
                if(this.top_length.length)
                filters["top_length"] = [].concat(this.top_length)
              }
              
              this.$store.commit('setfilter',filters)
              let byfilter = true
              eventHub.$emit('emitfilter',byfilter)
              this.dialog = false

              setfilters(JSON.stringify(filters))

            },
          
          openfilters(){
          		let vm = this
        	   	let filter = this.$store.getters.getfilter
              if(filter){
                vm.brands = filter.brand
                vm.colors = filter.color
                vm.category = filter.category  
              }
              
		    	console.log("openfilters")
		    	console.log(filter)
         		this.dialog = true
          },
        //for hiding filters greater than 5 in number isShowmore , showcolor
        isShowmore(count, objArr) {
            if (count + 1 === objArr.length) {
                return true
            } else {
                return false
            }
        },
        showcolor() {
            let elArr = document.getElementsByClassName("colorfilter")
            for (let i = 0; i < elArr.length; i++) {
                if (elArr[i].classList.contains("hidden")) {
                    elArr[i].classList.remove('hidden')
                } else {
                    elArr[i].classList.add('hidden')
                }
            }
        },
        showbrands() {
            let parent =  document.getElementById('ghghg').parentNode
            console.log(parent)
            this.brand_dialog = true
            // var el = document.getElementsByClassName('overlay')
            // if (el[0].classList.contains("hidden")) {
            //         el[0].classList.remove('hidden')
            //     } else {
            //         el[0].classList.add('hidden')
            //     }
            // el[0].classList.remove("overlay--active")
        }
    },
    created(){
          // let pos = window.localStorage.scrollY
          // console.log("pos from close dialog" + pos)
          // window.scrollTo(0,pos)
    },
    // layout:['search'],
    components: { 
    	productListMobPaged : ProductListMobPaged,    	
    	'no-ssr': NoSSR },
    scrollToTop: true,
    middleware: ['infinitscroll', 'authlogin','filter']

}
</script>

<style>
/*  .scrollparent{
    max-height: 100%;
    overflow: hidden;
  }
  .scroll{
    max-height: 99%;
    overflow-y: scroll
  }*/
  .subCat .checkbox{
    margin-left: 25px;
  }
  .maincategory .color_box{
    display: inline-flex;
  }
  .maincategory .checkbox{
    /*margin-left: 25px;*/    
    margin: 0px !important;
  }
  .faded {
    /*background-color: grey;*/
    /*opacity: 0.8;*/
  }
  .inline {
    /*display: inline-flex;*/
  }
  .maincategory .input-group__details{
    display: none;
  }
  .hidden{
    display: none !important;
  }
  .filterbtn {
    /*margin-bottom: 20%;*/
    /*position: fixed !important;*/
  }
  .sortbtn {
    margin-bottom: 40%;
    position: fixed !important;
  }
  .overlay--active{
    display: none;
  }
  .fixed{
    position: fixed;
  }
  .filterlabel{
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: 1px;
    text-align: left;
    color: #47525f;
  }
  .top-banner {
  margin: auto;
  width: 780px;
  height: 260px;
  background-color: #e65b72;
  margin-bottom: 90Px !important;
}
.filter_container{
  height: auto;
  padding-bottom: 20px;
  padding-top: 10px;
  border-bottom: 1px solid #eaebf0;
  border-top: 1px solid #eaebf0;
/*  overflow-y: scroll;
  overflow-x: hidden;*/
}

/*@media only screen and (min-width: 1024px){
    .pdlist_comp{
    width: 780px;
    margin: auto;
  }
}*/
  
/* .color_box.divColor {
    background-color: black;
    height: 14px;
    margin-bottom: 8px;
    margin-left: 3px;
    width: 14px;
 } */
.dialogBrand {
  padding: 10px;
}
.dialogBrand .input-group{
 margin: 0px; 
}
.dialogBrand .card__title{
  background-color:  #eaebf0;
}
.btn_section #close_brand{
  clear: both;
}
.btn_section{
  float: right;
  margin-top: 10px;
}
#filter_toolbar{
  margin-top: 62px;
  box-shadow: none;
  display:block;
  transition: all .2s ease-out;
}

.dialogBrand{
    /*margin-left: -10%;*/
    /*margin-top: 5%;*/
}
.input-group {
  margin: 0px !important;
}
.color_box > div > label {
  margin-left: 50px;
}
.filter_container > p{
  display: inline-block;
  margin-right: 20px;
}
.clear_brand  {
  display: inline-block;
}

</style>
