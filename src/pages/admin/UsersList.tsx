import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllUsers, blockUser, unBlockUser } from "../../redux/actions/adminActions";
import UserListTable from "../../components/admin/UserListTable";
import { Button, ButtonGroup } from "@mui/material";
import { setUsers } from "../../redux/reducers/admin/adminSlice";

const UsersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.admin.users);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!users.length) {
      dispatch(getAllUsers());
    }
  }, [dispatch, users.length]);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  useEffect(() => {
    const filterUsers = () => {
      if (filter === "active") return users.filter((user) => !user.blocked);
      if (filter === "blocked") return users.filter((user) => user.blocked);
      return users;
    };
    setFilteredUsers(filterUsers());
  }, [filter, users]);

  const handleBlockUser = (email:string) => {
    dispatch(setUsers(email))
    dispatch(blockUser(email)).then(() => {
      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, blocked: true } : user
        )
      );
    });
  };

  const handleUnBlockUser = (email:string) => {
    dispatch(setUsers(email))
    dispatch(unBlockUser(email)).then(() => {
      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, blocked: false } : user
        )
      );
    });
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-grow p-4">
        <div className="flex justify-center mt-10">
          <ButtonGroup
            size="large"
            variant="outlined"
            aria-label="Basic button group"
          >
            <Button
              variant={filter === "all" ? "contained" : "outlined"}
              onClick={() => setFilter("all")}
            >
              All Users
            </Button>
            <Button
              variant={filter === "active" ? "contained" : "outlined"}
              onClick={() => setFilter("active")}
            >
              Active Users
            </Button>
            <Button
              variant={filter === "blocked" ? "contained" : "outlined"}
              onClick={() => setFilter("blocked")}
            >
              Blocked Users
            </Button>
          </ButtonGroup>
        </div>
        <UserListTable
          users={filteredUsers}
          onBlockUser={handleBlockUser}
          onUnBlockUser={handleUnBlockUser}
        />
      </div>
    </div>
  );
};

export default UsersList;
