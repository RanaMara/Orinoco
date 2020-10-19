class Contact{
    constructor(wrapper,totalPrice) {
        this.wrapper = document.querySelector(wrapper)
        this.cart = cart
        this.firstName
        this.lastName
        this.address
        this.city
        this.emailAddress
       // this.getContactInformation();
    }

    getContactInformation(){
        let wrapper = this.wrapper 
        this.firstName = wrapper.querySelector('#inputFirstName').value 
        this.lastName = wrapper.querySelector('#inputLastName').value 
        this.address = wrapper.querySelector('#inputAddress').value 
        this.city = wrapper.querySelector('#inputCity').value 
        this.emailAddress = wrapper.querySelector('#inputEmail').value 
        console.log('button binded')
        /**
         * wrapper.addEventListener('submit',function(e){
            e.preventDefault();
            try{
                
               // this.fetchOrder()
            }
            catch(error){
                console.log(error)
            }
            console.log('2---- '+this.firstName)
            console.log('2---- '+this.emailAddress)
           console.log('total price'+cart.totalPrice)
            console.table(cart.productsDetails)
        })   
        return true
         */
    }
}