class Contact{
    constructor() {
        this.firstName
        this.lastName
        this.address
        this.city
        this.email
    }

    // get the values from the fields form 
    getContactInformation(){
        this.firstName = document.querySelector('#inputFirstName').value 
        this.lastName = document.querySelector('#inputLastName').value 
        this.address = document.querySelector('#inputAddress').value 
        this.city = document.querySelector('#inputCity').value 
        this.email = document.querySelector('#inputEmail').value 
    }
}