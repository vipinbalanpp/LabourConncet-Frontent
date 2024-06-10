import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, IconButton } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Modal from "react-modal";
import { UserListTableProps } from "../../interfaces/user";

const UserListTable: React.FC<UserListTableProps> = ({ users, onBlockUser, onUnBlockUser }) => {
  const [blockModalIsOpen, setBlockModalIsOpen] = useState(false);
  const [unBlockModalIsOpen, setUnBlockModalIsOpen] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState("");

  const handleOpenBlockModal = (email:string) => {
    setSelectedUserEmail(email);
    setBlockModalIsOpen(true);
  };

  const handleOpenUnBlockModal = (email:string) => {
    setSelectedUserEmail(email);
    setUnBlockModalIsOpen(true);
  };

  return (
    <>
      <TableContainer className="mt-5">
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: "black", color: "white" }}>
                Name
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "black", color: "white" }}
                align="right"
              >
                Email
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "black", color: "white" }}
                align="right"
              >
                Status
              </TableCell>
              <TableCell sx={{ backgroundColor: "black", color: "white" }} align="right">
                Action
              </TableCell>
              <TableCell sx={{ backgroundColor: "black", color: "white" }} align="right">
                Registration Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email} className= "bg-gray-100">
                <TableCell component="th" scope="row" className="text-base">
                  {user.fullName}
                </TableCell>
                <TableCell align="right" className="text-base">
                  {user.email}
                </TableCell>
                <TableCell align="right" className="text-base">
                  {user.blocked ? "Blocked" : "Active"}
                </TableCell>
                <TableCell align="right">
                  {!user.blocked ? (
                    <IconButton onClick={() => handleOpenBlockModal(user.email)}>
                      <CheckCircleIcon color="primary" />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleOpenUnBlockModal(user.email)}>
                      <BlockIcon color="secondary" />
                    </IconButton>
                  )}
                </TableCell>
                <TableCell align="right" className="text-base">
                  {new Date(user.createdAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        isOpen={blockModalIsOpen}
        onRequestClose={() => setBlockModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Confirm Action</h2>
          <p className="mb-4">Are you sure you want to block this user?</p>
          <div className="flex justify-end mt-4 space-x-2">
            <Button
              className="bg-gray-500 text-white rounded px-4 py-2"
              onClick={() => setBlockModalIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-500 text-white rounded px-4 py-2"
              onClick={() => {
                onBlockUser(selectedUserEmail);
                setBlockModalIsOpen(false);
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={unBlockModalIsOpen}
        onRequestClose={() => setUnBlockModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Confirm Action</h2>
          <p className="mb-4">Are you sure you want to unblock this user?</p>
          <div className="flex justify-end mt-4 space-x-2">
            <Button
              className="bg-gray-500 text-white rounded px-4 py-2"
              onClick={() => setUnBlockModalIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-500 text-white rounded px-4 py-2"
              onClick={() => {
                onUnBlockUser(selectedUserEmail);
                setUnBlockModalIsOpen(false);
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserListTable;
