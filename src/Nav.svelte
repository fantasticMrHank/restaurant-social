<script>

  import { url } from "@sveltech/routify";
  import userStore from "./stores/userStore";
  import {auth, firestore} from './firebase';
  import { fade } from 'svelte/transition';
  import UpdateUser from "./components/updateUser.svelte";
  import navListStore from './stores/navListStore';
  import UpdateAvatarModal from "./components/updateAvatarModal.svelte";
  import ConnectNotification from "./components/connectNotification.svelte";
  import memberListStore from "./stores/memberListStore";
  import messageListStore from "./stores/messageListStore";
  import myReviewDataStore from "./stores/myReviewDataStore";
  import setActiveTab from './utils/setActiveTabs';
  
  let links=[];
  let catList=[];
  let makeToolTipActive = true;

  let notificationModal;

  let hiddenUpdateBtnBool=true;
  let hiddenUpdateForm=true;
  let hiddenAvatarModal=true;

  export let userBGImage;

  $: userBGImage = $userStore.photoURL;
  
  auth.onAuthStateChanged(user => {		

    links =[];
    
      if (user) {
        links = [
            ["#", "Log Out", "./LogOut"],
            ["./reviews", "Your Reviews","./Reviews"],
            ["./members", "Members Area","./members"],

          ];
        userStore.update(u =>{
              return {
                  email: user.email,
                  photoURL: user.photoURL,
                  displayName: user.displayName,
                  uid: user.uid
              }
        });

        if(user.uid == "KG7YTpw7QIQdZPxn23KbH5xTR5h2"){
          links.push(["./feed", "Manage Users"]);
        }
        
        document.getElementById("user-area").style.display="";
      }
      else{
        links = [
            ["./signin", "Sign In", "./SignIn"],
            ["./register", "Register", "./Register"],
          ];
          userStore.update(u =>{
                return {
                    email: "",
                    displayName: "",
                    photoURL:"",
                    uid:""
                }
          });
          document.getElementById("user-area").style.display="none";
      }

      if(catList.length){
        const newList = links.concat(catList);        
        navListStore.update(l =>{
            return newList;
        });
      }

      checkNavReady();
      checkToolTipReady();

  });

  firestore.collection("restaurants").get().then((querySnapshot) => {

      let catNameList=[];
      querySnapshot.forEach((doc) => {
          if(catNameList.indexOf(doc.data().category) == -1){
            catNameList.push(doc.data().category);
            catList.push([`./reviews/${doc.data().category}`, doc.data().category, `./${doc.data().category}`]);
          }
      });
      
      const newList = links.concat(catList);
      navListStore.update(l =>{
          return newList;
      });
  });  

  const logUserOut =() =>{
    auth.signOut();
    userStore.set({}); 
    
    memberListStore.set([]);
    messageListStore.set([]);
    myReviewDataStore.set([]);

    notificationModal.hideAll();

  }

  const showUpdateButton =() =>{
      hiddenUpdateBtnBool = false;
    }
    const hideUpdateButton =() =>{
      hiddenUpdateBtnBool = true;
      hiddenUpdateForm = true;
    }

    const showUserNameModal =() =>{
      hiddenUpdateForm = false;
    }

    const hideAllModals =() =>{
      hiddenUpdateBtnBool = true;
      hiddenUpdateForm = true;
    }

  const grabPath = () =>{
    setTimeout(() => {
      let urlPath= window.location.pathname.substr(1);
      setActiveTab("path-"+urlPath);
    }, 100);    
  }

    const showAvatarModal =() =>{
      makeToolTipActive = false;
      hiddenAvatarModal = false;
    }
    const hideAvatarModal =() =>{
      hiddenAvatarModal = true;
    }

    const checkNavReady = ()=>{
      let path = window.location.pathname.substr(1);

      if(path.indexOf("reviews/reviewdetail/") == -1){
        
        if(document.getElementById("path-"+path)){
          grabPath();
        }else{
          setTimeout(() => {
            checkNavReady();
          }, 100);
        }
      }
      
    }
    const  checkToolTipReady =() =>{
      if(document.getElementById("avatar-tooltip")){
        document.getElementById("avatar-tooltip").style.display="none";
      }
      else{
        setTimeout(() => {
          checkToolTipReady();
        }, 100);
      }
    }   
    

    const showToolTip =() =>{
      if(makeToolTipActive){
        document.getElementById("avatar-tooltip").style.display = "";
      }
    }
    const hideToolTip =() =>{
      document.getElementById("avatar-tooltip").style.display = "none";
    }

</script>


<header class="nav-header">
<ul>
  {#each $navListStore as [path, name, exactPath]}
    {#if name =="Log Out"}
      <li><a href="#" on:click={logUserOut}>{name}</a></li>
    {:else}
    <!-- <li><a href={$url(path)} class:selected={$isActive(exactPath)}>{name}</a></li> -->
      <li on:click={grabPath}><a href={$url(path)} class="nav-tab" id="path-{path.substr(2)}">{name}</a></li>
    {/if}    
  {/each}
</ul>
<div></div>
<div class="user-name" id="user-area" on:mouseover={showUpdateButton} on:mouseleave={hideUpdateButton}>
  {#if $userStore.displayName}
        Welcome back, {$userStore.displayName}!
  {:else if $userStore.email}
        Welcome back, {$userStore.email}!
  {:else}
        <!-- doing diaplay anything -->
  {/if}
  <div class="update-name-button" 
                        class:hiddenButton={hiddenUpdateBtnBool} 
                        on:click={showUserNameModal}>
    update User Name
  </div>

  <div class:hiddenButton={hiddenUpdateForm} class='overall-user-form-container'>
    <div class="update-user-form-container" >
      <UpdateUser on:userUpdated={hideAllModals}/>
    </div>
  </div>
</div>
{#if $userStore.email}
<div class="user-avatar" style="background-image: url({$userStore.photoURL})" 
                on:click={showAvatarModal} 
                on:mouseover={showToolTip}
                on:mouseout={hideToolTip}
/>
<div id="avatar-tooltip">
  Update/upload Profile Image
</div>  


{/if}
</header>
<div class="notification-container">
  <ConnectNotification bind:this={notificationModal} />
</div>
<div class="avatar-modal-bg" class:hiddenAvatar={hiddenAvatarModal} on:click|self={hideAvatarModal}>
  <UpdateAvatarModal on:AvatarUploadComplete={hideAvatarModal} />
</div>


<style>

  #avatar-tooltip{
    position: absolute;
    top: 50px;
    right: 10px;
    width: max-content;
    padding: 10px;
    border-radius: 8px;
    background: #fff;
    font-size: 11px;
    font-weight: bold;
    color: #800000;
    z-index: 10;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
    border: 1px solid #ddd;
  }
  .notification-container{
    position: absolute;
    right: 5px;
    top: 85px;
    z-index: 100;
  }
  .hiddenAvatar{
    display: none;
  }
  .avatar-modal-bg{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 100;
    top: 0px;
    left: 0px;
    background-color: rgba(0,0,0,0.5);
  }
  .user-avatar{
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: aquamarine;
    margin-left: 5px;
    margin-top: 7px;
    cursor: pointer;
    background-position: center; /* Center the image */
    background-repeat: no-repeat; /* Do not repeat the image */
    background-size: cover; /* Resize the background image to cover the entire container */
  }
  .overall-user-form-container{
    height: 215px;
    width: 280px;
    position: absolute;
    z-index: 98;
  }
  .update-user-form-container{
    position: absolute;
    z-index: 99;
    margin-top: 80px;
    background-color:#ededed;
    border-radius: 6px;
  }
  .update-name-button{
    position: absolute;
    z-index: 99;
    margin-top: 15px;
    padding: 8px 14px;
    background: #800000;
    border-radius: 6px;
    cursor: pointer;
    color: white;
    width: max-content;
  }
  .hiddenButton{
    display: none;
  }
.nav-header{
  width: 100%;
  display: grid;  
  grid-template-columns: 750px 1fr 200px 65px;
}

ul{
  display: flex;
}

.user-name{
  font-size: 15px;
  padding-top: 24px;
  font-weight: bold;
  text-align: right;
  /* width: 200px; */
  /* height: 100px; */
  
}

  li {
    display: block;
  /* float: left; */
  }

 .selected{
  border-bottom: 2px solid #800000;
  color: #800000;
 }

  a {
    text-decoration: none;
    padding-top: 10px;
    padding-bottom: 3px;
    padding-left: 10px;
    padding-right: 10px;
    display: block;
    font-weight: bold;
    color: #333;
  }
</style>

