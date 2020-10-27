class Cart {
    constructor(wrapper) {
        this.wrapper = document.querySelector(wrapper)
        this.productsDetails = [];
        this.getFromLocalStorage();
        this.totalPrice = this.calculateTotalPrice();
    }

    // get the value of products from the localStorage
    getFromLocalStorage() {
        let products = null;
        try {
            products = JSON.parse(localStorage.getItem('products'));
        } catch (e) {
            console.log(e)
        }
        if (products) {
            this.productsDetails = products 
            this.updateCounter()
        }
    }

    // save the array of products in local storage
    saveToLocalStorage() {
        localStorage.setItem('products', JSON.stringify(this.productsDetails))
    }

    // update the value of counter 
    updateCounter() {
        let counter = document.querySelector('.cart-counter');
        counter.innerText = this.countProducts();
    }

    // return the number of products in the cart
    countProducts() {
        return this.productsDetails.length
    }


    // function for adding product to the cart
    addProduct(product) {
        this.productsDetails.push([product._id ,product.name  , product.imageUrl , product.price])
        this.saveToLocalStorage()
        this.updateCounter()
    }

    // function for calculating the total price of the products
    setTotalPrice(){
        this.wrapper.querySelector('.total-price').innerText = 'Prix total : '+this.totalPrice + '€';
    }

    // function that return boolean value if the product is already in the cart or no 
    hasProduct(product_id) {
        let productAlreadyExist = false
        this.productsDetails.forEach(
            product=>{
                if( product[0] == product_id ){
                    productAlreadyExist = true // the product is already in the cart
                }   
            }
        );
        return productAlreadyExist 
    }

    //for displaying the content of cart 
    displayProducts(wrapper) {
        let orderContainer = document.querySelector(wrapper);
        this.setTotalPrice()
        if (this.productsDetails.length > 0) {
            orderContainer.querySelector('.alert').style.display = 'none';
            this.productsDetails.forEach(product => {
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

    // display each product in the cart
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
       //img.setAttribute('class','.img-thumbnail img-fluid')

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
           this.ckeckEmptyCart(this.totalPrice)
        });

        // add the button to the table
        deleteOrderbtn.appendChild(btn)
        orderPrice.innerText = Math.ceil(product[3]/100) + " €";
    }

    // for verify if the cart is empty so don't show my the empty order table 
    ckeckEmptyCart(totalPrice){
        if(totalPrice == 0){
            document.getElementById('alertId').style.display = 'block'
            document.getElementById('orderTableId').style.display = 'none'
            document.getElementById('contactInformationFieldsId').style.display = 'none'
            
        }

    }
    /** show the contact information fields */
    contactInformation(){
        document.getElementById("contactInformationFieldsId").style.display = 'block';
    }

    deleteOrder(orderId,wrapper){
       for (let i=0 ; i<this.productsDetails.length ; i++){  
           if (this.productsDetails[i][0] == orderId){
                this.productsDetails.splice(i,1)
                this.saveToLocalStorage()
                this.updateCounter()
            } 
}
    }

    updateTotalPrice(price){
        this.totalPrice = this.totalPrice - Math.ceil(price/100);
        this.showTotalPrice('.total-price');

    }

    calculateTotalPrice(){
        let totalPrice = 0;
        for (let i=0 ; i<this.productsDetails.length ; i++){ 
            totalPrice = totalPrice + this.productsDetails[i][3]
        }
        totalPrice =Math.ceil(totalPrice/100);
        return totalPrice;
    }

    showTotalPrice(priceWrapper){
        this.wrapper.querySelector(priceWrapper).innerText = 'Prix total : '+this.totalPrice + '€';
    }

    clearCart(){
        this.productsDetails = [];
        this.totalPrice = 0;
        this.updateCounter()

    }
}


 