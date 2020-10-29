import {firestore} from '../firebase';


const collectionManager = (collection, param1, param2, callBack) =>{

    let list =[];
    
    firestore.collection(collection).where(param1, "==", param2)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                list.push({...doc.data(), id:doc.id});
        });
    }).then(()=>{
        callBack(list);
    })

}

export default collectionManager;