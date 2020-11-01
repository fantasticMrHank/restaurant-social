<script>
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
            <select name="stars" class="select-css" bind:value={stars}>
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
    .select-css {
	display: inline-block;
	font-size: 16px;
	font-family: sans-serif;
	font-weight: 700;
	color: #444;
	line-height: 1.3;
	padding: 3px;
	width: 50px;
	box-sizing: border-box;
	margin: 0;
	border: 1px solid #aaa;
	box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
	border-radius: .5em;
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
	background-color: #fff;
	background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
	  linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%);
	background-repeat: no-repeat, repeat;
	background-position: right .7em top 50%, 0 0;
	background-size: .65em auto, 100%;
}
.select-css::-ms-expand {
	display: none;
}
.select-css:hover {
	border-color: #888;
}
.select-css:focus {
	border-color: #aaa;
	box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
	box-shadow: 0 0 0 3px -moz-mac-focusring;
	color: #222;
	outline: none;
}
.select-css option {
	font-weight:normal;
}
    .select-container{
        display: flex;
        width: 100%;
        padding-left: 180px;
    }
    .select-label{
        padding-right: 8px;
        padding-top: 3px;
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