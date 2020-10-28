// import firebase from 'firebase/app';
import {firestore} from '../firebase';


const documentIdFinder = async (collection, email)=>{

    await firestore.collection(collection).where("email", "==", email)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        return doc.id;
                })
                
    });
    
}

export default documentIdFinder;