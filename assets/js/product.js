class Product {
    constructor(id, wrapper, cart) {
        this.id = id
        this.wrapper = document.querySelector(wrapper)
        this.cart = cart
        this.product = null
        this.url = '/api/teddies/'+this.id
        this.fetchProduct()
    }

    fetchProduct() {
        fetch(this.url)
            .then(response => response.json())
            .then(response => {
                this.product = response
                let title = document.querySelector('title')  
                title.innerText = title.innerText + this.product.name
                try{
                    this.insertProduct()
                }
                catch(error){
                    console.log(error)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    //insert the product to the product.html 
    insertProduct() {
        this.wrapper.querySelector('.image').src =  this.product.imageUrl
        this.wrapper.querySelector('.name').innerText = this.product.name
        this.wrapper.querySelector('.price').innerText = Math.ceil((this.product.price )/100) + '€'
        this.wrapper.querySelector('.description').innerText = this.product.description
        this.product.colors.forEach(element => {
            let option = document.createElement('option')
            option.innerText = element
            document.getElementById('itemPersonnalisationId').appendChild(option)
        })
        this.bindAddToCart()
    }

    // check if the product is already in the cart or not
    bindAddToCart() {
        const button = this.wrapper.querySelector('.add-to-cart')
        if (this.cart.hasProduct(this.id)) {
            button.disabled =  true
            button.innerText = "Ce produit est dans votre panier"
        } 
        else {
            button.addEventListener('click', (event) => {
                event.preventDefault()
                this.cart.addProduct(this.product) 
                button.disabled =  true
                button.innerText = "Ce produit est dans votre panier" // to prevent adding the product to the cart again   
            })
        }
    }
}