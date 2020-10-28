<script>
    import {beforeUpdate, createEventDispatcher, onMount} from 'svelte';
    import {firestore} from '../firebase';
    import {writable} from 'svelte/store';

    let dispatch = createEventDispatcher();
    export let member;
    export let currentUser;
    
    let connectionStatus ="none";
    let friendsList=[];
    let hasUnreadMessages = false;

    firestore.collection("messages").where("sender", "==", member.email)
        .get()
        .then(function(querySnapshot) {
            for (var i in querySnapshot.docs) {
                const doc = querySnapshot.docs[i];
                if(!doc.data().read){
                    hasUnreadMessages = true;
                    break;
                }
            }
    });
    
    const getConnectionStatus = (arr) =>{
        for(var i =0; i < arr.length; i++)
        {
            if(arr[i].friend == currentUser.email)
            {
                connectionStatus = arr[i].status;
                break;
            }
        }
    }

    const refreshStatus =() =>{
        firestore.collection("members").where("email", "==", member.email)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    friendsList = doc.data().friends;
            });
            
            getConnectionStatus(friendsList);
        });
    }
        
    const fetchStatus = () => {
        let friendsList = member.friends;
        getConnectionStatus(friendsList);        
    }

    beforeUpdate(fetchStatus);

    const seeUserReview =()=>{
        dispatch("GetUserReview", member);
    }

    const sendInvite =() =>{
        dispatch("SendUserInvite", member);
        setTimeout(refreshStatus, 1000);
    }
    const sendMessage =() =>{
        hasUnreadMessages = false;
        dispatch("SendMessage", member);
    }
</script>

<div class="member-container">
    <div class="user-avatar" style="background-image: url({member.photoURL})"/>
    <div>
        <h3 class="member-name">
            {#if member.name}
            {member.name}
            {:else}
            {member.email}
            {/if}
        </h3>
        <div style='display:flex;'>
            <div class="member-btn" on:click={seeUserReview}>See Reviews</div>
            {#if connectionStatus =="none"}
                <div class="member-btn" on:click={sendInvite}>Connect</div>
            {:else if connectionStatus =="pending"}
                <div class="member-sent-btn">Pending</div>
            {:else if connectionStatus =="connected"}
                <div class="message-button" on:click={sendMessage}>Send Message</div>            
            {/if}

            {#if hasUnreadMessages}
                <span class="unread-message">*you have unread messages</span>
            {/if}
        </div>
        
    </div>
</div>

<style>
    .unread-message{
        color: #800000;
        font-size: 10px;
        font-weight: 700;
        padding-top: 10px;;
    }
    .message-button{
        padding: 6px 10px;
        width: max-content;
        margin-right: 10px;
        border-radius: 6px;
        background: #214E1C;
        color: white;
        box-shadow: 1px 2px 3px rgba(0,0,0,0.5);
        cursor: pointer;
    }
    .member-sent-btn{
        padding: 6px 10px;
        width: max-content;
        margin-right: 10px;
        border-radius: 6px;
        background: #ffff9d;
        color: #800000;
        box-shadow: 1px 2px 3px rgba(0,0,0,0.5);
    }
    .member-btn{
        padding: 6px 10px;
        width: max-content;
        margin-right: 10px;
        border-radius: 6px;
        background: #800000;
        color: white;
        box-shadow: 1px 2px 3px rgba(0,0,0,0.5);
        cursor: pointer;
    }
    .member-name{
        color: #800000;
        font-size: 19px;
        font-weight: bold;
        font-style: italic;
    }
    .member-container{
        display: grid;
        grid-template-columns: 60px 1fr;
    }
</style>