import './HomePage/HomePage.css';
import './InputBar';
import InputBar from './InputBar';

function ChatBox(){

    return(
        <div>
            <div className="list-group chat">
                <ul className="m-b-0">
                    <li className="clearfix">
                        <div className="message-data text-right">
                            <span className="message-data-time">10:10 AM, Today</span>
                        </div>
                        <div className="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>
                    </li>
                    <li className="clearfix">
                        <div className="message-data">
                            <span className="message-data-time">10:12 AM, Today</span>
                        </div>
                        <div className="message my-message">Are we meeting today?</div>
                    </li>
                    <li className="clearfix">
                        <div className="message-data">
                            <span className="message-data-time">10:15 AM, Today</span>
                        </div>
                        <div className="message my-message">Project has been already finished and I have results to show you.</div>
                    </li>
                </ul>
                <InputBar/>
            </div>
        </div>
    );
}

export default ChatBox