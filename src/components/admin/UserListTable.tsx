import React, {  useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { faLock, faLockOpen, faUser } from "@fortawesome/free-solid-svg-icons";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, IconButton } from "@mui/material";
import Modal from "react-modal";
import { UserListTableProps } from "../../interfaces/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserListTable: React.FC<UserListTableProps> = ({ users, onBlockUser }) => {
  const [blockModalIsOpen, setBlockModalIsOpen] = useState(false);
  const [unBlockModalIsOpen, setUnBlockModalIsOpen] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState("");
  const[reason,setReason] = useState('')
  const[reasonError,setReasonError] = useState(false)

  const handleOpenBlockModal = (email:string) => {
    setSelectedUserEmail(email);
    setBlockModalIsOpen(true);
  };

  const handleOpenUnBlockModal = (email:string) => {
    setSelectedUserEmail(email);
    setUnBlockModalIsOpen(true);
  };
  const handleBlock = () =>{
      if(reason.trim() && reason.trim().length <10){
        console.log(reason,'reason');
        setReasonError(true)
        onBlockUser(selectedUserEmail)
        setBlockModalIsOpen(false)
      }
      console.log('this is log',unBlockModalIsOpen);
      if(unBlockModalIsOpen){
        
        onBlockUser(selectedUserEmail)
        setUnBlockModalIsOpen(false)
      }
  }

  return (
    <>
      <TableContainer className="mt-5 rounded-xl">
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
            <TableCell sx={{ backgroundColor: "rgb(234,179,8)", color: "white" }}>
                Profile Image
              </TableCell>
              <TableCell sx={{ backgroundColor: "rgb(234,179,8)", color: "white" }}>
                Name
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "rgb(234,179,8)", color: "white" }}
           
              >
                Email
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "rgb(234,179,8)", color: "white" }}
               
              >
                Status
              </TableCell>
              <TableCell sx={{ backgroundColor: "rgb(234,179,8)", color: "white" }} >
                Action
              </TableCell>
              <TableCell sx={{ backgroundColor: "rgb(234,179,8)", color: "white" }} >
                Registration Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email} className= "bg-white">
               <TableCell component="th" scope="row" className="text-base">
  {user.profileImageUrl ? (
    <img className="w-11 rounded-full h-11" src={user.profileImageUrl} alt="User Avatar" />
  ) : (
    <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center">
      <FontAwesomeIcon icon={faUser} className="text-gray-500" />
    </div>
  )}
</TableCell>
                <TableCell component="th" scope="row" className="text-base">
                  {user.fullName}
                </TableCell>
                <TableCell  className="text-base">
                  {user.email}
                </TableCell>
                <TableCell className="text-base">
                 <p className={!user.blocked?'text-green-500' : 'text-red-500'}> {user.blocked ? "Blocked" : "Active"}</p>
                </TableCell>
                <TableCell >
                  {!user.blocked ? (
                    <IconButton onClick={() => handleOpenBlockModal(user.email)}>
                     <FontAwesomeIcon icon={faLock}/>
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => handleOpenUnBlockModal(user.email)}>
                                           <FontAwesomeIcon icon={faLockOpen}/>

                    </IconButton>
                  )}
                </TableCell>
                <TableCell  className="text-base">
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
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="bg-white rounded-xl  p-6 w-1/3  shadow-lg transform  transition-transform duration-300 ease-out">
        <h2 className="text-xl font-semibold mb-4 text-center">Confirm Action</h2>
        <label htmlFor="blockReason" className="block text-sm pt-10 font-medium text-gray-700 mb-2">
          Enter the reason for blocking
        </label>
        <input
        onChange={(e) => {
          console.log(e.target.value);
          setReason(e.target.value)
          
        }}
          type="text"
          id="blockReason"
          placeholder="Reason.."
          required
          className="w-full p-2 border border-gray-300 rounded-xl bg-white h-20  text-black shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {reasonError && <p className="text-red-500 text-sm font-semibold">Enter a valid reason for blocking</p>}
        <div className="flex justify-end pt-10 mt-6 space-x-3">
          <button
            className="bg-gray-500 text-white rounded px-4 py-2 hover:bg-gray-600 transition-colors duration-200"
            onClick={() => setBlockModalIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white rounded px-4 py-2 transition-colors duration-200"
            onClick={() => handleBlock()}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
      <Modal
        isOpen={unBlockModalIsOpen}
        onRequestClose={() => setUnBlockModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Action</h2>
        <p className="mb-4 text-black">Are you sure you want to unblock this user?</p>
          <div className="flex justify-end mt-4 space-x-2">
            <Button
              className="bg-gray-500 text-white rounded px-4 py-2"
              onClick={() => setUnBlockModalIsOpen(false)}
              >
              Cancel
              </Button>
            <Button
              className="bg-blue-500 text-white rounded px-4 py-2"
              onClick={() => handleBlock()}
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
