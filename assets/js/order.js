class Order {
    constructor(cart, form) {
        this.cart = cart
        this.form = document.querySelector(form)
        if (this.cart.countProducts() > 0) {
            this.form.style.display = 'block';
            let button = document.getElementById('validateButton')
            button.addEventListener('click', (event) => {
            event.preventDefault()
            document.getElementById('contactInformationFieldsId').style.display = 'block'
        })
        }


    }
}