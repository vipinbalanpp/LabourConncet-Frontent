import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import instance from "../../config/axiozConfig";
import { Iservice } from "../../interfaces/admin";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Box, Button } from "@mui/material";
import Modal from "react-modal";

const ServicesTable = () => {
  const [services, setServices] = useState<Iservice[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getServices = async () => {
      const { data } = await instance.get(`user/api/v1/get-services`);
      console.log(data, "data from table");

      setServices(data);
    };
    getServices();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target && e.target.result) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  // const handleSubmit = () =>{
  //   if(!serviceName)
  // }

  return (
    <>
      <div>
        <div className="flex justify-end mr-24">
          <button
            className="border bg-blue-600 rounded-[10px] px-4 py-3 mt-3 text-white font-semibold flex"
            onClick={() => setIsModalOpen(true)}
          >
            Create new Service <FaPlus className="mx-2 mt-1" />
          </button>
        </div>
        <TableContainer className="p-3 w-full">
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: "black", color: "white" }}>
                  ServiceName
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "black", color: "white" }}
                  align="right"
                >
                  description
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services?.map((service) => (
                <TableRow key={service.serviceName} className="bg-gray-100">
                  <TableCell component="th" scope="row" className="text-base">
                    {service.serviceName}
                  </TableCell>
                  <TableCell align="right" className="text-base">
                    {service.description}{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className="fixed inset-0 flex items-center justify-center z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <Box className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-xl text-center text-black font-semibold mb-4">
              Create New Service
            </h2>
            <div className="flex justify-center">
              <div className="relative flex items-center justify-center w-20 h-20 rounded-full border-gray-300 shadow-2xl bg-white overflow-hidden mt-1">
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 4.5C9.51472 4.5 7.5 6.51472 7.5 9C7.5 11.4853 9.51472 13.5 12 13.5C14.4853 13.5 16.5 11.4853 16.5 9C16.5 6.51472 14.4853 4.5 12 4.5ZM12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9C15 10.6569 13.6569 12 12 12Z" />
                    <path d="M21 19.5C21 18.6716 20.3284 18 19.5 18H4.5C3.67157 18 3 18.6716 3 19.5C3 19.7757 3.22428 20 3.5 20H20.5C20.7757 20 21 19.7757 21 19.5Z" />
                  </svg>
                )}
                <input
                  type="file"
                  name="icon"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
            <input
              type="text"
              className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
              placeholder="Enter the service name"
              onChange={(e)=>setServiceName(e.target.value)}
            />
            <input
              type="text"
              className="bg-white w-full border text-black border-yellow-400 p-2 m-2"
              placeholder="Enter the description"
              onChange={(e)=>setDescription(e.target.value)}
            />
            <div className="flex justify-end mt-4 space-x-2">
              <Button
                variant="contained"
                color="warning"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                // onClick={}
              >
                Confirm
              </Button>
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ServicesTable;
