<script>
    import { goto } from '@sveltech/routify'; 
    import {firestore} from '../firebase';
    import myReviewDataStore from '../stores/myReviewDataStore';
    export let review;
    export let showRestaurant;
    export let liveLink = true;
    export let allowDelete = false;

    const openRestaurantImage =()=>{
        window.open(review.img);
    }

    const gotoRestaurantPage =() =>{
        if(liveLink == true){
            $goto(`../../reviews/reviewdetail/${review.restaurant.replace(/\s/g, '*')}`);
        }
        
    }

    const deleteReview =() =>{
        firestore.collection("reviews").doc(review.id).delete().then(function() {
            $myReviewDataStore = $myReviewDataStore.filter(item => item.id != review.id);
        });
    }

</script>

<div class="review-con">
    {#if showRestaurant}
        <span class="restaurant-name" on:click={gotoRestaurantPage} >Review for {review.restaurant}</span>
    {/if}
    <div class="star-container">   
        {#each Array(parseInt(review.stars)) as _, i}     
            <img class="star-img" src="../../../img/star.png" alt="">
        {/each}
        <span class="star-text">{review.stars} Stars</span>
    </div>
    
    <p>{review.description}</p>
    {#if review.img}
        <img src= {review.img} alt="" class="restaurant-image" on:click={openRestaurantImage}>
    {/if}
    <p class="author-text">reviewed by: {review.author}</p>
    
    <div>
        {#if review.reviewDateTime}
        <p>{review.reviewDateTime}</p>
        {/if}
        {#if allowDelete}
        <div class="review-btn delete-btn" on:click={deleteReview}>Delete Review</div>
        {/if}
    </div>
    


</div>


<style>
    .delete-btn{
        width: max-content;  
        transition: 0.3s;  
        font-weight: bold;
        font-size: 11px;    
    }
    .delete-btn:hover{
        background: #ff0000;
    }
    .restaurant-image{
        width: 100px;
        padding-bottom: 10px;
    }
    .review-con{
        cursor: pointer;
        margin-bottom: 25px;
        border-bottom: 1px solid #ddd;
        /* transition: 0.5s; */
    }
    .review-con:hover .restaurant-name{
        color: #000;
        margin-left: -10px;
        font-size: 24px;
        border-bottom: 1px solid #f00;
    }
    .review-con:hover .author-text{
        color: #4B7402;  
        font-size: 16px;
        margin-top: -10px;      
        transition: 0.4s;
    }
    .restaurant-name{
        color: #800000;
        font-weight: bold;
        font-size: 18px;
        transition: 0.4s;
    }
    .author-text{
        font-weight: bold;
        font-style: italic;
        font-size: 12px;
        transition: 0.3s;
    }
    .star-text{
        margin-left: 10px;
    }
    .star-container{
        display: flex;
    }
    .star-img{
        width: 20px;
        height: 20px;
    }
    div{
        max-width: 500px;
        margin: 20px auto;
    }
</style>