// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCopy,
//   faTimes,
//   faUser,
//   faShieldAlt,
// } from "@fortawesome/free-solid-svg-icons";
import "./MeetingInfo.scss";

const MeetingInfo = ({ setMeetInfoPopup, url }) => {
  return (
    <div className="meeting-info-block">
      <div className="meeting-header">
        <h3>Your meeting's ready</h3>
        <span
          className="icon"
          // icon={faTimes}
          onClick={() => {
            setMeetInfoPopup(false);
          }}
        >
          times icon
        </span>
      </div>
      <button className="add-people-btn">
        {/* <FontAwesomeIcon className="icon" icon={faUser} /> */}
        <span>user icon</span>
        Add Others
      </button>
      <p className="info-text">
        Or share this meeting link with others you want in the meeting
      </p>
      <div className="meet-link">
        <span>{url}</span>
        <span
          className="icon"
          // icon={faCopy}
          onClick={() => navigator.clipboard.writeText(url)}
        >
          copy icon
        </span>
      </div>
      <div className="permission-text">
        {/* <FontAwesomeIcon className="icon red" icon={faShieldAlt} /> */}
        <span>sheild icon</span>
        <p className="small-text">
          People who use this meeting link must get your permission before they
          can join.
        </p>
      </div>
      <p className="small-text">Joined as akshay@gmail.com</p>
    </div>
  );
};

export default MeetingInfo;
