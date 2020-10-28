import {writable} from 'svelte/store';

const otherUserStore =writable({
    email:'',
    displayName:"",
    photoURL:""
});

export default otherUserStore;