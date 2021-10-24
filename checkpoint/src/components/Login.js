import '../styles/app.css';
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from "firebase/compat/app";

function Login() {
    const uiConfig = ({
        signInFlow: 'popup',
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.EmailAuthProvider.PROVIDER_ID]
    });
    
    return (
        <>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </>
    );
}

export default Login;