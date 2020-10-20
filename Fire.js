import * as firebase from 'firebase'
import Firebase from './Firebase'
class Fire{
    constructor(params) {
        Firebase
    }
    createUser=async user=>{
        let remoteUri=null
        try {
            await firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
            let db=this.firestore.collection("users").doc(this.uid)
            db.set({
                name:user.name,
                email:user.email,
                avatar:'https://readyrefrigeration.ca/sites/default/files/styles/headshot/adaptive-image/public/nobody.jpg',
                posts:0,
                followers:0,
                following:0,
                text:"Follow",
                uid:[]
            })
        } catch (error) {
            alert(error)
        }
    }
    signOut=()=>{
        firebase.auth().signOut()
    }
    get firestore(){
        return firebase.firestore()
    }
    get uid(){
        return (firebase.auth().currentUser||{}).uid
    }
    get timeStamp(){
        return Date.now()
    }
    get user(){
        return (firebase.auth().currentUser||{})
    }
}
Fire.shared=new Fire()
export default Fire