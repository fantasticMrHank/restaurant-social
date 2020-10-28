<script>
import { beforeUpdate } from "svelte";


    export let message;
    export let currentFriend;
    export let currentUser;

    let avatarPhoto;
    let theName;

    beforeUpdate(()=>{
        if(message.sender == currentFriend.email){
            avatarPhoto = currentFriend.photoURL;
            theName = currentFriend.name || currentFriend.email;
        }else{
                avatarPhoto = currentUser.photoURL;
                theName = currentUser.displayName ? currentUser.displayName : currentUser.email;
        }
    });
</script>

<div class="message-con">
    <div class="message-header">
        <div class="user-avatar small-pic" style="background-image: url({avatarPhoto})"/>
        <h3 class="sender-name">{theName}</h3>
    </div>
    <div>
        {message.message}
    </div>
</div>

<style>
    .message-con{
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #333;
    }
    .small-pic{
        width: 25px;
        height: 25px;
        margin-top: 15px;
    }
    .sender-name{
        font-size: 16px;
        color: white;
        margin-left: 10px;
        font-weight: bold;
    }
    .message-header{
        display: flex;
    }
</style>