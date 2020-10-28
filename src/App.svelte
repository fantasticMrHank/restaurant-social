<script>
import { Router } from "@sveltech/routify";
import { routes } from "@sveltech/routify/tmp/routes";
import userStore from './stores/userStore';
import {auth, firestore} from './firebase';


    auth.onAuthStateChanged(user => {		
		if (user) {
            userStore.update(u =>{
                return {
                    email: user.email,
                    photoURL: user.photoURL,
                    displayName: user.displayName,
                    uid: user.uid
                }
            });
		}else{
            userStore.update(u =>{
                return {
                    email: "",
                    displayName: "",
                    photoURL:"",
                    uid:""
                }
            });
        }
    });

</script>

<Router {routes} />