import React from "react";
import { useState, useEffect } from "react";
import './InputBar.css'

function RecordAudio(props) {
  var source = ''
  var chat = props.chat
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [notImgError, setNotImgError] = useState("");
  const [canRecord, setCanRecord] = useState(true)


  useEffect(() => {
      if (!isFilePicked) {
        setNotImgError("Please Record a Message")
      } else {
        setNotImgError("")
      }
    }, [isFilePicked]);

  const notSelected = () => {
    setNotImgError("Please Record a Message")
  }

  const clearInput = () => {
    let input = document.getElementById('audio')
    input.src = ''
    setIsFilePicked(false)
  }

  if (canRecord) {
    var startRecord = document.querySelector('button[name="record"]');
    var stopRecord = document.querySelector('button[name="stop"]');
    var audio = document.querySelector('#audio');
    if (startRecord) {
      startRecord.addEventListener('click', async () => {
        let stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        let mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        let chunks = [];
        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        }
        mediaRecorder.onerror = (e) => {
          alert(e.error);
        }

        mediaRecorder.onstop = (e) => {
          let blod = new Blob(chunks);
          let url = URL.createObjectURL(blod);
          audio.src = url;
          setSelectedFile(url)
        }
        if (stopRecord) {
          stopRecord.addEventListener('click', () => {
            if (mediaRecorder.state == 'inactive') {
              mediaRecorder.start()
            }
            mediaRecorder.stop();
            setIsFilePicked(true)
            setCanRecord(false)
          })
        }
      })
    }
  }
  
  const sendVoiceMSG = () => {
    props.setChat([...chat, {id: chat.length, content: 'A Voice Message', time: props.getTime(), sentByMe: true, type: "audio", source: selectedFile}])
    props.updateContactChat(props.user.userName, props.contact.userName, {id: chat.length, content: 'A Voice Message', time: props.getTime(), sentByMe: true, type: "audio", source: selectedFile})
    clearInput()
  };

  return (
    <div className="modal fade" id="recordAudio" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Record Audio</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={clearInput}></button>
          </div>
          <div className="modal-body">
            <audio id="audio" controls></audio>
            <div className="modal-error">{notImgError}</div>
          </div>
          <div className="modal-footer">
                           <button type="button" name="record" className="btn btn-success">Record</button>
                           <button type="button" name="stop" className="btn btn-danger" >Stop</button>
                            { isFilePicked && <button type="button" className="btn btn-primary" onClick={sendVoiceMSG} data-bs-dismiss="modal">Send Voice Message</button>}
                            {!isFilePicked && <button type="button" className="btn btn-primary" onClick={notSelected} >Send Voice Message</button>}
                        </div>
                    </div>
                </div>
            </div>
            
    );
}
    export default RecordAudio;