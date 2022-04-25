import React from "react";
import { useState, useEffect } from "react";

function Popup(props) {
  var source = ''
  var chat = props.chat
  console.log(props)
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [notImgError, setNotImgError] = useState("");

  // useEffect(() => {
  //   if (!isFilePicked) {
  //     setNotImgError("Please Upload a Photo")
  //   }
  // }, [isFilePicked]);

  const selectPhoto = (event) => {
    let file = event.target.files[0]
    if(!file.type.includes("image")){
      let fileSelected = document.getElementById('file');
      fileSelected.value = ""
      setNotImgError("Please Choose A JPEG/PNG File")
      setIsFilePicked(false)
    } else {
        setNotImgError("")
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0])
        setIsFilePicked(true);
      }
  };

  const notSelected = () => {
    setNotImgError("Please Upload a Photo")
  }
  const sendPhoto = () => {
    source = URL.createObjectURL(selectedFile)
    console.log("source is !!!!! " + source)
    props.setChat([...chat, {id: chat.length, content: 'An image', time: props.getTime(), sentByMe: true, type: "img", source: source}])
    console.log(props.user.userName)
    props.updateContactChat(props.user.userName, props.contact.userName, {id: chat.length, content: 'An image', time: props.getTime(), sentByMe: true, type: "img", source: source})
    let fileSelected = document.getElementById('file');
    fileSelected.value = ""
    console.log(chat)
    setIsFilePicked(false)
  };

  return (
    <div className="modal fade" id="photoUpload" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Upload a Photo</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div>
              <input type="file" name="file" onChange={selectPhoto} id="file" accept="image/png, image/jpeg"/>
              <div className="error">{notImgError}</div>
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
            </div>
          </div>
          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            { isFilePicked && <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={sendPhoto}>Send Photo</button>}
                            {!isFilePicked && <button type="button" className="btn btn-primary" onClick={notSelected} >Send Photo</button>}
                        </div>
                    </div>
                </div>
            </div>
    );
}
    export default Popup;
    // <div className="popupBackground">
    //   <div className="popupContainer">
    //     <button onClick={exitPopup}> X </button>
    //     <div className="title">
    //       <h1>Please upload a photo</h1>
    //     </div>
    //     <div className="body">
    //       <input type="file" name="file" onChange={changeHandler} id="file" />
    //       {isFilePicked ? (
    //         <div>
    //           <p>Filename: {selectedFile.name}</p>
    //           <p>Filetype: {selectedFile.type}</p>
    //           <p>Size in bytes: {selectedFile.size}</p>
    //           <p><img id="output" src={source} width="200" /></p>
    //           <p>
    //             lastModifiedDate:{' '}
    //             {selectedFile.lastModifiedDate.toLocaleDateString()}
    //           </p>
    //         </div>
    //       ) : (
    //         <p>Select a file to show details</p>
    //       )}
    //       <div>
    //         <button onClick={handleSubmission}>Submit</button>
    //       </div>
    //     </div>
    //     <div className="footer">
    //       <button>Cancel</button>
    //       <button>Continue</button>
    //     </div>
    //   </div>
    // </div>
    // ) : ""