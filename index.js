import { menuArray } from '/data.js'

const lowerDisplay = document.getElementById('lower-display')

document.addEventListener('click',function(e){
    if(e.target.dataset.addItem){
        getTargetItem(e.target.dataset.addItem)
    }
   else if(e.target.dataset.remove){
        removeItem(e.target.dataset.remove)
    }
    else if(e.target.id === 'complete-order-btn'){
        openClosePaymentForm()
    }
    else if(e.target.id === 'close-form'){
        openClosePaymentForm()
    }
    else if(e.target.id === 'pay-btn'){
        handlePaymentSubmit()
    }
    
    
})

function getTargetItem(itemId){
    const targetObj = menuArray.filter(function(item){
        return item.id === itemId
    })[0]
    
    checkoutItemsArray.unshift(targetObj)
    renderCheckout()
}

let checkoutItemsArray = []

function renderCheckout(){
    let checkoutItems = ''
    let totalPrice = 0
    

    checkoutItemsArray.forEach(function(item, index){
        checkoutItems +=`
                <div class="cart-item">
                    <div class="cart-item-name">
                        <h2>${item.name}</h2>
                        <button class="remove-item-btn" data-remove="${index}">remove</button>
                    </div>
                    <p class="item-price">$${item.price}</p>
                </div>`
        totalPrice += item.price
    })

    lowerDisplay.innerHTML = `
        <div class="checkout-cart" id="checkout-cart">
            <h4>Your order</h4>
            <div id="cart-items">
                ${checkoutItems}
            </div>
            <hr>
            <div class="cart-item">
                <h2>Total price:</h2>
                <p class="item-price" id="total-price">$${totalPrice}</p>
            </div>
            <button id="complete-order-btn" class="order-btn">Complete Order</button>
        </div>`
    
}

function removeItem(indexNum){
    checkoutItemsArray.splice(indexNum, 1)

    if(checkoutItemsArray.length >= 1){  
        renderCheckout() 
    } 
    else {
        lowerDisplay.innerHTML= '' 
    }
}

let isBlured = false

function openClosePaymentForm(){
    const backgroundBlur = document.getElementById('main-container')
    if(!isBlured){
        backgroundBlur.classList.add('blur')
    } else {
        backgroundBlur.classList.remove('blur')
    }
    isBlured = !isBlured
    document.getElementById('payment-form').classList.toggle('hidden')
}

function handlePaymentSubmit(){
    openClosePaymentForm()
    let orderName = document.getElementById('order-name').value
    lowerDisplay.innerHTML = `
    <div class="order-message">
        <h2>Thanks, ${orderName}! Your order is on its way!
    </div>
    `
    document.getElementById('payment-form').reset()
    checkoutItemsArray = []
}

function getMenuFeed(){
    let menuFeed = ''

    menuArray.forEach(function(item){
        let ingredientList = ''
        
        item.ingredients.map(function(ingredient, i){
            if (item.ingredients[i + 1]){
                ingredientList += `<li>${ingredient},</li>`
            } 
            else {
                ingredientList += `<li>${ingredient}</li>`
            }
        })

        menuFeed += `
            <div class="item">
                <span class="item-icon">${item.emoji}</span>
                <div class="item-info">
                    <h2>${item.name}</h2>
                    <ul class="ingredient-list">${ingredientList}</ul>
                    <p class="item-price">$${item.price}</p>
                </div>
                <div class="btn-container">
                    <button data-add-item="${item.id}">+</button>
                </div>
            </div>`
    });
    return menuFeed
}

function renderMenu(){
    const menuDisplay = document.getElementById('menu')
    menuDisplay.innerHTML = getMenuFeed()
}

renderMenu()