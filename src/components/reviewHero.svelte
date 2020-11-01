
<script>
    import userStore from '../stores/userStore';

    export let currentRestaurant;
    
    const gotoMap =() =>{
        window.open("https://www.google.com/maps/place/" + currentRestaurant.address);
    }
    
</script>

<div class="res-con">
    <h3>{currentRestaurant.name}</h3>
    
    <img src={currentRestaurant.pic} alt={currentRestaurant.name}>
    <p class="address-link" on:click={gotoMap}>{currentRestaurant.address}</p>
    {#if $userStore.email}
    <div class="review-btn" on:click>        
            Add a Review!      
    </div>
    {/if}
</div>


<style>   
    .address-link{
        color: #800000;
        cursor: pointer;
        font-size: 12px;
        transition: 0.5s;
    }
    .address-link:hover{
        font-weight: bold;
        font-size: 14px;
        text-decoration: underline;
        color: #ff0000;
    }
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