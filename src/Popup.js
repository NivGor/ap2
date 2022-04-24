import React from "react";
import { useState, useEffect } from "react";

function Popup(props) {
  var source = ''
  // var image = document.getElementById('output');
  // image.src = URL.createObjectURL(source);
  var chat = props.chat
  // useEffect(() => {}, [props.chat]);
  console.log(props)
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [imgContent, setImgContent] = useState();

  const exitPopup = () => {
    props.setTrigger()
  }

  // const sendPhoto = () => {
  //   var img = document.createElement('img')
  //   img.src = 'data:image/jpeg;base64,' + btoa(atob(imgContent));
  //   // img.src = imgContent
  //   console.log(chat)
  //   props.setChat([...chat, {id: chat.length, content: img, time: 'fuck you', sentByMe: true}])
  //   props.updateContactChat(props.user.userName, props.contact.userName, {id: chat.length, content: img, time: 'fuck you', sentByMe: true})
  //   setImgContent()
  // }

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
    var image = document.getElementById('output');
    source = URL.createObjectURL(selectedFile)
    console.log("source is !!!!! " + source)
    image.src = source;
    props.setChat([...chat, {id: chat.length, content: 'An image', time: 'fuck you', sentByMe: true, img: true, imgSrc: source}])
    console.log(props.user.userName)
    props.updateContactChat(props.user.userName, props.contact.userName, {id: chat.length, content: 'An image', time: 'fuck you', sentByMe: true, img: true, imgSrc: source})
    console.log(chat)
  };

  return (props.trigger) ? (
    <div className="popupBackground">
      <div className="popupContainer">
        <button onClick={exitPopup}> X </button>
        <div className="title">
          <h1>Please upload a photo</h1>
        </div>
        <div className="body">
          <input type="file" name="file" onChange={changeHandler} id="file" />
          {isFilePicked ? (
            <div>
              <p>Filename: {selectedFile.name}</p>
              <p>Filetype: {selectedFile.type}</p>
              <p>Size in bytes: {selectedFile.size}</p>
              <p><img id="output" src={source} width="200" /></p>
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