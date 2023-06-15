import Messenger from "./../UI/Messenger/Messenger";
import { useNavigate, useParams } from "react-router-dom";
// import MessageListReducer from "../../reducers/MessageListReducer";
import Alert from "../UI/Alert/Alert";
import MeetingInfo from "../UI/MeetingInfo/MeetingInfo";
import CallPageFooter from "../UI/CallPageFooter/CallPageFooter";
import CallPageHeader from "../UI/CallPageHeader/CallPageHeader";
import Peer from "simple-peer";
import io from "socket.io-client";
import { getRequest, postRequest } from "./../../utils/apiRequests";
import {
  BASE_URL,
  GET_CALL_ID,
  SAVE_CALL_ID,
} from "./../../utils/apiEndpoints";
import "./CallPage.scss";
import { useEffect, useReducer, useRef, useState } from "react";
import MessageListReducer from "../../reducers/MessageListReducer";

let peer = null;
const socket = io.connect(process.env.REACT_APP_BASE_URL);
const initialState = [];
const CallPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef();
  let { id } = useParams();
  const isAdmin = window.location.hash == "#init" ? true : false;
  const url = `${window.location.origin}${window.location.pathname}`;
  let alertTimeout = null;
  const [messageList, messageListReducer] = useReducer(
    MessageListReducer,
    initialState
  );
  const [streamObj, setStreamObj] = useState();
  const [screenCastStream, setScreenCastStream] = useState();
  const [meetInfoPopup, setMeetInfoPopup] = useState(false);
  const [isPresenting, setIsPresenting] = useState(false);
  const [isMessenger, setIsMessenger] = useState(false);
  const [messageAlert, setMessageAlert] = useState({});
  const [isAudio, setIsAudio] = useState(true);
  useEffect(() => {
    if (isAdmin) {
      setMeetInfoPopup(true);
    }
    initWebRTC();
    socket.on("code", (data) => {
      if (data.url === url) {
        peer.signal(data.code);
      }
    });
  }, []);
  const getRecieverCode = async () => {
    const response = await getRequest(`${BASE_URL}${GET_CALL_ID}/${id}`);
    if (response.code) {
      peer.signal(response.code);
    }
  };
  const initWebRTC = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        // setStreamObj(stream);

        peer = new Peer({
          initiator: isAdmin,
          trickle: false,
          stream: stream,
        });
        // if (!isAdmin) {
        //   console.log("71");
        //   getRecieverCode();
        // }
        // console.log("74", peer);
        // peer.on("signal", async (data) => {
        //   if (isAdmin) {
        //     let payload = {
        //       id,
        //       signalData: data,
        //     };
        //     await postRequest(`${BASE_URL}${SAVE_CALL_ID}`, payload);
        //   } else {
        //     socket.emit("code", { code: data, url }, (cbData) => {
        //       console.log("code sent");
        //     });
        //   }
        // });
        // peer.on("connect", () => {
        //   // wait for 'connect' event before using the data channel
        // });
        // peer.on("data", (data) => {
        //   clearTimeout(alertTimeout);
        //   messageListReducer({
        //     type: "addMessage",
        //     payload: {
        //       user: "other",
        //       msg: data.toString(),
        //       time: Date.now(),
        //     },
        //   });
        //   setMessageAlert({
        //     alert: true,
        //     isPopup: true,
        //     payload: {
        //       user: "other",
        //       msg: data.toString(),
        //     },
        //   });
        //   alertTimeout = setTimeout(() => {
        //     setMessageAlert({
        //       ...messageAlert,
        //       isPopup: false,
        //       payload: {},
        //     });
        //   }, 10000);
        // });
        peer.on("stream", (stream) => {
          // got remote video stream, now let's show it in a video tag

          let video = document.querySelector("video");
          console.log("118", video);
          if ("srcObject" in video) {
            video.srcObject = stream;
          } else {
            video.src = window.URL.createObjectURL(stream); // for older browsers
          }
          video.play();
        });
        // peer
        //   .on("stream")
        //   .then((res) => {
        //     console.log("132", res);
        //   })
        //   .catch((err) => {
        //     console.log("133", err);
        //   });
      })
      .catch(() => {});
  };
  const sendMsg = (msg) => {
    peer.send(msg);
    messageListReducer({
      type: "addMessage",
      payload: {
        user: "you",
        msg: msg,
        time: Date.now(),
      },
    });
  };
  const screenShare = () => {
    navigator.mediaDevices
      .getDisplayMedia({ cursor: true })
      .then((screenStream) => {
        peer.replaceTrack(
          streamObj.getVideoTracks()[0],
          screenStream.getVideoTracks()[0],
          streamObj
        );
        setScreenCastStream(screenStream);
        screenStream.getTracks()[0].onended = () => {
          peer.replaceTrack(
            screenStream.getVideoTracks()[0],
            streamObj.getVideoTracks()[0],
            streamObj
          );
        };
        setIsPresenting(true);
      });
  };
  const stopScreenShare = () => {
    screenCastStream.getVideoTracks().forEach(function (track) {
      track.stop();
    });
    peer.replaceTrack(
      screenCastStream.getVideoTracks()[0],
      streamObj.getVideoTracks()[0],
      streamObj
    );
    setIsPresenting(false);
  };
  const toggleAudio = (value) => {
    streamObj.getAudioTracks()[0].enabled = value;
    setIsAudio(value);
  };
  const disconnectCall = () => {
    peer.destroy();
    navigate("/");
    window.location.reload();
  };
  return (
    <div className="callpage-container">
      <video
        className="video-container"
        controls
        ref={videoRef}
        autoPlay
      ></video>
      <CallPageHeader
      // isMessenger={isMessenger}
      // setIsMessenger={setIsMessenger}
      // messageAlert={messageAlert}
      // setMessageAlert={setMessageAlert}
      />
      <CallPageFooter
      // isPresenting={isPresenting}
      // stopScreenShare={stopScreenShare}
      // screenShare={screenShare}
      // isAudio={isAudio}
      // toggleAudio={toggleAudio}
      // disconnectCall={disconnectCall}
      />
      {isAdmin && meetInfoPopup && (
        <MeetingInfo setMeetInfoPopup={setMeetInfoPopup} url={url} />
      )}
      {/* {isMessenger ? (
        <Messenger
          setIsMessenger={setIsMessenger}
          sendMsg={sendMsg}
          messageList={messageList}
        />
      ) : (
        messageAlert.isPopup && <Alert messageAlert={messageAlert} />
      )} */}
      {/* <Messenger
      //   setIsMessenger={setIsMessenger}
      //   sendMsg={sendMsg}
      //   messageList={messageList}
      /> */}
    </div>
  );
};
export default CallPage;
