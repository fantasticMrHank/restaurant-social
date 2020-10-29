<script>
    import {firestore} from '../../../firebase';
    
    import ReviewHero from '../../../components/reviewHero.svelte';
    import ReviewModal from '../../../components/reviewModal.svelte';
    import reviewDataStore from '../../../stores/reviewDataStore';
    import SingleReview from '../../../components/singleReview.svelte';
    import collectionManager from '../../../Services/collectionManager';
    export let id;
    let restaurantName = id.replaceAll('*', " ");
    let currentRestaurant={}
    let hideModalBool = true;
    

    const resetNavTabs =() =>{
        let tabs = document.getElementsByClassName("nav-tab");
        for(var i=0; i < tabs.length; i++){
            tabs[i].style.color = "#000000";
            tabs[i].style.borderBottom = "none";
        }
        document.getElementById("path-reviews/"+currentRestaurant.category).style.color = "#800000";
        document.getElementById("path-reviews/"+currentRestaurant.category).style.borderBottom = "2px solid #800000";
    }

    firestore.collection("restaurants").where("name", "==", restaurantName)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            currentRestaurant = doc.data();

            resetNavTabs();
        });

    });  

    const pupulateReviewStore = (list) =>{
        reviewDataStore.update(d =>{
             return list;
         })
    }
    collectionManager("reviews", "restaurant", restaurantName, pupulateReviewStore);

    const addNewReview =()=>{
        hideModalBool = false;
    }
    const hideModal =()=>{
        hideModalBool = true;
    }

</script>

<ReviewHero {currentRestaurant} on:click={addNewReview} />

{#each $reviewDataStore as review}
    <SingleReview {review} liveLink={false} />
{/each}
<div class:hidenModal={hideModalBool}>
    <ReviewModal on:hideModalEvent={hideModal} {currentRestaurant} />
</div>


<style>
    .hidenModal{
        display: none;
    }
</style>

