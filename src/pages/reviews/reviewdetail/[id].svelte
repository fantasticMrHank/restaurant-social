<script>
    import {firestore, auth} from '../../../firebase';
    
    import ReviewHero from '../../../components/reviewHero.svelte';
    import ReviewModal from '../../../components/reviewModal.svelte';
    import reviewDataStore from '../../../stores/reviewDataStore';
    import SingleReview from '../../../components/singleReview.svelte';
    
    export let id;
    let restaurantName = id.replaceAll('*', " ");
    let currentRestaurant={}
    let hideModalBool = true;
    // making live database call
    firestore.collection("restaurants").where("name", "==", restaurantName)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
            currentRestaurant = doc.data();
        });

    });

    let reviewList=[];

    firestore.collection("reviews").where("restaurant", "==", restaurantName)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                reviewList.push(doc.data());
        });
        reviewDataStore.update(d =>{
            return reviewList;
        })
    });



    const addNewReview =()=>{
        hideModalBool = false;
    }
    const hideModal =()=>{
        hideModalBool = true;
    }

</script>

<ReviewHero {currentRestaurant} on:click={addNewReview} />

{#each $reviewDataStore as review}
    <SingleReview {review} liveLink=false />
{/each}
<div class:hidenModal={hideModalBool}>
    <ReviewModal on:hideModalEvent={hideModal} {currentRestaurant} />
</div>


<style>
    .hidenModal{
        display: none;
    }
</style>

