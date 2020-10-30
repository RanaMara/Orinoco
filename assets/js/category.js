class Category {
    constructor(category, wrapper){
        this.category = category
        this.wrapper = document.querySelector(wrapper)
        this.url = '/api/'+this.category
        this.fetchProducts()
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
            this.insertProduct(item)
        })
    }
   
    // insert the product to the home.html
    insertProduct(product) {
        const parentElement = document.createElement('div')
        const framework = document.createElement('a')
        const cardElement = document.createElement('div')
        const img = document.createElement('img')
        const cardBodyElement = document.createElement('div')
        const title = document.createElement('h5')
        const price = document.createElement('p')

        parentElement.setAttribute('class','cal cal-12 cal-md-6 cal-lg-4 ml-4')

        // add the attributes of the framework
        framework.href = '/product/'+product._id
        framework.style.textDecoration = "none"
        framework.style.color = "black"

        //add the attributes of the element
        cardElement.setAttribute('class','card m-3')

        // add the attributes of the image
        img.setAttribute("src",product.imageUrl)
        img.setAttribute("alt",product.name)
        //img.setAttribute('class','card-img-top')
        img.setAttribute("width", "254")
        img.setAttribute("height", "178")

        cardBodyElement.setAttribute('class','card-body')

        // add the attributes of the title
        title.innerText = product.name
        title.setAttribute('class','card-text text-center')

        //add the attributes of the price
        price.innerText = Math.ceil(product.price/100) + " € "
        price.setAttribute('class','card-text text-center')

        // add the parentElement to the wrapper
        this.wrapper.appendChild(parentElement)
        parentElement.appendChild(framework)
        framework.appendChild(cardElement)
        cardElement.appendChild(img)
        cardElement.appendChild(cardBodyElement)
        cardBodyElement.appendChild(title)
        cardBodyElement.appendChild(price)
       
    }

    showError() {
       this.wrapper.querySelector('.alert').display = "block"
    }
}
