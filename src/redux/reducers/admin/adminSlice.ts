import { createSlice } from "@reduxjs/toolkit";
import { IUserDetailsForStore } from "../../../interfaces/user";
import {
  blockUser,
  blockWorker,
  getAllUsers,
  getAllWorkers,
  unBlockUser,
  unBlockWorker,
} from "../../actions/adminActions";
import toast from "react-hot-toast";
import { IWorkerDetailsForStore } from "../../../interfaces/worker";

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    users: [] as IUserDetailsForStore[],
    workers: [] as IWorkerDetailsForStore[],
    error: null as string | null,
    loading: false as boolean,
  },
  reducers: {
    setUsers: (state, action) => {
      const users = state.users.filter((user) => {
        return user.email === action.payload
          ? (user.blocked = !user.blocked)
          : user;
      });
      state.users = users;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(blockUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload);
        // state.users = action.payload
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(unBlockUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unBlockUser.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload);
        // state.users = action.payload
      })
      .addCase(unBlockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getAllWorkers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllWorkers.fulfilled, (state, action) => {
        state.loading = false;
        console.log(
          action.payload,
          "--------------------> workers from admin slice"
        );

        state.workers = action.payload;
      })
      .addCase(getAllWorkers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(blockWorker.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(blockWorker.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload);
      })
      .addCase(blockWorker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(unBlockWorker.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unBlockWorker.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(action.payload);
        // state.users = action.payload
      })
      .addCase(unBlockWorker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { setUsers } = adminSlice.actions;
export default adminSlice.reducer;
