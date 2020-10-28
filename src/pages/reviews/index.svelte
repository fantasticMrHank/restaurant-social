<script>
    import {auth, firestore} from '../../firebase';
    import { goto} from '@sveltech/routify'; 
    import userStore from '../../stores/userStore';
    import myReviewDataStore from '../../stores/myReviewDataStore';
    import SingleReview from '../../components/singleReview.svelte';

    auth.onAuthStateChanged(user => {		
		if (!user) {
            $goto('signin');
		}
    });

    let thisUser;
    let reviewList=[];
    let thisStore;
    $: {
        thisUser = $userStore;
        thisStore = $myReviewDataStore;
                
        if(thisUser.email){
            if(!$myReviewDataStore.length){
                firestore.collection("reviews").where("email", "==", $userStore.email)
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            reviewList.push(doc.data());
                    });
                    myReviewDataStore.update(data =>{
                        return reviewList;
                    })
                })
            }
        }
    }
    
    
</script>

<div>
    <h3 class="review-author">
    Reviews from {$userStore.displayName || $userStore.email}
    </h3>
    {#each $myReviewDataStore as review}
        <SingleReview {review} showRestaurant=true />
    {/each}
</div>

<style>
    .review-author{
        margin: 20px auto;
        text-align: center;
        background: #800000;
        padding: 15px;
        color: white;
    }
</style>
