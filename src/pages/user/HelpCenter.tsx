import Help from "../../components/public/Help"
import UserSidebar from "../../components/user/UserSidebar"


const HelpCenter = () => {
    return (
        <div className="flex">
            <UserSidebar/>
            <Help/>
        </div>
    )
}

export default HelpCenter
