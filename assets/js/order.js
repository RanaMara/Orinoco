class Order {
    constructor(cart, form , contact){
        this.cart = cart
        this.contact = contact
        this.products = this.getProducts()
        this.form = document.querySelector(form)
        this.getFromLocalStorage()
        this. showUserInformationFields()  
    }

    // make the user information block display 
    showUserInformationFields(){
        if (this.cart.countProducts() > 0 & window.location.href == "http://localhost:3000/cart"){
            this.form.style.display = 'block'
            let button = document.getElementById('validateButton')
            button.addEventListener('click', (event) => {
                event.preventDefault()
                document.getElementById('contactInformationFieldsId').style.display = 'block'
                this.bindConfirmOrder()
            })
        }
    }

    //bind confirm order button
    bindConfirmOrder(){
        const form = document.querySelector('.submit')
        let url = "/confirmation"
        if(this.cart.countProducts() > 0){
            form.addEventListener('submit', (event) => {
                event.preventDefault()
                this.contact.getContactInformation() 
                this.fetchOrder()
                    .then(response => {
                        window.location.href = url 
                    })
                    .catch(error => {
                        alert("Impossible d'enregistrer la commander")
                    })
            })
        }
    }

    // send the request to the server
   fetchOrder(){
        let contact = this.contact 
        let products = this.products 
        let data = { contact , products}
        return new Promise((resolve, reject) => {
            fetch('/api/teddies/order',{
                method: 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(data)
            }).then(function(response) {
                return response.json()
            }).then(function(json) {
                localStorage.setItem('orderId', JSON.stringify(json.orderId))
                resolve(json)
            }).catch(function(error){
                reject(error)
            })
        })
    }

    // get the orderId from the local storage
    getFromLocalStorage() {
        let orderId = null
        try {
            orderId = JSON.parse(localStorage.getItem('orderId'))
        } catch (e) {
            console.log(e)
        }
        if(orderId ){
            return orderId
        }
    }

   // get the productId of all the products     
    getProducts(){
        let products = []
        for (let i=0 ; i< this.cart.productsDetails.length ; i++){
            products.push(this.cart.productsDetails[i][0])
        }
        return products
    }

    // confirm the order and return the orderId 
    confirmOrder(){
        let orderId = this.getFromLocalStorage()
        document.getElementById("totalPrice").innerText = "le prix total  est : " + this.cart.totalPrice + " €"
        document.getElementById("orderId").innerText = "l'identifiant de votre commande est : " + orderId
        this.cart.clearCart()
        localStorage.clear()
    }
}