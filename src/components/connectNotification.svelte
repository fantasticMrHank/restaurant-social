<script>
    
    import { onDestroy } from 'svelte';
    import {firestore} from '../firebase';
    import userStore from '../stores/userStore';
    import requestListStore from '../stores/requestListStore';
    import SingleRequest from './singleRequest.svelte';
    import connectionManager from '../Services/connectionManager';
    //import documentIdFinder from '../Services/documentIdFinder';

    let friendsList =[];
    let requestList=[];
    let hideEntireNotification = true;

    const fetchRequestData =(user) =>{

        if(user.uid && user.uid !=""){
            firestore.collection("members").doc(user.uid)
            .get()
            .then((doc) => {
                friendsList = doc.data().friends;
            })
            .then(() =>{
                for(var i=0; i < friendsList.length; i++){
                    if(friendsList[i].status == "pending" && requestList.indexOf(friendsList[i].friend) == -1){
                        requestList.push(friendsList[i].friend);
                    }
                }

                if(requestList.length){
                    // don't hide notification
                    hideEntireNotification = false;
                }
                requestListStore.update(data=>{
                    return requestList;
                })
            })                 
        }
    }    
    

    const unsubscribe = userStore.subscribe(user => {   
        fetchRequestData(user);
    });
    onDestroy(unsubscribe);

    let hideRequest = true;
    let hideNotification = false; 
    const showRequests =()=>{
        hideRequest = false;
        hideNotification = true;
    }

    export const hideAll =()=>{
        hideEntireNotification = true;
        hideRequest = true;
        hideNotification = false;
    }

    const addThisConnection =(e) =>{
        
        let friendID;

        firestore.collection("members").where("email", "==", e.detail)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        friendID = doc.id;
                })                
        }).then(()=>{

            connectionManager("members", $userStore.uid, e.detail, "pending", "delete", ()=>{
            connectionManager("members", $userStore.uid, e.detail, "connected", "add", ()=>{
                connectionManager("members", friendID, $userStore.email, "connected", "add", ()=>{
                        $requestListStore = $requestListStore.filter(item => item != e.detail);

                    });
                });
            });
            
        })

        

    }

    $: {
        if(!$requestListStore.length){
            hideEntireNotification = true;
        }
    }

    const hideRequestList =() =>{
        hideRequest = true;
        hideNotification = false;
    }

</script>

<div class="notification-container" class:hidden-request={hideEntireNotification}>
    <div class="notification-prompt" class:hidden-request={hideNotification} on:click={showRequests} >
        you have pending connection request
    </div>

    <div class="connection-list" class:hidden-request={hideRequest}>
        <img src="img/close.png" alt="" class="close-btn" on:click={hideRequestList}>  
        {#each $requestListStore as request}
            <SingleRequest {request} on:AddConnection={addThisConnection}/>
        {/each}
    </div>  
    
</div>

<style>
    
    .hidden-request{
        display: none !important;
    }
    .notification-container .notification-prompt{
        display: table-cell; 
        vertical-align: middle;
        background: black;
        width: 200px;
        height: 25px;
        color: white;
        border-radius: 6px;
        text-align: center;
        font-weight: bold;
        font-size: 10px;
    }
    .notification-container .connection-list{
        background: black;
        width: 400px;        
        height: max-content;
        color: white;
        border-radius: 6px;        
        font-weight: bold;
        font-size: 10px;
        padding: 15px;
    }
</style>