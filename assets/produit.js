class produit{
    constructor(id, name ,price, description, imageUrl, personnalisation){
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.personnalisation = personnalisation;
    }
}

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log('Path ===== '+ window.location.pathname);
    }
    else{
        console.log("Error");
    }
};
request.open("GET", "/api/teddies");
request.send();

/**
 * class produit{
    constructor(id, name ,price, description, imageUrl, personnalisation){
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.personnalisation = personnalisation;
    }
}

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log('Path ===== '+ window.location.pathname);
    }
    else{
        console.log("Error");
    }
};
request.open("GET", "/api/teddies");
request.send();
 */