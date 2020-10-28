<script>
    import firebase from 'firebase/app';
    import {createEventDispatcher} from 'svelte';
    import userStore from '../stores/userStore';
    import {auth, firestore, storage} from '../firebase';
    import reviewDataStore from '../stores/reviewDataStore';
    import moment from 'moment';
    export let currentRestaurant ;
    
    let dispatcher = createEventDispatcher();

    let stars;
    let description;
    let userImage;

    let author = $userStore.displayName ? $userStore.displayName : $userStore.email;
    if(!author){
        try{
            auth.onAuthStateChanged(user => {	
                
                if(user){
                    userStore.update(u =>{
                        return {
                            photoURL: user.photoURL,
                            email: user.email,
                            displayName: user.displayName,
                            uid:user.uid
                        }
                    });
                    author = $userStore.displayName ? $userStore.displayName : $userStore.email;
                }
                    
            });
        }catch{}
            
    }

    const hideModal =()=>{
        dispatcher("hideModalEvent");
    }

    const trackImageFile =(e) =>{
        userImage = e.target.files[0];
    }

    const submitReview2 =(img) =>{
        let reviewDateTime = moment().format('LLL');

        firestore.collection("reviews").add({
            restaurant:currentRestaurant.name,
            category:currentRestaurant.category,
            stars,
            description,
            author,
            email: $userStore.email,
            reviewDateTime,
            img
        }).then(()=>{
            reviewDataStore.update(d =>{
                return [...d, {
                                restaurant:currentRestaurant.name,
                                category:currentRestaurant.category,
                                stars: stars,
                                description: description,
                                author,
                                email: $userStore.email
                        }]
            })
            dispatcher("hideModalEvent");
        });
    }
    const submitReview =() =>{

        if(userImage){
            const storageRef = storage.ref();
            let fileRef = storageRef.child(userImage.name);
            let uploadTask = fileRef.put(userImage);

            uploadTask.on('state_changed', function(snapshot){
                
            }, function(error) {
                // Handle unsuccessful uploads
            }, function() {        
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    submitReview2(downloadURL);
                });
            });
        }
        else{
            submitReview2("");
        }
        
        
    }
</script>

<div class="modal-bg" on:click|self={hideModal}>
    <div class='modal-container'>
        <h3>Review for {currentRestaurant.name}</h3>
        <div class="select-container">
        <label for="stars" class="select-label">Star Rating:</label>
            <select name="stars" id="stars" bind:value={stars}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
        <h3 class="review-label">Review detail:</h3>
        <br>
        <textarea name="" id="review-description" rows="5" bind:value={description}/>
        
        <h3 class="review-label">Upload Image(s):</h3>
        <input type="file" name="" id="" on:change={trackImageFile}>
        <div class="review-btn white-text" on:click={submitReview}>Submit Review</div>
    </div>
</div>


<style>
    .white-text{
        color: white;

    }
    h3{
        padding-top: 20px;
    }
    div{
        color: #800000;
    }
    #stars{
        padding: 0px;
    }
    .select-container{
        display: flex;
        width: 100%;
        padding-left: 180px;
    }
    .select-label{
        padding-right: 8px;
    }
    #review-description{
        width: 90%;
    }
    .modal-bg{
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        position: absolute;
        top: 0px;
        left: 0px;
    }
    .modal-container{
        width: 500px;
        height: 600px;
        margin: 100px auto;
        background: #ededed;
        border-radius: 10px;
        text-align: center;
    }
</style>