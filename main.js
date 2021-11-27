let carts=document.querySelectorAll('.add-cart');
let products=[
    {
        name:"iphone",
        tag:"iphone",
        price:800,
        inCart:0
    },
    {
        name:"HP laptop",
        tag:"laptop",
        price:80,
        inCart:0
    },
    {
        name:"Headphone",
        tag:"headphone",
        price:50,
        inCart:0
    },
    {
        name:"Earpods",
        tag:"earpods",
        price:60,
        inCart:0
    }
];

for(let i=0;i < carts.length; i++){
    carts[i].addEventListener('click',() => {
        cartNumbers(products[i]);    
        totalCost(products[i]);  
    })
}

function onLoadCartNumbers() {
    let productNumbers =localStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){

    let productNumbers=localStorage.getItem('cartNumbers');   
    productNumbers=parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers',productNumbers +1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }else{
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent= 1;
    }      
    setItems(product);
}

function setItems(product) {
    let cartItems=localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
             cartItems = {
                 ...cartItems,
                 [product.tag]:product
             }        
        }
        cartItems[product.tag].inCart += 1;
    }else{
        product.inCart =1;
        cartItems={
            [product.tag]:product
        }
    }
    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost= localStorage.getItem('totalCost');
    console.log(cartCost);

    if (cartCost !=null) {
        cartCost=parseInt(cartCost);
        localStorage.setItem("totalCost",cartCost + product.price);
    }else{
        localStorage.setItem("totalCost",product.price);
    }
}

function displayCart() {
    let cartItems=localStorage.getItem('productsInCart')
    cartItems=JSON.parse(cartItems);
    let productContainer=document.querySelector(".products");
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += ` 
            <div class="product">
            <ion-icon name="trash"></ion-icon>
            <img src="./${item.tag}.jpg">
            <span>${item.name}</span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity">
            <ion-icon name="arrow-dropleft"></ion-icon>
            <span>${item.inCart}</span>
            <ion-icon name="arrow-dropright"></ion-icon>
            </div>
            <div class="total">
            $${item.inCart * item.price}.00
            </div>
            `
        });
        
    }
}

onLoadCartNumbers();
displayCart();

//cart items list pop up model
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}




