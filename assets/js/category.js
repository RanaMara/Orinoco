class Category {
    constructor(category, wrapper) {
        this.category = category;
        this.wrapper = document.querySelector(wrapper);
        this.url = '/api/'+this.category;
        this.fetchProducts();
    }

    fetchProducts() {
      fetch(this.url)
      .then(response => response.json())
      .then(data => this.insertAllProduct(data))
      .catch(error => {
        this.showError()
       })
    }

    insertAllProduct(products){
        products.forEach(item => {
            this.insertProduct(item);
        })
    }
   
    // insert the product to the home.html
    insertProduct(product) {
        const parentElement = document.createElement('div');
        const element = document.createElement('div');
        const framework = document.createElement('a');
        const img = document.createElement('img');
        const title = document.createElement('h5');
        const price = document.createElement('span');

        parentElement.setAttribute('class','cal cal-12 cal-md-6 cal-lg-4 ml-4')

        //add the attributes of the element
        element.setAttribute('class','card m-3');

        // add the attributes of the framework
        framework.href = '/product/'+product._id;
        framework.style.textDecoration = "none";
        framework.style.color = "black";

        // add the attributes of the image
        img.setAttribute("src",product.imageUrl);
        img.setAttribute("alt",product.name);
       // img.setAttribute('class','img-thumbnail')
        img.setAttribute("width", "254");
        img.setAttribute("height", "178");

        // add the attributes of the title
        title.innerText = product.name;
        title.setAttribute('class','text-center');

        //add the attributes of the price
        price.innerText = Math.ceil(product.price/100) + " € ";
        price.setAttribute('class','text-center');

        // add the parentElement to the wrapper
        this.wrapper.appendChild(parentElement);

        parentElement.appendChild(element)

        element.appendChild(framework);
        element.appendChild(price);

        framework.appendChild(img);
        framework.appendChild(title);
    }

    showError() {
       this.wrapper.querySelector('.alert').display = "block";
    }
}
