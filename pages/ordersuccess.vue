<template>
	<main>
		<h3>order placed successfully</h3>
		<h4>order number is {{ordernumber}}</h4>
	</main>
</template>
<script>
export default {
	data(){
		return {
			ordernumber:null
		}
	},
	created(){
		let vm = this
		vm.ordernumber = vm.$store.state.ordernumber
	}
}
</script>
