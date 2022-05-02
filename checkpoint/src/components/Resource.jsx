import '../styles/main.css';
import '../styles/resources.css';
import firebase from "firebase/app";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function Resources(props) {

  function deleteresource() {
    if (window.confirm("Are you sure to want to delete this resource? ")) {
      var userId = firebase.auth().currentUser.uid;
      var ref = firebase.database().ref("users/" + userId + "/resources/" + props.resourceSec + "_resource");
      ref.remove();
    }
  }

  return (
    <>
      <div className="resource-card">
        <div className='resource-background'>
          <div className="delete-button">
            <FontAwesomeIcon icon={faXmark} onClick={deleteresource} />
          </div>
          <h2 className="resource-text">{props.text}</h2>
        </div>
      </div>
    </>

  );
}

export default Resources;