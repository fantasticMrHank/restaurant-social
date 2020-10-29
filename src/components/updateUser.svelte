<script>
    import {auth} from '../firebase';
    import userStore from '../stores/userStore';
    import myReviewDataStore from '../stores/myReviewDataStore';
    import reviewDataStore from '../stores/reviewDataStore';
    import resetUserName from '../Services/resetUserName';



    let username="";
   
    const updateUserName =() =>{
        auth.currentUser.updateProfile({
                displayName: username,
            }).then(function() {
                userStore.update(u =>{
                    return {
                        ...u,
                        displayName: username
                    }
                });
                
            }).then(()=>{

                resetUserName("reviews", "email", auth.currentUser.email, username);
                resetUserName("members", "email", auth.currentUser.email, username);

            }).catch(function(error) {
            // An error happened.
        });
        // update author for all my reviews

        if($myReviewDataStore.length){
            $myReviewDataStore = $myReviewDataStore.map(
                review => ({...review, author: username})
            );
        }

        // update author for all current reviews           
        $reviewDataStore = $reviewDataStore.map(
            review => {                    
                if(review.email == auth.currentUser.email){
                    return {...review, author: username}
                }
                else{
                    return {...review}
                }
            }
        )
    }
    
</script>

<form >
    <input type="text" bind:value={username}>
    <div class="update-button" on:click={updateUserName}>Update User Name</div>
</form>

<style>
    form{
        margin: 20px 20px;
        text-align: center;
        padding: 10px;
    }
    input{
        font-size: 18px;
    }
    form .update-button{
        font-size: 14px;
        line-height: 26px;
        border-radius: 8px;
        height: 26px;
        width: 140px;
        padding: 5px 20px;
        background-color: #800000;
        font-weight: 700;
        margin-left: 10px;
        color: white;
        cursor: pointer;

    }
</style>