import {atom, map} from 'nanostores';
// import {debounce} from 'lodash';


export type CartItem = {
    id: string;
    name: string;
    imageSrc : string;
    price: number;
    quantity: number;
}

export type Cart = {
    items: CartItem[];
    total: number;
}

export type CartItemDisplayInfo = Pick<CartItem,  'name' | 'imageSrc' | 'price' | 'quantity'>;

// export const cartStore = map<Record<string, CartItem>>({});
export const cartStore = atom<Cart>({items: [], total: 0});



export const addToCart = (product: CartItem) => {
    const currentCart = cartStore.get();
    const itemIndex = currentCart.items.findIndex(item => item.id === product.id);
    let updatedCart : Cart;
    if (itemIndex >= 0){
        if (product.quantity<0 && currentCart.items[itemIndex].quantity+product.quantity < 0) product.quantity = -currentCart.items[itemIndex].quantity;
        updatedCart = {
            items: [...currentCart.items],
            total: currentCart.total + (product.price*product.quantity)
        };
        updatedCart.items[itemIndex].quantity+=product.quantity;
        
    }else{
        if(product.quantity<0) product.quantity=0;
        updatedCart = {
            items: [...currentCart.items, product],
            total: currentCart.total+ (product.price*product.quantity)
        }
    }
    cartStore.set(updatedCart); // Garantiza actualización

}