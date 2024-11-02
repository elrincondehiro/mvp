<script>
  import { cartStore } from '@/lib/cartStore';
  
  // Usando $ para suscribirnos automáticamente a los cambios del store
  $: cartItems = $cartStore;
</script>

<div class="cart-display">
  {#if cartItems && cartItems.items.length > 0}
    <p>Items en carrito: 
      {#each cartItems.items as item}
        <span class="cart-item">
          {item.name}
          {#if item.quantity > 1}
            (x{item.quantity})
          {/if}
        </span>
      {/each}
    </p>
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