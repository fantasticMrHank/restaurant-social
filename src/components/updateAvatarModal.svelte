<script>
    import {createEventDispatcher} from 'svelte';
    import {auth, firestore, storage} from '../firebase';
    import userStore from '../stores/userStore';
    let dispatch = createEventDispatcher();
    let userImage;

    const updateAvatar =(e)=>{
        userImage = e.target.files[0];
    }
    const submitAvatar =()=>{
        const storageRef = storage.ref();
        let fileRef = storageRef.child(userImage.name);
        let uploadTask = fileRef.put(userImage);

        uploadTask.on('state_changed', function(snapshot){
            
            }, function(error) {
                // Handle unsuccessful uploads
            }, function() {        
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    updateUserImage(downloadURL);
                });
        });
    }
    const updateUserImage =(img) =>{
        auth.currentUser.updateProfile({
            photoURL: img
        }).then(() =>{
            userStore.update(u =>{
                return {
                    ...u,
                    photoURL: img
                }
            });
            updateAvatarInMemberCollection(img);
            dispatch("AvatarUploadComplete");
        })
    }

    const updateAvatarInMemberCollection = (img) =>{
        firestore.collection("members").doc($userStore.uid)           
            .update({
                photoURL: img
        })
    }

    const hideMe =() =>{
        dispatch("HideAvatarModal");
    }
</script>

<div class="avatar-form" on:click|self={hideMe}>
    <h3>Upload Avatar Image</h3>
    <input type="file" on:change={updateAvatar}>
    <div class="cc" on:click={submitAvatar}>Update</div>
</div>


<style>
    .cc{
        margin: 10px auto;
        padding: 6px 10px;
        width: min-content;
        background: #800000;
        border-radius: 6px;
        color: white;
        cursor: pointer;
        text-align: center;
    }
    .avatar-form{
        padding: 8px;
        width: 350px;
        height: 200px;
        border-radius: 10px;
        margin: 50px auto;
        background: #eee;
        text-align: center;
    }
</style>