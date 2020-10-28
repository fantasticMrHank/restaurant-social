<script>
    import {createEventDispatcher} from 'svelte';
    import {firestore} from '../firebase';
    import userStore from '../stores/userStore';
    import messageListStore from '../stores/messageListStore';
    import compareValues from '../Services/compareValues';
    import SingleMessage from './singleMessage.svelte';
    export let currentFriend;
    let dispatcher = createEventDispatcher();
    let message;
    let messageList=[];

    const closeMessageWindow =() =>{
        dispatcher("CloseMessageWindow");
    };

    const markAsRead = (id) =>{
        firestore.collection("messages").doc(id)           
            .update({
                read: true
        })
    };

    export const fetchMessageList = () =>{

        messageList=[];
        firestore.collection("messages").where("sender", "==", $userStore.email)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    if(doc.data().receiver == currentFriend.email){
                        messageList.push(doc.data());
                    }
            });

            fetchMessageList2();
        });
    }
    const fetchMessageList2 = () =>{
        firestore.collection("messages").where("sender", "==", currentFriend.email )
            .get()
            .then(function(querySnapshot) {
                for (var i in querySnapshot.docs) {
                    const doc = querySnapshot.docs[i];

                    if(doc.data().receiver == $userStore.email){
                        messageList.push(doc.data());
                    }
                    markAsRead(doc.id);
                }
            messageList.sort(compareValues('Timestamp'));

            messageListStore.update(data =>{
                return messageList;
            });
            
            dispatcher("MessageListRecompiled");
            scrollMessageDown();  
        });
    }    

    const scrollMessageDown = () =>{
        setTimeout(() => {
                document.getElementById('message-obx').scrollTop =  document.getElementById('message-obx').scrollHeight;           
        }, 300);
    }
    const sendMessage =() =>{
        let now = new Date();        
        firestore.collection("messages").add({
                sender:$userStore.email,
                receiver:currentFriend.email,
                message,
                read:false,
                Timestamp:now
            }).then(()=>{
                fetchMessageList();

                message ="";
                scrollMessageDown();
            });
    } 
   

</script>

<div>
    <div class="title-con">
        <div class="user-avatar" style="background-image: url({currentFriend.photoURL})"/>
    
        <div class="message-title">
            Messages with {currentFriend.name || currentFriend.email}
        </div>        
    </div>    
    <div class="message-list" id="message-obx">  
        {#if $messageListStore.length}
        {#each $messageListStore as message}
            <SingleMessage {message} {currentFriend} currentUser={$userStore} />
        {/each}    
        {:else}
            <p>Start a conversation!</p>
        {/if}  
    </div>
    <img src="img/close.png" class="close-btn" alt="close button" on:click={closeMessageWindow}/>
</div>
<textarea name="messageInput"rows="10" class="message-input" bind:value={message}/>
<div class="send" on:click={sendMessage}>
    send
</div>

<style>
    .send{
        padding: 6px 10px;
        width: max-content;
        float: right;
        border-radius: 6px;
        background: #214E1C;
        color: white;
        box-shadow: 1px 2px 3px rgba(0,0,0,0.5);
        cursor: pointer;
    }
    .message-list{
        width: 100%;
        height: 230px;
        overflow-y: auto;
        margin-bottom: 20px;
    }
    .message-input{
        width: 100%;
        height: 180px;
    }
    .title-con{
        padding-bottom: 15px;
        margin-bottom: 15px;
        border-bottom: 1px solid #ddd;
    }
    .message-title{
        font-size: 22px;
        font-weight: bold;
        font-style: italic;
        color:#ddd;
    }
    div{
        color: white;
    }    
</style>