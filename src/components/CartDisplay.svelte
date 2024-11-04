<script>
  import { cartStore } from '@/lib/cartStore';
  
  // Usando $ para suscribirnos automáticamente a los cambios del store
  $: cartItems = $cartStore;
</script>

<div class="flex flex-col cart-display">
  {#if cartItems && cartItems.items.length > 0}
    <p>Items en carrito:</p> 
      {#each cartItems.items as item}
        <p class="mx-5 text-base cart-item">
          <span class="font-bold">{item.name}</span> @ {item.price.toFixed(2)}€
          {#if item.quantity >= 0}
            (x{item.quantity} = {(item.quantity*item.price).toFixed(2)}€)
          {/if}
        </p>
      {/each}
      <span class="cart-total">
        Total: <strong>{cartItems.total.toFixed(2)} €</strong>
      </span>
    <!-- </p> -->
  {:else}
    <p>Carrito vacío</p>
  {/if}
</div>

<style>
  .cart-display {
    padding: 0.5rem;
    color: #333;
  }

  .cart-item {
    margin-right: 0.5rem;
    padding: 0.2rem 0.5rem;
    background-color: #f0f0f0;
    border-radius: 4px;
  }
</style>