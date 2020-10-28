import {firestore} from "../firebase";

const resetUserName = (collection, param1, param2, newName) =>{
    firestore.collection(collection).where(param1, "==", param2)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.docs.forEach(snapshot =>{

                if(collection =="reviews"){
                    snapshot.ref.update({
                        author: newName
                    })
                }
                else{
                    snapshot.ref.update({
                        name: newName
                    })
                }                
            });  
                    
    })
}

export default resetUserName;
