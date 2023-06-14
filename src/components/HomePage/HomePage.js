import { useNavigate } from "react-router-dom";
import shortid from "shortid";
import Header from "../UI/Header/Header";
import "./HomePage.scss";
const HomePage = () => {
  const navigate = useNavigate();
  const startCall = () => {
    const uid = shortid.generate();
    navigate(`/${uid}#init`);
  };
  return (
    <div className="home-page">
      <Header />
      <div className="body">
        <div className="left-side">
          <div className="content">
            <h2>Premium video meetings. Now free for everyone.</h2>
            <p>
              We re-engineered the service we built for secure business
              meetings, Google Meet, to make it free and available for all.
            </p>
            <div className="action-btn">
              <button className="btn green" onClick={startCall}>
                {/* onClick={startCall} */}
                {/* <FontAwesomeIcon className="icon-block" icon={faVideo} /> */}
                <span>Video Icon</span>
                New Meeting
              </button>
              <div className="input-block">
                <div className="input-section">
                  {/* <FontAwesomeIcon className="icon-block" icon={faKeyboard} /> */}
                  <span>key icon</span>
                  <input placeholder="Enter a code or link" />
                </div>
                <button className="btn no-bg">Join</button>
              </div>
            </div>
          </div>
          <div className="help-text">
            <a href="https://google.com">Learn more</a> about Google Meet
          </div>
        </div>
        <div className="right-side">
          <div className="content">
            <img
              alt="meet-imgae"
              src="https://www.gstatic.com/meet/google_meet_marketing_ongoing_meeting_grid_427cbb32d746b1d0133b898b50115e96.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
