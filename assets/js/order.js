class Order {
    constructor(cart, form , contact) {
        this.cart = cart
        this.contact = contact
        this.products = this.getProducts()
        this.form = document.querySelector(form)
        if (this.cart.countProducts() > 0) {
            this.form.style.display = 'block';
            let button = document.getElementById('validateButton')
            button.addEventListener('click', (event) => {
            event.preventDefault()
            document.getElementById('contactInformationFieldsId').style.display = 'block'
            this.bindConfirmOrder()
        })
        }
    }

    bindConfirmOrder(){
        const button = document.querySelector('.submit')
        if(this.cart.countProducts() > 0){
            button.addEventListener('submit', (event) => {
                event.preventDefault()
                this.contact.getContactInformation() 
                this.fetchOrder()    
            })
        }
    }

    /**
     * fetchOrder(){
        const data = { username: 'example' };
        fetch('https://example.com/profile', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
            console.log('Success:', data);
            })
            .catch((error) => {
            console.error('Error:', error);
            });
        }
     */

        fetchOrder(){
            let contact = this.contact 
            let products = this.products
            let data = { contact , products}
           fetch('/confirmation',{
                method: 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                } ,
                body : JSON.stringify(data)
            }).then(function(response){
                console.log(response.json())
            }).catch(function(error){
                console.log(error)
            })
        }
        
        getProducts(){
            let products = []
            for (let i=0 ; i< this.cart.productsDetails.length ; i++)
            {
                products.push(this.cart.productsDetails[i][0])
            }
            return products
        }
    }