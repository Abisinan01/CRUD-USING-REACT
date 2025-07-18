import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { type RootState } from '../../redux/store';

const UserInfo = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth)
    console.log(user?.username, "Usersdata")
    return (
        <>
            <div className="bg-gray-800/80 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all">
                <div className="flex flex-col sm:flex-row items-center p-4 sm:space-x-4 space-y-4 sm:space-y-0">
                    <div className="w-20 h-20 rounded-full border-2 border-violet-600 overflow-hidden">
                        {user?.profile ? (
                            <img
                                src={user?.profile}
                                alt="avatar"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full bg-gray-700">
                                <FaUser className="text-4xl text-gray-400" />
                            </div>
                        )}
                    </div>
                    <p className="text-lg font-handwriting">{user?.username}</p>
                    <button
                        className="px-3 py-1 bg-transparent hover:bg-violet-900 border border-gray-600 rounded text-sm font-handwriting"
                        onClick={() => navigate('/profile')}
                    >
                        Profile
                    </button>
                </div>

                <div className="border-t border-gray-600" />

                <div className="p-4 bg-gray-800/80 text-left">
                    <p className="font-handwriting">
                        Email : <span className="font-bold">{user?.email}</span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default UserInfo