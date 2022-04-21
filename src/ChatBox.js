import './HomePage/HomePage.css';
import './InputBar';
import InputBar from './InputBar';

function ChatBox(props){
    var chats = props.chat
    console.log(chats)
    return(
            <div className="list-group chat">
                <ul className="m-b-0 no-dot scroll">
                     {chats && chats.map(msg =>
                        <li className="clearfix" key={msg.id}>
                            <div className={"message-data " + (msg.sentByMe ? '' : 'text-right')}>
                                <span className="message-data-time">{msg.time}</span>
                            </div>
                            <div className={"message " + (msg.sentByMe ? 'my-message' : 'other-message float-right')}> {msg.content} </div>
                        </li>)}

                    {/* <li className="clearfix">
                        <div className="message-data text-right">
                            <span className="message-data-time">10:12 AM, Today</span>
                        </div>
                        <div className="message other-message float-right">Are we meeting today?</div>
                    </li>
                    <li className="clearfix">
                        <div className="message-data">
                            <span className="message-data-time">10:15 AM, Today</span>
                        </div>
                        <div className="message my-message">Project has been already finished and I have results to show you.</div>
                    </li>
                    <li className="clearfix">
                        <div className="message-data">
                            <span className="message-data-time">10:15 AM, Today</span>
                        </div>
                        <div className="message my-message">Project has been already finished and I have results to show you.</div>
                    </li> */}
                </ul>
                <InputBar/>
            </div>
    );
}

export default ChatBox