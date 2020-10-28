
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
    
    .res-con{
        max-width: 960px;
        margin: 40px auto;
        text-align: center;
    }
    img{
        width: 400px;
    }
</style>