import { useSelector } from "react-redux";

const Chat = () => {
    const user = useSelector((store) => store.user);
    
    


    
    return (
        <div className="w-2/4 mx-auto border border-gray-600 m-5 h-[70vh]">

            <div className='flex items-center gap-4 border-b-2 border-gray-400 p-5  justify-center'>
                <img
                    src={user?.photoUrl}
                    alt={`${user?.firstName} ${user?.lastName}`}
                    className="h-12 w-12 rounded-full object-cover border border-gray-400  my-4"
                />
                <h1 className="font-bold text-2xl">Chat with {user?.firstName}</h1>
            </div>

            <div className="flex-1 overflow-y-scroll p-5 h-2/3 space-y-3">
                {/**here we will show all message */}
            </div>
            <div className="flex border-t border-gray-600 p-3">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 p-2 border border-gray-400 rounded text-white"
                />
                <button className="btn btn-primary ml-3">Send</button>
            </div>
        </div>
    )
}

export default Chat