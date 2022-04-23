import React from "react";
import { useState } from "react";

function Popup(props) {


    const exitPopup = () => {
      props.setTrigger()
    }
    return (props.trigger) ? (
        <div className="popupBackground">
            <div className="popupContainer">
              <button onClick={exitPopup}> X </button>
              <div className="title">
                <h1>Please upload a photo</h1>
              </div>
              <div className="body">
                <p> The next page is awesome!</p>
              </div>
              <div className="footer">
                <button>Cancel</button>
                <button>Continue</button>
              </div>
            </div>
        </div>
    ) : "";
}

export default Popup