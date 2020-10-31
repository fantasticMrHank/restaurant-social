import firebase from 'firebase/app';
import {firestore} from '../firebase';


const helpManager =(collection, id, email, operation, callBack)=>{
    let thisDoc = firestore.collection(collection).doc(id);
   
    if(operation == "addHelpful"){
                   
        thisDoc.update({
                helpful: firebase.firestore.FieldValue.arrayUnion({member: email})
        }).then(()=>{
            thisDoc.get().then((doc)=>{
                callBack(doc.data().helpful)
            })
        });
    }
    else{
        thisDoc.update({
                unhelpful: firebase.firestore.FieldValue.arrayUnion({member: email})
        }).then(()=>{
            thisDoc.get().then((doc)=>{
                callBack(doc.data().unhelpful)
            })
        });
    }
    
}

export default helpManager;