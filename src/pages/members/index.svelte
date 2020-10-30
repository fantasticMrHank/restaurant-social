<script>
    import { goto } from "@sveltech/routify";
    import {firestore, auth} from '../../firebase';
    import userStore from '../../stores/userStore';
    import memberListStore from '../../stores/memberListStore'
    import { onDestroy } from 'svelte';
    import SingleMember from '../../components/singleMember.svelte';
    import ReviewList from '../../components/reviewList.svelte';
    import connectionManager from '../../Services/connectionManager';
    import MessageContainer from '../../components/messageContainer.svelte';
    import documentIdFinder from '../../Services/documentIdFinder';
    import setActiveTabs from '../../utils/setActiveTabs';

    let currentFriend={};
    let hideModal = true;
    let currentMember; 
    let reviewModal;
    let messageBox;
    let hideMessage = true;

    $: currentMember = $userStore;

    

    const fetchMemberData =(user)=>{
        
        if(user.email){
            
            firestore.collection("members").get().then((querySnapshot) => {

                let memberList=[];
                querySnapshot.forEach((doc) => {
                    if(doc.data().email != user.email){                
                        memberList.push(doc.data());
                    }
                });

                currentFriend = memberList[0];

                memberListStore.update(l =>{
                    return memberList;
                });
            });
        }
    }

	const unsubscribe = userStore.subscribe(user => {          
        if(user.email){
            fetchMemberData(user);
        }        
    });
    onDestroy(unsubscribe);
    
    const openReviewModal =(e)=>{
        currentMember = e.detail;
        reviewModal.refreshData(e.detail.email);
        hideModal = false;
    }
    const closeReviewModal =(e)=>{
        hideModal = true;
    }

    const sendInvite =(e) =>{

        documentIdFinder("members", e.detail.email, (id) =>{
            connectionManager("members", id, $userStore.email, "pending", "add", ()=>{
                 alert("Connection invite has been sent!");
            });
        })
    }

    const openMessageBox =(e) =>{
        currentFriend = e.detail;        
        messageBox.fetchMessageList();

    }

    const showMessageWindow =() =>{
        hideMessage = false;
    }

    const closeMessages =() =>{
        hideMessage = true;        
    }

    auth.onAuthStateChanged(user => {		
		if (!user) {
            $goto('../../signin');
            setActiveTabs("path-signin");
		}
    });
</script>

<div>
    {#each $memberListStore as member}
        <SingleMember {member}  currentUser={$userStore} 
                                on:GetUserReview={openReviewModal} 
                                on:SendUserInvite={sendInvite}
                                on:SendMessage={openMessageBox}
        />
    {/each}

    <div class='review-modal-bg' class:hiddenModal={hideModal} on:click|self={closeReviewModal} >
        <ReviewList {currentMember} bind:this={reviewModal}/>
    </div>

    <div class="message-con" class:hiddenModal={hideMessage}>
        <MessageContainer {currentFriend} 
            on:CloseMessageWindow ={closeMessages} 
            on:MessageListRecompiled={showMessageWindow}
            bind:this={messageBox}/>
    </div>
</div>


<style>
    .message-con{
        position: absolute;
        bottom: 5px;
        right: 5px;
        width: 350px;
        height: 600px;
        background-color: #222;
        border-radius: 6px;
        padding: 10px;
        box-shadow: 2px 3px 4px rgba(0,0,0,0.4);
    }
    .hiddenModal{
        display: none;
    }
    .review-modal-bg{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0px;
        left: 0px;
        background: rgba(0,0,0,0.5);
    }
</style>