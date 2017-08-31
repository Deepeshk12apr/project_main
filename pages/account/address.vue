<template>
<main>
	<div class='rectangle-15'>
		<nuxt-link to="/account/myaccount">
		<v-icon dark>home</v-icon>
		</nuxt-link>
		<p>address</p>
	</div>
	<v-expansion-panel expand>
    <v-expansion-panel-content v-for="(item,i) in 2" :key="i" v-bind:value="item === 2">
      <div slot="header">Address {{i+1}}</div>
      <v-card>
	      {{$nuxt.$route.name}}
        <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa	t.</v-card-text>
      </v-card>
    </v-expansion-panel-content>
    </v-expansion-panel>
    <v-list class="add">
        <v-list-tile 
          v-for="(item, i) in 1"
          :key="i"
        >
          <v-list-tile-content>
            <v-list-tile-title>Add new address</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon v-html="bubble_chart"></v-icon>
          </v-list-tile-action>
          </v-list-tile>
   </v-list>
 </main>
</template>

<style>
	.rectangle-15 {	
		height: 40px; 
		border: 1px solid #979797;	
		background-color: #000000;
		margin-bottom: 50px;
	}
	.rectangle-15 p{
		color: #ffffff;
		display: inline;
		margin-left: 40%;
		font-size: 24px;
		vertical-align: middle;
	}
	.rectangle-15 i{
		padding-left: 10px;
	}
	.add{
		margin-top: 50px;
	}
</style>