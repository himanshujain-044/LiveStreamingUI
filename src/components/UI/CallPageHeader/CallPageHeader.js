import { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faUserFriends,
//   faCommentAlt,
//   faUserCircle,
// } from "@fortawesome/free-solid-svg-icons";
import "./CallPageHeader.scss";
import { formatDate } from "./../../../utils/helpers";

const CallPageHeader = ({
  isMessenger,
  setIsMessenger,
  messageAlert,
  setMessageAlert,
}) => {
  let interval = null;
  const [currentTime, setCurrentTime] = useState(() => {
    return formatDate();
  });

  useEffect(() => {
    interval = setInterval(() => setCurrentTime(formatDate()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="frame-header">
      <div className="header-items icon-block">
        {/* <FontAwesomeIcon className="icon" icon={faUserFriends} /> */}
        <span className="icon"> user friend</span>
      </div>
      <div
        className="header-items icon-block"
        onClick={() => {
          setIsMessenger(true);
          setMessageAlert({});
        }}
      >
        {/* <FontAwesomeIcon className="icon" icon={faCommentAlt} /> */}
        <span className="icon">comment alt</span>
        {!isMessenger && messageAlert?.alert && (
          <span className="alert-circle-icon"></span>
        )}
      </div>
      <div className="header-items date-block">{currentTime}</div>
      <div className="header-items icon-block">
        {/* <FontAwesomeIcon className="icon profile" icon={faUserCircle} /> */}
        <span className="icon profile"> user circle</span>
      </div>
    </div>
  );
};

export default CallPageHeader;
