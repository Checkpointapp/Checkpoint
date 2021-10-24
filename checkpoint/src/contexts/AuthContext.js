import React from 'react';
import { signInWithGoogle } from '../firebase';
import { auth } from '../firebase';
import GoogleButton from 'react-google-button'
import '../../src/styles/main.css'

class AuthContext extends React.Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className='user-info'>
        {

          this.state.currentUser ?

            (<div>
              <div>
                <img src={this.state.currentUser.photoURL} />
              </div>
              <div>Name: {this.state.currentUser.displayName}</div>
              <div>Email: {this.state.currentUser.email}</div>

              <button onClick={() => auth.signOut()}>LOG OUT</button>
            </div>
            ) :

            <div className="google-button-container">
                <div className="google-button">
                    <GoogleButton
                        onClick={signInWithGoogle}
                    />
                </div>
            </div>

        }
      </div >
    );
  }
}

export default AuthContext;