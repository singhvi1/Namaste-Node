import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket"

const Chat = () => {

    const connection = useSelector((store => store.connection))
    const user = useSelector((store) => store.user)
    const userId = user?._id
    const userFirstName = user?.firstName
    const { firstName, lastName, photoUrl } = connection || {};
    const { targetUserId } = useParams()

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        if (!userId || !targetUserId || !connection) return;
        const socket = createSocketConnection();

        socket.emit("joinChat", { userId, targetUserId, userFirstName })
        console.log(user?._id, +" userId ," + targetUserId + " targetId " + user?.firstName);

        socket.on("messageRecieved",({userFirstName,text})=>{
            setMessages((messages)=>[...messages,{userFirstName,text}])
            console.log(userFirstName + " sendMessage " + text);
        })

        

    }, [user?._id, targetUserId, connection, userId, userFirstName, user?.firstName])


    const sendMessage = () => {
        const socket = createSocketConnection()
        socket.emit("sendMessage", { userFirstName, userId, targetUserId, text: newMessage });
        setNewMessage("");
    }
    return (
        <div className="w-2/4 mx-auto border border-gray-600 m-5 h-[70vh]">

            <div className='flex items-center gap-4 border-b-2 border-gray-400 p-5  justify-center'>
                <img
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                    className="h-12 w-12 rounded-full object-cover border border-gray-400  my-4"
                />
                <h1 className="font-bold text-2xl">Chatting with {firstName}</h1>
            </div>

            <div className="flex-1 overflow-y-scroll p-5 h-2/3 space-y-3">
                {/**here we will show all message */}
                {messages.map((message, index) => {
                    return (

                        <div className="" key={index}>
                            <div className="chat chat-start">
                                <div className="chat-header">
                                    {message?.userFirstName}
                                    <time className="text-xs opacity-50">2 hours ago</time>
                                </div>
                                <div className="chat-bubble">{message.text}</div>
                                <div className="chat-footer opacity-50">Seen</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="flex border-t border-gray-600 p-3">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 p-2 border border-gray-400 rounded text-white"
                    value={newMessage}
                    onChange={(e) => (setNewMessage(e.target.value))}
                    onKeyDown={(e)=>{
                        if(e.key==="Enter"){
                            sendMessage();
                        }
                    }}
                />
                <button onClick={sendMessage} className="btn btn-primary ml-3">Send</button>
            </div>
        </div>
    )
}

export default Chat