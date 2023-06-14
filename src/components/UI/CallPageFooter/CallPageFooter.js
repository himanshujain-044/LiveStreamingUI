// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faVideo,
//   faMicrophone,
//   faPhone,
//   faAngleUp,
//   faClosedCaptioning,
//   faDesktop,
//   faMicrophoneSlash,
// } from "@fortawesome/free-solid-svg-icons";
import "./CallPageFooter.scss";

const CallPageFooter = ({
  isPresenting,
  stopScreenShare,
  screenShare,
  isAudio,
  toggleAudio,
  disconnectCall,
}) => {
  return (
    <div className="footer-item">
      <div className="left-item">
        <div className="icon-block">
          Meeting details
          {/* <FontAwesomeIcon className="icon" icon={faAngleUp} /> */}
          <span className="icon">angleup</span>
        </div>
      </div>
      <div className="center-item">
        <div
          className={`icon-block ${!isAudio ? "red-bg" : null}`}
          onClick={() => toggleAudio(!isAudio)}
        >
          {/* <FontAwesomeIcon
            className="icon"
            icon={isAudio ? faMicrophone : faMicrophoneSlash}
          /> */}
          <span className="icon"> microphone slash</span>
        </div>
        <div className="icon-block" onClick={disconnectCall}>
          {/* <FontAwesomeIcon className="icon red" icon={faPhone} /> */}
          <span className="icon">phone icon</span>
        </div>
        <div className="icon-block">
          {/* <FontAwesomeIcon className="icon" icon={faVideo} /> */}
          <span className="icon">video</span>
        </div>
      </div>
      <div className="right-item">
        <div className="icon-block">
          {/* <FontAwesomeIcon className="icon red" icon={faClosedCaptioning} /> */}
          <span className="icon red"> closed cap</span>
          <p className="title">Turn on captions</p>
        </div>

        {isPresenting ? (
          <div className="icon-block" onClick={stopScreenShare}>
            {/* <FontAwesomeIcon className="icon red" icon={faDesktop} /> */}
            <span className="icon red">desk</span>
            <p className="title">Stop presenting</p>
          </div>
        ) : (
          <div className="icon-block" onClick={screenShare}>
            {/* <FontAwesomeIcon className="icon red" icon={faDesktop} /> */}
            <span className="icon red">desk</span>
            <p className="title">Present now</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallPageFooter;
