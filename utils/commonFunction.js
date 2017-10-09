

export const alertfun = (token) => {
  
  alert(token)
  console.log(token)
 
}

export const  inc = (sizearr) => {

            if (this.productSize == null) {
                alert('select size first')
                return
            }
            let quantity_available = sizearr.map(function(obj) {
                if (obj.product_variation_id == 8772)
                    return obj.quantity
            })

            if (this.quantity == quantity_available[0]) {
                alert("No more products available")
            } else {
                this.quantity = this.quantity + 1
            }
            //return  this.quantity++
        }
export const  dec = (sizearr) => {
            if (this.productSize == null) {
                alert('select size first')
                return
            }
            if (this.quantity > 1) {
                this.quantity = this.quantity - 1
            } else {
                alert('min anount in cart')
            }

            //return  this.quantity--
        }
