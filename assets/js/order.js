class Order {
    constructor(cart, form) {
        this.cart = cart
        this.form = document.querySelector(form)

        if (this.cart.countProducts() > 0) {
            //console.log('let '+form+'display on');
            this.form.style.display = 'block';
            let button = this.form.getElementById('validateButton')
            button.addEventListener('click', (event) => {
            event.preventDefault()
            document.getElementById('contactInformationFieldsId').style.display = 'block'
        })
        }
    }
}