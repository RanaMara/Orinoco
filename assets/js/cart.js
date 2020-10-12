class Cart {
    constructor(wrapper) {
        this.wrapper = document.querySelector(wrapper)
        this.products = [];
        this.getFromLocalStorage();
        this.totalPrice = 0 ;
    }

    getFromLocalStorage() {
        let products = null;
        try {
            products = JSON.parse(localStorage.getItem('products'));
        } catch (e) {
            console.log(e)
        }
        if (products) {
            this.products = products 
            this.updateCounter()
        }
    }

    // save the array of products in local storage
    saveToLocalStorage() {
        localStorage.setItem('products', JSON.stringify(this.products))
    }

    updateCounter() {
        let counter = document.querySelector('.cart-counter');
        counter.innerText = this.countProducts();
    }

    countProducts() {
        return this.products.length
    }


    // function for adding product to the cart
    addProduct(product) {
        this.products.push([product._id ,product.name  , product.imageUrl , product.price])
        this.saveToLocalStorage()
        this.updateCounter()
        this.displayTest()
    }

    // function for calculating the total price of the products
    setTotalPrice(){
        let totalPrice = this.totalPrice 
        this.products.forEach(
            product=>{
                totalPrice = totalPrice + product[3]
            }
        );
        this.totalPrice = Math.ceil(totalPrice/100) 
        this.wrapper.querySelector('.total-price').innerText = 'Prix total : '+this.totalPrice + '€';
    }

    displayTest(){
        this.products.pop();
        console.table(this.products);
    }

    // function that return boolean value if the product is already in the cart or no 
    hasProduct(product_id) {
        let productAlreadyExist = false
        this.products.forEach(
            product=>{
                if( product[0] == product_id ){
                    productAlreadyExist = true // the product is already in the cart
                }   
            }
        );
        return productAlreadyExist 
    }

    displayProducts(wrapper) {
        let orderContainer = document.querySelector(wrapper);
        this.setTotalPrice()
        if (this.products.length > 0) {
            orderContainer.querySelector('.alert').style.display = 'none';
            this.products.forEach(product => {
                try{
                    this.displayProductIn(wrapper, product)
                }
                catch(error){
                    console.log(error)
                }
            })
        } 
        else {
            orderContainer.querySelector('.alert').style.display = 'block';
        }
    }

    displayProductIn(wrapper, product) {
        document.getElementById('validateButton').style.display = 'block'
        const tableContainer = document.querySelector(wrapper);
        const table = tableContainer.querySelector('.table-body') ;
        const order = table.insertRow(-1);  // add the all product to the end of the cart
        const orderId = order.insertCell(0);
        const orderName = order.insertCell(1);
        const orderImage = order.insertCell(2);
        const deleteOrderbtn = order.insertCell(3);
        const orderPrice = order.insertCell(4);

       orderId.innerText = product[0];
       orderName.innerText = product[1];

       //create an element image for showing the image of product 
       let img = document.createElement('img')

       //set the attributes of the image
       img.setAttribute('src',product[2])
       img.setAttribute('alt',product[1])
       img.setAttribute("width", "50");
       img.setAttribute("height", "40");

        //add the img to the table 
        orderImage.appendChild(img);

        // add delete button
        let btn = document.createElement('button')

        btn.setAttribute('type','button')
        btn.setAttribute('class','btn btn-outline-info')
        btn.innerText = 'supprimer'
        btn.addEventListener('click', (event) => {
            event.preventDefault()
            btn.parentElement.parentElement.remove() // remove the row of the product from the cart
            this.deleteOrder(product[0],wrapper)
            this.updateTotalPrice(product[3])
        });

        // add the button to the table
        deleteOrderbtn.appendChild(btn)
        orderPrice.innerText = Math.ceil(product[3]/100) + " €";
    }

    /** show the contact information fields */
    contactInformation(){
        document.getElementById("contactInformationFieldsId").style.display = 'block';
    }

    deleteOrder(orderId,wrapper){
       for (let i=0 ; i<this.products.length ; i++){  
           if (this.products[i][0] == orderId){
                this.products.splice(i,1)
                this.saveToLocalStorage()
                this.updateCounter()
            } 
}
    }

    updateTotalPrice(price){
        this.totalPrice = this.totalPrice - Math.ceil(price/100);
        this.showTotalPrice('.total-price');

    }

    showTotalPrice(priceWrapper){
        console.log('totalPrice = '+this.totalPrice)
        this.wrapper.querySelector(priceWrapper).innerText = 'Prix total : '+this.totalPrice + '€';
    }
}


 