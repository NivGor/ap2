import React from "react";
import { useState } from "react";

function Popup(props) {
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    const exitPopup = () => {
      props.setTrigger()
    }

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
	}; 

    return (props.trigger) ? (
        <div className="popupBackground">
            <div className="popupContainer">
                <button onClick={exitPopup}> X </button>
                <div className="title">
                    <h1>Please upload a photo</h1>
                </div>
                <div className="body">
                        <input type="file" name="file" onChange={changeHandler} />
                        {isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
                        <div>
                            <button onClick={handleSubmission}>Submit</button>
                        </div>
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