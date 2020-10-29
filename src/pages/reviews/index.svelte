<script>
    import {goto} from '@sveltech/routify';
    import userStore from '../../stores/userStore';
    import myReviewDataStore from '../../stores/myReviewDataStore';
    import SingleReview from '../../components/singleReview.svelte';
    import collectionManager from '../../Services/collectionManager';
    import setActiveTabs from '../../utils/setActiveTabs';
    import { onDestroy } from 'svelte';


    // let thisUser;
    // let thisStore;
    // $: {
    //     thisUser = $userStore;
    //     thisStore = $myReviewDataStore;

    //     if(thisUser.email){
    //         if(!$myReviewDataStore.length){

    //             collectionManager("reviews", "email", $userStore.email, (list)=>{
    //                 myReviewDataStore.update(data =>{
    //                      return list;
    //                 });
    //             });
    //         }
    //     }
    //     else{
    //         setTimeout(() => {
    //             $goto('../signin');
    //             setActiveTabs("path-signin");
    //         }, 500);
    //     }
    // }

    const getMyReviews =(user) =>{
        if(!$myReviewDataStore.length){

            collectionManager("reviews", "email", $userStore.email, (list)=>{
                myReviewDataStore.update(data =>{
                    return list;
                });
            });
        }
    }

    const unsubscribe = userStore.subscribe(user => {  
        
        if(user.email){
            getMyReviews(user);
        }else{
            setTimeout(() => {
                $goto('../../signin');
                setActiveTabs("path-signin");
            }, 500);
        }
        
    });
    onDestroy(unsubscribe);
    
</script>

<div>
    <h3 class="review-author">
      Reviews from {$userStore.displayName || $userStore.email}
    </h3>
    {#each $myReviewDataStore as review}
        <SingleReview {review} showRestaurant={true} allowDelete={true}/>
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
