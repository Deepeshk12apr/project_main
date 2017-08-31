<template>
	<main>
		<div class="rectangle-15">
			<div class="body-2" dark>Delivery info</div>
			<div>
				<v-btn dark class="nxt">Next</v-btn>
			</div>
		</div>
	<v-text-field label="Enter Name"
       single-line
       append-icon="email"
       v-model="name"
     ></v-text-field>
     	<v-text-field label="Enter Pincode"
       single-line
       append-icon="email"
       v-model="email"
     ></v-text-field>
     	<v-text-field label="Enter City"
       single-line
       append-icon="email"
       v-model="email"
     ></v-text-field>
     	<v-text-field label="Enter State"
       single-line
       append-icon="email"
       v-model="email"
     ></v-text-field>	<v-text-field label="Enter address"
       multi-line
       append-icon="email"
       v-model="email"
     ></v-text-field>
     	<v-text-field label="Enter mobile number"
       single-line
       append-icon="email"
       v-model="email"
     ></v-text-field><br>
     	<nuxt-link to="/checkout">
		<v-btn class="green" block secondary >Next</v-btn><br><br>
	</nuxt-link>
	</main>
</template>
<script>
	
</script>
<style>
	.rectangle-15 {	
		height: 50px; 
		border: 1px solid #979797;	
		background-color: #000000;
		margin-bottom: 50px;
		width: 80%;
	}
	.rectangle-15 div {
		color: wheat;
    	padding: 10px;
    	display: inline;
	}
	.nxt{
		left:80%;
	}
</style>