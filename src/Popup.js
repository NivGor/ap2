import React from "react";
import { useState, useEffect } from "react";
import './InputBar.css'

function Popup(props) {
  var source = ''
  var chat = props.chat
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [notImgError, setNotImgError] = useState("");

  const selectPhoto = (event) => {
    let file = event.target.files[0]
    if(!file.type.includes("image")){
      let fileSelected = document.getElementById('img-file');
      fileSelected.value = ""
      setNotImgError("Please Choose A JPEG/PNG File")
      setIsFilePicked(false)
      clearInput()
    } else {
        setNotImgError("")
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
      }
  };

  useEffect(() => {
    var element = document.getElementById('chatBox')
    element.scrollTop = element.scrollHeight
  }, [chat])

  const notSelected = () => {
    setNotImgError("Please Upload a Photo")
  }

  const clearInput = () => {
    let input = document.getElementById('img-file')
    input.value = ''
    setIsFilePicked(false)
  }

  const sendPhoto = () => {
    source = URL.createObjectURL(selectedFile)
    props.setChat([...chat, {id: chat.length, content: 'An image', time: props.getTime(), sentByMe: true, type: "img", source: source}])
    props.updateContactChat(props.user.userName, props.contact.userName, {id: chat.length, content: 'An image', time: props.getTime(), sentByMe: true, type: "img", source: source})
    clearInput()
  };

  return (
    <div className="modal fade" id="photoUpload" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Upload a Photo</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={clearInput} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div>
              <input type="file" name="file" onChange={selectPhoto} id="img-file" accept="image/png, image/jpeg"/>
              <div className="modal-error">{notImgError}</div>
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
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={clearInput}>Close</button>
                            { isFilePicked && <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={sendPhoto}>Send Photo</button>}
                            {!isFilePicked && <button type="button" className="btn btn-primary" onClick={notSelected} >Send Photo</button>}
                        </div>
                    </div>
                </div>
            </div>
    );
}
    export default Popup;