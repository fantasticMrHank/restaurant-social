<script>
    
    import userStore from "../stores/userStore";
    import {auth, firestore} from '../firebase';
    import { goto } from '@sveltech/routify'; 
    import {fly} from 'svelte/transition';
    import {bounceInOut} from 'svelte/easing';

    let email;
    let password;
    
    const registerUser =() =>{
        auth.createUserWithEmailAndPassword(email, password).then((result) => {
            userStore.update(u =>{
                return {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL:result.user.photoURL,
                    uid: result.user.uid
                }
            });

            firestore.collection("members").doc(result.user.uid).set({
                email: result.user.email
            });

            $goto('main');
            
        }).catch(error => alert(error.message));
    }
</script>

<form transition:fly="{{ y: 500, duration: 800, easing: bounceInOut }}">
    <input type="email" placeholder="email" bind:value={email}>
    <br>
    <input type="password" placeholder="password" bind:value={password}>
    <div class="signin-button" on:click={registerUser}>Register</div>
</form>



<style>
    form{
        margin-top: 40px;
        max-width: 960px;
        margin: 40px auto;
        text-align: center;
    }
    form .signin-button{
        border-radius: 8px;
        width: 70px;
        text-align: center;
        padding: 10px 20px;
        background-color: #800000;
        font-weight: 700;
        margin: 10px auto;
        color: white;
        cursor: pointer;

    }
    input:focus { 
    outline: none !important;
    border-color: #800000;
    box-shadow: 0 0 10px #80000042;
}
</style>

