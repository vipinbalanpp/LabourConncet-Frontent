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
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import Modal from "react-modal";
import { IWorkerDetailsForStore, WorkerListTableProps } from "../../interfaces/worker";
import { blockWorker, unBlockWorker } from "../../redux/actions/adminActions";



const WorkerListTable: React.FC<WorkerListTableProps> = ({ workers }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [blockModalIsOpen, setBlockModalIsOpen] = useState(false);
  const [unBlockModalIsOpen, setUnBlockModalIsOpen] = useState(false);
  const [selectedWorkerEmail, setSelectedWorkerEmail] = useState("");
  const [selectedWorker,setSelectedWorker] =useState<IWorkerDetailsForStore | null>(null);
  const [userDetailsModalIsOpen,setUserDetailsModalIsOpen] = useState(false)
  useEffect(()=>{
  },[workers])
  const handleBlock = ()=>{
      dispatch(blockWorker(selectedWorkerEmail))
     workers = workers.map(Worker =>        
        Worker.email === selectedWorkerEmail ? { ...Worker, blocked: true } : Worker
      );       
      setBlockModalIsOpen(false)
      }

  const handleUnBlock =()=>{
    dispatch(unBlockWorker(selectedWorkerEmail))
    workers = workers.map(Worker =>
      Worker.email === selectedWorkerEmail ? { ...Worker, blocked: false } : Worker
    ); 
    setUnBlockModalIsOpen(false)
  }
  const handleOpenBlockModal = (email:string) => {
    setSelectedWorkerEmail(email);
    setBlockModalIsOpen(true);
  };
  const handleOpenUnBlockModal = (email:string) => {
    setSelectedWorkerEmail(email);
    setUnBlockModalIsOpen(true);
  };
  const handleClickOnName = (worker:IWorkerDetailsForStore) =>{
    setSelectedWorker(worker)
    setUserDetailsModalIsOpen(true)
  }
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
            <TableCell
              sx={{ backgroundColor: "black", color: "white" }}
              align="right"
            >
            </TableCell>
            <TableCell
              sx={{ backgroundColor: "black", color: "white" }}
              align="right"
            >
            </TableCell>
            <TableCell
              sx={{ backgroundColor: "black", color: "white" }}
              align="right"
            >
              Registration Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workers.map((worker, index) => (
            <TableRow 
              key={worker.email}
              className={index % 2 ? "bg-gray-100" : ""}
            >
              <TableCell component="th" scope="row" className="text-base hover:text-blue-500 cursor-pointer hover:underline" onClick={() => handleClickOnName(worker)}>
                {worker.fullName}
              </TableCell>
              <TableCell align="right" className="text-base">
                {worker.email}
              </TableCell>
              <TableCell align="right" className="text-base">
  <span className={worker.blocked ? "text-red-500" : "text-green-500"}>
    {worker.blocked ? "Blocked" : "Active"}
  </span>
</TableCell>

              <TableCell>
                {!worker.blocked && (
                  <IconButton
                  onClick={() => handleOpenBlockModal(worker.email)}
                  >
                    <CheckCircleIcon color="primary" />
                  </IconButton>
                )}
                {worker.blocked && (
                  <IconButton
                  onClick={() => handleOpenUnBlockModal(worker.email)}
                  >
                    <BlockIcon color="secondary" />
                  </IconButton>
                )}
              </TableCell>
              <TableCell align="right" className="text-base">
              <span className={worker.verified ? "text-red-500" : "text-green-500"}>
              {worker.verified ? "Not Verified" : "Verified"}  </span>

              </TableCell>
              <TableCell align="right" className="text-base">
                {new Date(worker.createdAt).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
     <Modal
     isOpen={blockModalIsOpen}
     onRequestClose={ () => setBlockModalIsOpen(false)}
     className="fixed inset-0 flex items-center justify-center z-50"
     overlayClassName="fixed inset-0 bg-black bg-opacity-50"
   >
     <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
       <h2 className="text-xl text-black font-semibold mb-4">Confirmation</h2>
       <p className="mb-4 text-black">Are you sure you want to block this Worker?</p>
       <div className="flex justify-end mt-4 space-x-2">
         <Button className="bg-gray-500 text-white rounded px-4 py-2" onClick={() => setBlockModalIsOpen(false)}>Cancel</Button>
         <Button  className="bg-blue-500 text-white rounded px-4 py-2" onClick={handleBlock}>Confirm</Button>
       </div>
     </div>
   </Modal>
   <Modal
     isOpen={unBlockModalIsOpen}
     onRequestClose={ () => setUnBlockModalIsOpen(false)}
     className="fixed inset-0 flex items-center justify-center z-50"
     overlayClassName="fixed inset-0 bg-black bg-opacity-50"
   >
     <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
       <h2 className="text-xl text-black font-semibold mb-4">Confirmation</h2>
       <p className="mb-4 text-black">Are you sure you want to block this Worker?</p>
       <div className="flex justify-end mt-4 space-x-2">
         <Button className="bg-gray-500 text-white rounded px-4 py-2" onClick={() => setUnBlockModalIsOpen(false)}>Cancel</Button>
         <Button  className="bg-blue-500 text-white rounded px-4 py-2" onClick={handleUnBlock}>Confirm</Button>
       </div>
     </div>
   </Modal>
   {userDetailsModalIsOpen &&
   
<Modal
  isOpen={userDetailsModalIsOpen}
  onRequestClose={() => setUserDetailsModalIsOpen(false)}
  className="fixed inset-0 flex items-center justify-center z-50 "
  overlayClassName="fixed inset-0 bg-black bg-opacity-50 rounded-md"
>
  <div className="bg-white  rounded-[10px]  p-14 w-full max-w-2xl shadow-lg">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold text-gray-900">Worker Details</h2>
      <IconButton onClick={() => setUserDetailsModalIsOpen(false)}>
        <span className="text-red-500 text-2xl">×</span>
      </IconButton>
    </div>
    <div className="flex flex-col sm:flex-row gap-6">
      <div className="flex-shrink-0 mx-auto sm:mx-0">
        <div className="w-32 h-32 overflow-hidden rounded-full border border-gray-200">
          <img
            src={selectedWorker?.profileImageUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="space-y-4 flex-1">
        <p className="text-gray-700"><span className="font-semibold">Name:</span> {selectedWorker?.fullName}</p>
        <p className="text-gray-700"><span className="font-semibold">Email:</span> {selectedWorker?.email}</p>
        <p className="text-gray-700"><span className="font-semibold">Expertise In:</span> {selectedWorker?.expertiseIn}</p>
        <p className="text-gray-700"><span className="font-semibold">Mobile Number:</span> {selectedWorker?.mobileNumber}</p>
        <p className="text-gray-700"><span className="font-semibold">Experience:</span> {selectedWorker?.experience} years</p>
        <p className="text-gray-700"><span className="font-semibold">Service Charge:</span> ₹ {selectedWorker?.serviceCharge}/hour</p>
        <p className="text-gray-700"><span className="font-semibold">About:</span> {selectedWorker?.about}</p>
        <div>
          <p className="text-lg font-semibold text-gray-900">Address</p>
          <p className="text-gray-700"><span className="font-semibold">House Name:</span> {selectedWorker?.address.houseName}</p>
          <p className="text-gray-700"><span className="font-semibold">Street:</span> {selectedWorker?.address.street}</p>
          <p className="text-gray-700"><span className="font-semibold">City:</span> {selectedWorker?.address.city}</p>
          <p className="text-gray-700"><span className="font-semibold">State:</span> {selectedWorker?.address.state}</p>
          <p className="text-gray-700"><span className="font-semibold">Pincode:</span> {selectedWorker?.address.pincode}</p>
        </div>
      </div>
    </div>
  </div>
</Modal>



   }
   </>
  );
};

export default WorkerListTable;
