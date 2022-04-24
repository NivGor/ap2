import React from "react";
import { useState, useEffect } from "react";

function RecordAudio(props) {
  var source = ''
  var chat = props.chat
  console.log(props)
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [notImgError, setNotImgError] = useState("");
  const [canRecord, setCanRecord] = useState(true)
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
    props.setChat([...chat, {id: chat.length, content: 'An image', time: props.getTime(), sentByMe: true, img: true, imgSrc: source}])
    console.log(props.user.userName)
    props.updateContactChat(props.user.userName, props.contact.userName, {id: chat.length, content: 'An image', time: props.getTime(), sentByMe: true, img: true, imgSrc: source})
    let fileSelected = document.getElementById('file');
    fileSelected.value = ""
    console.log(chat)
  };
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
                //function to catch error
                mediaRecorder.onerror = (e) => {
                    alert(e.error);
                }

                mediaRecorder.onstop = (e) => {
                    let blod = new Blob(chunks);
                    //create url for audio
                    let url = URL.createObjectURL(blod);
                    //pass url into audio tag
                    audio.src = url;
                }
                if (stopRecord) {
                    stopRecord.addEventListener('click', () => {
                        console.log(canRecord)
                        if (mediaRecorder.state == 'inactive') {
                            mediaRecorder.start()
                        }
                        mediaRecorder.stop();
                        setCanRecord(false)
                    })
                }
            })
        }
    }

  return (
    <div className="modal fade" id="recordAudio" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Record Audio</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <audio id="audio" controls></audio>
          </div>
          <div className="modal-footer">
                           <button type="button" name="record" className="btn btn-success">Record</button>
                           <button type="button" name="stop" className="btn btn-danger" >Stop</button>
                           <button type="button" className="btn btn-primary" >Send Voice Message</button>
                        </div>
                    </div>
                </div>
            </div>
            
    );
}
    export default RecordAudio;
    // <div className="RecordAudioBackground">
    //   <div className="RecordAudioContainer">
    //     <button onClick={exitRecordAudio}> X </button>
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