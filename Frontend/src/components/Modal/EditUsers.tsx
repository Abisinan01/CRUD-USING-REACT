import axios from 'axios';
import React, { useEffect, useId, useState } from 'react'
import { RxCross2 } from 'react-icons/rx';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../redux/store';
import { toast } from 'react-toastify';
const localUrl = import.meta.env.VITE_API_URL

interface Props {
  show: boolean;
  onClose: () => void;
  children?: any;
  userId: string
}

interface IUser {
  username: string;
  email: string;
  id: string
}
const EditUsers = ({ show, onClose, userId }: Props) => {
  if (!show) return
  const navigate = useNavigate()
  const { usersList } = useSelector((state: RootState) => state.adminUsers)
  const [formData, setFormData] = useState<IUser>({
    username: "",
    email: "",
    id: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  console.log("Users ", usersList)
  const user = usersList.find(u => u._id === userId)

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        username: user?.username.trim() || '',
        email: user?.email.trim() || '',
        id: user?._id.trim() || ''
      }));

    }
  },[user])
  console.log(user, 'Ddata for edit')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!formData.username || !formData.email) {
        toast.error("Please fill the fields")
        return
      }
      const response = await axios.post(`${localUrl}/admin/edit-user`, { formData });
      
      if (response.data.success === false) {
        toast.error(response.data.message)
        return
      }

      toast.success(response.data.message)
      navigate("/admin/login")
      setFormData({
        username: '',
        email: '',
        id: ''
      });

    } catch (error: any) {
      console.log(error)
      toast.error("Updation error")
    }
  };



  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>

        <button onClick={onClose} className="text-white text-2xl mb-2"><RxCross2 /></button>
        <div className="p-[1px] bg-gradient-to-r from-neutral-500 via-blue-700 to-neutral-800 rounded-sm">
          <div className="bg-black rounded-sm w-[400px] max-w-md p-10 flex flex-col items-center">
            <span className="text-white text-2xl font-mono mb-6">Edit user</span>

            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full space-y-4">

              <div className="w-full">
                <input
                  type="text"
                  name="username"
                  placeholder={formData?.username}
                  value={formData?.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              <div className="w-full">
                <input
                  type="text"
                  name="email"
                  placeholder={formData?.email}
                  value={formData?.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-blue-800 to-purple-800 text-white rounded hover:opacity-90 transition"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUsers