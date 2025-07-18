// src/redux/adminUserSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type User = {
  _id: string;
  username: string;
  email: string;
  profile: string;
};

type AdminUserState = {
  usersList: User[];
};

const initialState: AdminUserState = {
  usersList: [],
};

const adminUserSlice = createSlice({
  name: "adminUsers",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.usersList = action.payload;
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.usersList = state.usersList.filter(user => user._id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.usersList.findIndex(u => u._id === action.payload._id);
      if (index !== -1) {
        state.usersList[index] = action.payload;
      }
    },
    clearList: (state) => {
      state.usersList = []
    }
  },
});

export const { setUsers, removeUser, updateUser,clearList } = adminUserSlice.actions;
export default adminUserSlice.reducer;
