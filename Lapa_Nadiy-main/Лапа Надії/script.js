


class Product{
    constructor(image, title, category, desc, price){
        this.image = image;
        this.title = title;
        this.category = category;
        this.desk = desc;
        this.price = price;
    }

    shop_view(){

    }

    card_view(){
        return '
        <div class="product-card">
            <div class="product-desc">
                <h3>${this.title}</h3>
                <p>${this.desk}</p>
                <div class="product-control">
                    <button>Придбати</button>
                    <span class="product-price">${this.price}</span>
                </div>
            </div>'

    }

}
