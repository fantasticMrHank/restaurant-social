import {auth, firestore} from '../firebase';

let numSuccess=0;
let totalNum=0;
let resultList=[];


const addToMembersCollection = (list)=>{

    list.map(result =>{
        firestore.collection("members").doc(result.user.uid).set({
            email: result.user.email
        })
    })
    
}
const userManager = (list) =>{

    totalNum = list.length;

    list.map(user =>{
        auth.createUserWithEmailAndPassword(user[0], user[1].toString()).then((result) => {   
            
            resultList.push(result);
            numSuccess++;
            if(numSuccess == totalNum){
                addToMembersCollection(resultList);
            }            
        }).catch(error => alert(error.message));
    });
    
}




export default userManager;