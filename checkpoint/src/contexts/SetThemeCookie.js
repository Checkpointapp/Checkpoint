import firebase from "firebase/app";
import "firebase/database";

function SetThemeCookie() {

    var userId = firebase.auth().currentUser.uid;
    var starCountRef = firebase.database().ref("users/" + userId + "/survey");
    starCountRef.once('value', (snapshot) => {
        const data = snapshot.val();
        const theme = data.theme;
        console.log(theme);
    });

}

export default SetThemeCookie;