<script>
    import {auth, firestore} from '../firebase';
    import OtherReviewDataStore from '../stores/OtherReviewDataStore';
    import SingleReview from './singleReview.svelte';
    import collectionManager from '../Services/collectionManager';

    export let currentMember;   

    export const refreshData =(email)=>{

        collectionManager("reviews", "email", email, (list =>{
            OtherReviewDataStore.update(data =>{
                 return list;
             })
        })); 
    }
    
</script>

<div class:shortCon={!$OtherReviewDataStore.length}>  
    {#if $OtherReviewDataStore.length}
    <h3 class="review-author">
        Reviews from {currentMember.name || currentMember.email}
    </h3>
        {#each $OtherReviewDataStore as review}
            <SingleReview {review} showRestaurant={true} />
        {/each}
    {:else}
        <h3>No Reviews from {currentMember.name || currentMember.email} yet</h3>
    {/if}
</div>

<style>
    .review-author{
        margin: 20px auto;
        text-align: center;
    }
    div{
        width: 800px;
        height: 80%;
        padding: 15px;
        background: white;
        border-radius: 10px;
        margin: 30px auto;
        overflow-y: auto;
    }
    .shortCon{
        height: 100px;
        overflow-y: hidden;
    }
</style>
