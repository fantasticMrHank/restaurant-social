<script>
    import {firestore} from '../firebase';
    import {createEventDispatcher} from 'svelte';

    export let request; 
    let dispatcher = createEventDispatcher();

    let name;
    let img;

    firestore.collection("members").where("email", "==", request)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                name = doc.data().name;
                img = doc.data().photoURL;
        });
    });

    const addConnection =()=>{
        dispatcher("AddConnection", request);
    }
</script>

<div class="requester-container">
    <div class="user-avatar" style="background-image: url({img})"/>
    <h3 class="requester-name">{name}</h3>
    <div class="connect-button" on:click={addConnection}>
        Connect
    </div>
    <div class="decline-button">
        Decline
    </div>
</div>

<style>

    .connect-button{
     background: green;   
    }
    .decline-button{
        background: #800000;
    }
    .connect-button, .decline-button{
        cursor: pointer;
        margin-top: 15px;
        width: max-content;
        height: max-content;
        border-radius: 6px;
        padding: 10px 16px;
    }
    .requester-name, .connect-button, .decline-button{
        display: table-cell;         
        vertical-align: middle;
        padding: 10px;
    }
    .requester-container{
        margin-bottom: 20px;
        display: grid;
        grid-template-columns: 50px 1fr 70px 70px;
    }
</style>



