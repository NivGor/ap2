import React from "react";
import { useState, useEffect } from "react";
import './InputBar.css'

function UploadVideo(props) {
  var source = ''
  var chat = props.chat
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [notVideoError, setNotVideoError] = useState("");

  useEffect(()=> { },[selectedFile])

  const selectVideo = (event) => {
    let file = event.target.files[0]
    if(!file.type.includes("video")){
      let fileSelected = document.getElementById('video-file');
      fileSelected.value = ""
      setNotVideoError("Please choose a video file")
      setIsFilePicked(false)
      clearInput()
    } else {
      setNotVideoError("")
      setSelectedFile(event.target.files[0]);
      setIsFilePicked(true);
      }
  };

  const notSelected = () => {
    setNotVideoError("Please Upload a Video")
  }

  const clearInput = () => {
    let input = document.getElementById('video-file')
    input.value = ''
    setIsFilePicked(false)
  }

  const sendVideo = () => {
    source = URL.createObjectURL(selectedFile)
    props.setChat([...chat, {id: chat.length, content: 'A Video', time: props.getTime(), sentByMe: true, type: "video", source: source}])
    props.updateContactChat(props.user.userName, props.contact.userName, {id: chat.length, content: 'A Video', time: props.getTime(), sentByMe: true, type: "video", source: source})
    clearInput()
  };

  return (
    <div className="modal fade" id="videoUpload" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Upload a Video</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={clearInput} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div>
              <input type="file" name="file" onChange={selectVideo} id="video-file" accept="video/*"/>
              <div className="modal-error">{notVideoError}</div>
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
                            { isFilePicked && <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={sendVideo}>Send Video</button>}
                            {!isFilePicked && <button type="button" className="btn btn-primary" onClick={notSelected} >Send Video</button>}
                        </div>
                    </div>
                </div>
            </div>
    );
}
    export default UploadVideo;