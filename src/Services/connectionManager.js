import firebase from 'firebase/app';
import {firestore} from '../firebase';


const connectionManager =(collection, id, friend_email, status, operation, callBack)=>{
    if(operation == "add"){
        firestore.collection(collection).doc(id)           
            .update({
                friends: firebase.firestore.FieldValue.arrayUnion({friend: friend_email, status:status})
        }).then(callBack);
    }
    else{
        firestore.collection(collection).doc(id)           
            .update({
                friends: firebase.firestore.FieldValue.arrayRemove({friend: friend_email, status:status})
        }).then(callBack);
    }
    
}

export default connectionManager;