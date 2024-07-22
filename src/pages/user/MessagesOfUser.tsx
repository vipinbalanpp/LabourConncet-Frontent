import Messages from "../../components/public/Messages"
import UserSidebar from "../../components/user/UserSidebar"


const MessagesOfUser = () => {
    return (
        <div className="flex">
            <UserSidebar/>
            <Messages/>
        </div>
    )
}

export default MessagesOfUser
