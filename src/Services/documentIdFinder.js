// import firebase from 'firebase/app';
import {firestore} from '../firebase';


const documentIdFinder = async (collection, email, callBack)=>{

    let thisID;
    await firestore.collection(collection).where("email", "==", email)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        thisID = doc.id;
                })
                
    }).then(()=>{
        console.log("finish fetch this id: ", thisID);
        callBack(thisID);
    })
    
}

export default documentIdFinder;