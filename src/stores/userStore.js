import {writable} from 'svelte/store';

const userStore =writable({
    uid:"",
    email:'',
    displayName:"",
    photoURL:""
});

export default userStore;