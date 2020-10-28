<script>
    import {auth} from '../firebase';
    import { goto } from '@sveltech/routify'; 

    // just determines which screen to show users
    auth.onAuthStateChanged(user => {		
		if (user) {
            $goto('main');
		}
        else{
            $goto('signin');
        }
    });

</script>

