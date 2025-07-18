import { useNavigate } from "react-router-dom";
import ProfileCard from "../../components/Cards/ProfileCard";
import Navbar from "../../components/Navabar/Navbar";

const Profile = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col items-center justify-center p-4">
            <Navbar />
            <ProfileCard />
            <span className="cursor-pointer text-white relative right-44 text-sm p-2" onClick={()=>navigate('/')}>Go back</span>
        </div>
    );
};

export default Profile;
