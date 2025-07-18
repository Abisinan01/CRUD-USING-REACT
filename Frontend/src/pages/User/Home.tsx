import { useSelector } from 'react-redux';
import UserInfo from '../../components/Cards/UserInfo';
import type { RootState } from '../../redux/store';
import Navbar from '../../components/Navabar/Navbar';
import { Footer } from 'flowbite-react';

const Home = () => {
  const { user } = useSelector((state: RootState) => state.auth)
  console.log(user?.username, "Usersdata")

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black min-h-screen text-white flex flex-col items-center justify-between">
      <Navbar />

      <div className="w-full max-w-lg text-center pt-24 px-4">
        <h1 className="text-2xl md:text-3xl font-handwriting mb-6">
          Welcome {user?.username}
        </h1>
        <UserInfo />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
