var carts = document.getElementById("cartCounterID").innerHTML;
console.log("carts = "+carts);

var teddiesIsFetch = false;
var camerasIsFetch = false;
var furnitureIsFetch = false;
var selectProduct;

function allMenuOff(){
    document.getElementById("teddies").style.display = "none";
    document.getElementById("cameras").style.display = "none";
    document.getElementById("furniture").style.display = "none";
    document.getElementById("logoId").style.display = "none";
    document.getElementById("miniLogoId").style.display = "block";
}


/** Returns an array of all elements */
function fetchProduct(typeOfProduct){
    fetch('/api/'+typeOfProduct)
    .then(response => response.json())
    .then(data => insertProduct(data,typeOfProduct)); 
}

/** Returns the element corresponding to given_id identifier */
function fetchItem(typeOfProduct, selectedItemId){
    console.log('typeOfProduct = =  = = '+typeOfProduct+', '+selectedItemId);
    /**../images/teddy_1.jpg

    fetch('/api/'+typeOfProduct+'/:_'+selectedItemId)
    .then(response => response.json())
    .then(data => insertItem(data,typeOfProduct));   
 */
}

function fetchOrder(){
    fetch()
    .then(response => response.json())
    .then(data => insertItem(data,typeOfProduct));  
}


/** create a dynamic list view page , showing all items available for sale  */
function insertProduct(products,typeOfProduct){
    for(var i=0; i<products.length ; i++){
        var itemCard = document.createElement('div');
        itemCard.setAttribute('class','card m-3');
        itemCard.setAttribute('id',typeOfProduct+'itemCard'+i);
        document.getElementById(typeOfProduct).appendChild(itemCard);
        var itemCardBody = document.createElement('div');
        itemCardBody.setAttribute('class','card-body');
        itemCardBody.setAttribute('id',typeOfProduct+'itemCardBody'+i);
        document.getElementById(typeOfProduct+'itemCard'+i).appendChild(itemCardBody);
        var product = document.createElement('a');
        product.setAttribute("class","card-title");
        product.setAttribute("id",typeOfProduct+"product"+i);
        product.setAttribute("href","/produit/"+products[i]._id);
        document.getElementById(typeOfProduct+'itemCardBody'+i).appendChild(product);
        var productImage = document.createElement('IMG');
        productImage.setAttribute("src",products[i].imageUrl);
        console.log("selectProduct === "+selectProduct);
        console.log('URL =  /api/'+selectProduct+'/:_'+products[i]._id );
        //productImage.setAttribute("onclick","fetchItem("+selectProduct+","+products[i]._id +")");
       productImage.setAttribute("onclick",fetchItem(selectProduct,products[i]._id ));
        /**
         * productImage.onclick = function(){
            fetchItem(selectProduct,products[i]._id )
        };
         */
        productImage.setAttribute("width", "254");
        productImage.setAttribute("height", "178");
        productImage.setAttribute("alt", typeOfProduct);
        document.getElementById(typeOfProduct+"product"+i).appendChild(productImage);
        var productName = document.createElement('h5');
        productName.setAttribute('class','text-center');
        productName.innerHTML = products[i].name;
        document.getElementById(typeOfProduct+'itemCard'+i).appendChild(productName);
        var productPrice = document.createElement('h6');
        productPrice.setAttribute('class','text-center');
        productPrice.innerHTML = products[i].price;
        document.getElementById(typeOfProduct+'itemCard'+i).appendChild(productPrice);
    }  
}

/**display dynamically the item selected by the user and allow to personalize the product and add it to basket */
function insertItem(data,typeOfProduct){
    console.log('this is th values '  + typeOfProduct);  
    /**
    if(typeOfProduct == "teddies"){
        document.getElementById("personalizationId").innerHTML = "Choisissez la couleur";
        for (var i = 0 ; i< data.colors.length ; i++){
        var personalizationItem = createElement("option");
        personalizationItem.innerHTML = data.colors[i];
        document.getElementById('itemPersonnalisationId').appendChild(personalizationItem);
        }
    }
    else if (typeOfProduct == "cameras"){
        document.getElementById("personalizationId").innerHTML = "Sélectionnez les lentilles";
        for (var i = 0 ; i< data.lenses.length ; i++){
        var personalizationItem = createElement("option");
        personalizationItem.innerHTML = data.lenses[i];
        document.getElementById('itemPersonnalisationId').appendChild(personalizationItem);
        }
    }
    else if(typeOfProduct == "furniture"){
        document.getElementById("personalizationId").innerHTML = "Sélectionnez le vernis";
          for (var i = 0 ; i< data.varnish.length ; i++){
        var personalizationItem = createElement("option");
        personalizationItem.innerHTML = data.varnish[i];
        document.getElementById('itemPersonnalisationId').appendChild(personalizationItem);
    }
    } 
    document.getElementById("selectedItemId").setAttribute("src",data.imageUrl);
    document.getElementById("itemName").innerHTML = data.name;
    document.getElementById("itemPrice").innerHTML = data.price;
    document.getElementById("itemDescription").innerHTML = data.description;
     */
}
 


/**
 * if(window.location.pathname == "/produit/ours"){
    fetchProduct("teddies");
 */

function teddiesMenu(){
    selectProduct = "teddies";
    if(!teddiesIsFetch){
        fetchProduct("teddies");
        teddiesIsFetch = true;
    }
    allMenuOff();
    document.getElementById("teddies").style.display = "flex";
}

function camerasMenu(){
    selectProduct = "cameras";
    if(!camerasIsFetch){
        fetchProduct("cameras");
        camerasIsFetch = true;
    }
    allMenuOff();
    document.getElementById("cameras").style.display = "flex";  
}

function furnituresMenu(){
    selectProduct = "furniture";
    if(!furnitureIsFetch){
        fetchProduct("furniture");
        furnitureIsFetch = true;
    }
    allMenuOff();
    document.getElementById("furniture").style.display = "flex";
}

function selectProduct(){
    console.log('id = ');

}
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
/** show the contact information fields */
function contactInformation(){
document.getElementById("contactInformationFieldsId").style.display = 'block';
}

/*  order Confirmation */
function orderConfirmation(){
    document.getElementById("testConfimation").innerHTML = ""+"Confirmation";
}


function addToCarts(){
    carts ++;
    document.getElementById("cartCounterID").innerHTML = carts;
    console.log('Il y a ' +carts+ ' article dans mon panier');

}

function teddiesMenuOn(){
    allMenuOff();
    document.getElementById("teddies").style.display = "flex";


}