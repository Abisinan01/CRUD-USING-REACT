import Navbar from '../../components/Navabar/AdminNavbar';
import UsersList from '../../components/Container/UsersList';

const AdminDashboard = () => {
  return (
    <div className="min-[h-screen] bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white relative overflow-x-hidden">
      <Navbar />
      <UsersList />
    </div>
  );
};

export default AdminDashboard;
