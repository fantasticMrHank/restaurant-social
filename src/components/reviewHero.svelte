
<script>
    import userStore from '../stores/userStore';

    export let currentRestaurant;
    

    
</script>

<div class="res-con">
    <h3>{currentRestaurant.name}</h3>
    
    <img src={currentRestaurant.pic} alt={currentRestaurant.name}>
    <p>{currentRestaurant.address}</p>
    {#if $userStore.email}
    <div class="review-btn" on:click>        
            Add a Review!      
    </div>
    {/if}
</div>


<style>   
    img{
        border: 1px solid #fff;
        box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
    }
    .res-con{
        max-width: 960px;
        margin: 40px auto;
        text-align: center;
    }
    img{
        width: 400px;
    }
</style>