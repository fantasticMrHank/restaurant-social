<script>
    import { onMount, beforeUpdate } from 'svelte';
    import SingleRes from '../../components/singleRes.svelte';
    import { goto } from '@sveltech/routify'; 
    import {firestore, auth} from '../../firebase';
    import restaurantDataStore from '../../stores/restaurantDataStore';
    import { fade, fly } from 'svelte/transition';
    export let id;

    beforeUpdate(()=>{
        firestore.collection("restaurants").get().then((querySnapshot) => {
            let restaurantList=[];
            querySnapshot.forEach((doc) => {
                if(doc.data().category == id){
                    restaurantList.push(doc.data());            
                }            
            });

            restaurantDataStore.update(r =>{
                return restaurantList;
            })
        });
    });
    

</script>

<div class="restaurant-cat-container">
    <h3>{id} Restaurants</h3>

    {#each $restaurantDataStore as res, i}
        <div in:fade="{{duration:500, delay:i*200}}" class="restaurant-tile">
            <SingleRes {res}/>
        </div>
    {/each}
</div>

<style>
    .restaurant-tile{
        text-align: left;
    }
    .restaurant-cat-container{
        max-width: 960px;
        text-align: center;
        margin: 20px auto;
    }
    h3{
        font-style: 24px;
        font-weight: bold;
        color: #800000;
    }
</style>