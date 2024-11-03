import {atom, map} from 'nanostores';
import debounce from 'lodash/debounce'; 


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

const saveToStorage = (cart: Cart) => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      document.cookie = `cartId=${cart.items.length};path=/;max-age=604800`; // 7 días
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
};

// Función debounced para sincronización
const syncCartDebounced = debounce(async (cart: Cart) => {
    console.log('🔄 Iniciando sincronización del carrito...');
    
    // Primero guardamos en storage local
    saveToStorage(cart);
    console.log('✅ Carrito guardado en storage local');
    
  }, 1000); // Espera 1 segundo de inactividad

export const addToCart = (product: CartItem) => {
    const currentCart = cartStore.get();
    console.log(currentCart);
    const itemIndex = currentCart.items.findIndex(item => item.name === product.name);
    console.log("current Index"+ itemIndex);
    let updatedCart : Cart = {items: [],total: 0};
    if (itemIndex >= 0){
        if (product.quantity<0 && currentCart.items[itemIndex].quantity+product.quantity < 0) {
            product.quantity = -currentCart.items[itemIndex].quantity;
        }
        updatedCart = {
            items: [...currentCart.items],
            total: currentCart.total + (product.price*product.quantity)
        };
        updatedCart.items[itemIndex].quantity+=product.quantity;
        if (updatedCart.items[itemIndex].quantity==0) updatedCart.items.splice(itemIndex, 1);    
    }else if (product.quantity >0){
        updatedCart = {
            items: [...currentCart.items, product],
            total: currentCart.total+ (product.price*product.quantity)
        }
    }else{
        updatedCart = {
            items: [...currentCart.items],
            total: currentCart.total
        }
    }
    console.log(updatedCart);
    cartStore.set(updatedCart); // Garantiza actualización

    console.log('🕐 Iniciando debounce para sincronización...');
    syncCartDebounced(updatedCart);

}

export const initializeCart = async () => {
    // 1. Intentar cargar desde storage local
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      cartStore.set(JSON.parse(savedCart));
      console.log("carrito inizializado");
    }
}