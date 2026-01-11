let cart_btn = document.querySelector('.cart-btn');
let cart_close_btn = document.querySelector('.close-btn');
let cart = document.querySelector('.cart');
let cart_items_container = document.querySelector('.cart-items');
let cart_total = document.querySelector('.cart-btn').querySelector('.total');


class Cart{
    constructor(){  
        this.items = [];
    }
    addItem(product){
        if (this.items.find(item => item.name === product.name)){
            product.quantity += 1;
        }else{
            product.quantity = 1;
            this.items.push(product);
            
        }
        this.updateTotal();
        this.updateCartUI();
    }
    updateCartUI(){
        cart_items_container.innerHTML = '';
        this.items.forEach(item => {
            let cart_item = document.createElement('div');
            cart_item.classList.add('cart-item');
            cart_item.innerHTML = `
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">$${item.price}</span>
            <div class="cart-item-quantity">
                <button class="decrease-qty">-</button>
                <label>${item.quantity}</label>
                <button class="increase-qty">+</button>
            </div>
            <button class="remove-btn">Видалити</button>
            <span class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</span>
            `;  
            let remove_btn = cart_item.querySelector('.remove-btn');
            remove_btn.addEventListener('click', () => {
                item.index = this.items.indexOf(item);
                this.items.splice(item.index, 1);
                this.updateCartUI();
                
            })
            let decrease_qty_btn = cart_item.querySelector('.decrease-qty');
            decrease_qty_btn.addEventListener('click', () => {
                if(item.quantity > 1){
                    item.quantity -= 1;
                }else{
                    item.index = this.items.indexOf(item);
                    this.items.splice(item.index, 1);
                }
                this.updateCartUI();
            
            
            })
            let increase_qty_btn = cart_item.querySelector('.increase-qty');
            increase_qty_btn.addEventListener('click', () => {
                item.quantity += 1;
                this.updateCartUI();
            })

            cart_items_container.appendChild(cart_item);
            this.updateTotal();
        })
        }
    
    updateTotal(){
        let items = document.querySelectorAll('.cart-item-total');
        let total = 0;
        items.forEach(item => {
            total += parseFloat(item.innerText.replace('$', ''));
        })
        cart_total.innerText = `Total: $${total.toFixed(2)}`;
    }
}

let cart_instance = new Cart();
class Product{
    constructor(image,name,desc, price){
        this.image = image;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.cart_quantity = 0;
    }
    pushToSite(){
        let product_section = document.querySelector('.products');
        let product = document.createElement('div');
        product.classList.add('product-card');
        product.innerHTML =  `
        <div class="product-image">
            <img src=${this.image} alt="">
        </div>
        <div class="product-title">
            <h3>${this.name}</h3>
        </div>
        <div class="product-desc">
            <p>${this.desc}</p>
        </div>
        <div class="product-footer">
            <span class="price">$${this.price}</span>
            <button class="buy-btn">Купити</button>
        </div>`
        let buy_btn = product.querySelector('.buy-btn');
        buy_btn.addEventListener('click', () => {
            cart_instance.addItem(this);
        })
        product_section.appendChild(product)
    }
} 


let products = []
for(let i=1; i<=9; i++){
    products.push(new Product("https://placehold.co/250x350", `Product ${i}`, "This is a great product", (i*10).toFixed(2)))
}

products.forEach(product => {
    product.pushToSite();
})

cart_btn.addEventListener('click', () => {
    anime({
        targets:cart,
        top:"50%",
        left:'50%',
        translate:("-50%","-50%"),
        marginTop:'-175px',
        scale:1.3,
        duration:500,
        easing:"easeInOutQuad",
        delay:0,
    })
    cart.style.display = 'block'
    cart_instance.updateCartUI();
})

cart_close_btn.addEventListener('click', () => {
    anime({
        targets:cart,
        top:"-20%",
        left:'90%',
        marginTop:0,
        opacity:1,
        scale:0.1,
        duration:500,
        easing:"easeInOutQuad",
        delay:0,
    }).finished.then(()=>{

        cart.style.display = 'none'
    })
})

