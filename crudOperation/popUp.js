import React from "react";
import "./style.css"

const Popup = props => {
    return (
        <div className="popup-box">
            <div className="popbox">
                {props.content}
            </div>
        </div>
    );
};
export default Popup;