class Cart {
    constructor(wrapper) {
        this.wrapper = document.querySelector(wrapper)
        this.products = [];
        this.getFromLocalStorage();
        this.totalPrice =0 ;
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

    addProduct(product) {
        let product_id = product._id;
        console.log('add product function '+ product_id);
        this.products.push([product_id ,product.name  , product.imageUrl , product.price])
        this.saveToLocalStorage()
        this.updateCounter()
        this.displayTest()
        this.setTotalPrice()

        
       // this.insertIntoCart(product)
    }

    setTotalPrice(){
        this.products.forEach(
            product=>{
                this.totalPrice = this.totalPrice + product[3]
            }
        );
        this.totalPrice = Math.ceil(this.totalPrice/100)
        console.log('total price is '+this.totalPrice);
        console.log( 'name ====' +this.wrapper.querySelector('.total-price'))
        this.wrapper.querySelector('.total-price').innerText = 'Prix total : '+this.totalPrice + '€';
    }

    displayTest(){
        this.products.pop();
        console.table(this.products);
    }

    hasProduct(product_id) {
        let productAlreadyExist = false
        console.log('product_id = '+product_id)
        console.log("========")
        this.products.forEach(
            product=>{
                console.log('product[0] = '+product[0])
                if( product[0] == product_id ){
                    console.log('yes ===== true')
                    productAlreadyExist = true
                }   
            }
        );
        console.log('non ======false')
        return productAlreadyExist // the product is already in the cart
    }

    displayProducts(wrapper) {
        let orderContainer = document.querySelector(wrapper);
        if (this.products.length > 0) {
            
            orderContainer.querySelector('.alert').style.display = 'none';
            this.products.forEach(product => {
                try{
                    console.log("HHHHHIIII"+product[1]);
                    this.displayProductIn(wrapper, product)
                }
                catch(error){
                    console.log(error)
                }
            })
        } else {
            orderContainer.querySelector('.alert').style.display = 'block';
        }
    }

    displayProductIn(wrapper, product) {
        document.getElementById('validateButton').style.display = 'block'
        const tableContainer = document.querySelector(wrapper);
       const table = tableContainer.querySelector('.table-body') ;
         
        //const element = document.createElement('tr')
        // afficher la colonne nom
        // afficher la colonne prix
        // afficher un bouton supprimer du panier (facultatif)

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
            console.log('from delete function '+product[0])
            console.log('wrapper = '+wrapper)
           this.deleteOrder(product[0],wrapper)
        });

        // add the button to the table
        deleteOrderbtn.appendChild(btn)


       orderPrice.innerText = Math.ceil(product[3]/100) + " €";

        // const deleteButton = document.createElement('button');


        //deleteOrderbtn.appendChild(deleteButton);
    }

  //  insertIntoCart(product){
    //    const tableContainer = document.querySelector('.order-table');
      //  const table = tableContainer.querySelector('.table-body') ;
        //console.log(product.name)
    //}
    /** show the contact information fields */
contactInformation(){
    document.getElementById("contactInformationFieldsId").style.display = 'block';
    }

    deleteOrder(orderId,wrapper){
        for (let i=0 ; this.products.length ; i++){
            if (this.products[i][0] == orderId){
                this.products.splice(i,1)
                this.saveToLocalStorage()
                this.updateCounter()

                //this.displayProducts(wrapper)
            }
        }


    }
}


 