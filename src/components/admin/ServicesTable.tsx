import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { FaEdit, FaPlus, FaSort } from "react-icons/fa";

import instance from "../../config/axiozConfig";
import { Iservice } from "../../interfaces/admin";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Modal from "react-modal";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllServices } from "../../redux/actions/adminActions";

const ServicesTable = () => {
  let servicesFromStore = useSelector((state:RootState) => state.admin.services)
  const dispatch = useDispatch<AppDispatch>()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [addServiceError,setAddServiceError]= useState('')
  const [services,setServices] = useState<Iservice[]>(servicesFromStore)
  const [serviceToBeEdited,setServiceToBeEdited] = useState<Iservice | null>(null)

  useEffect(() => {  
  }, [dispatch]);

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

  const handleSubmit = async() =>{
    if(!image && isModalOpen){
      setAddServiceError("Please provide an image for service")
      return
    }else if(!serviceName && isModalOpen){
        setAddServiceError("Please provide service name")
        return
      } else if(!serviceName && isModalOpen){
        setAddServiceError("Please provide a description for service")
        return
      }
      if(isModalOpen){
      const formData = new FormData();
      formData.append("file",image!)
      formData.append("upload_preset","ahfj5695")
         const imageResponse = await   axios.post('https://api.cloudinary.com/v1_1/dnue064gc/image/upload',formData)
         const serviceCredentials:Iservice = {
          serviceName,
          logo:imageResponse.data.secure_url,
          description
        } 
          try{
            await instance.post("/user/api/v1/create-service",serviceCredentials)
            dispatch(getAllServices())
            toast.success('Service created successfully')
            setImage(null)
            setServiceName('')
            setDescription('')
            setAddServiceError('')
          }catch(error:any) {
            toast.error(error.response.data)
            return
          } setIsModalOpen(false)
        }
        if(isEditModalOpen){
          try{
            const serviceDataForEditing = {
              serviceName:serviceName ? serviceName : serviceToBeEdited?.serviceName,
              logo:image? image : serviceToBeEdited?.logo,
              description:description ? description : serviceToBeEdited?.description
            }
            if(image){
              const formData = new FormData();
              formData.append("file",image!)
              formData.append("upload_preset","ahfj5695")
                 const imageResponse = await   axios.post('https://api.cloudinary.com/v1_1/dnue064gc/image/upload',formData)
                 if(!imageResponse){
                  toast.error("Unable to upload image");
                  return;
                 }
                 serviceDataForEditing.logo = imageResponse.data.secure_url
            }
            await instance.put(`/user/api/v1/edit-service?serviceName=${serviceToBeEdited?.serviceName}`,serviceDataForEditing)
            dispatch(getAllServices())
            toast.success('Service edited successfully')
            setImage(null)
            setServiceName('')
            setDescription('')
          }catch(error:any) {
            toast.error(error.response.data)
            return
          }setIsEditModalOpen(false)
        }    
  }

  return (
    <>
      <div>
        <div className="flex justify-end mr-24">
          <div className="flex mt-10">
          <button
            className="border bg-[rgb(234,179,8)]  px-3 me-5 rounded-[10px] text-white font-semibold flex"
            onClick={() => setIsModalOpen(true)}
          >
           <FaPlus className="text-sm mt-2" />
          </button>
            <input onChange={(e) =>setServices(servicesFromStore.filter(service=>service.serviceName.toLocaleLowerCase().startsWith(e.target.value.toLocaleLowerCase())))} className="bg-white border border-black me-1" type="text" />
            <button className="bg-[rgb(234,179,8)] px-2 me-4 py-1 text-white rounded-[7px]">Search</button>
          </div>
        </div>
        <TableContainer className="w-full rounded-xl mt-4">
          <Table aria-label="customized table">
            <TableHead >
            <TableRow sx={{ borderRadius: "5px" }}>
              <TableCell sx={{ backgroundColor: "rgb(234,179,8)", color: "white" }}>Logo
                </TableCell>
                <TableCell sx={{ backgroundColor: "rgb(234,179,8)", color: "white"  }}>
                  ServiceName
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "rgb(234,179,8)", color: "white" }}
                
                >
                  description
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "rgb(234,179,8)", color: "white" }}
             
                >Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services?.map((service) => (
                <TableRow key={service.serviceName} className="bg-gray-100">
                    <TableCell component="th" scope="row" className="text-base">
                    <img className="w-11 rounded-full h-11" src={service.logo} alt="" />
                  </TableCell>
                  <TableCell component="th" scope="row" className="text-base">
                    {service.serviceName}
                  </TableCell>
                  <TableCell  className="text-base">
                    {service.description}{" "}
                  </TableCell>
                  <TableCell align="right" className="text-base">
                  <FaEdit onClick={() => {
                    setServiceToBeEdited(service)
                    setIsEditModalOpen(true)
                  }} />
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
          className="fixed inset-0 flex items-center rounded-[6px] justify-center z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <Box className="bg-white rounded-[10px]  py-14 px-16 w-[450px] shadow-lg">
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
              className="bg-white w-full border mt-8 rounded-[8px] text-black outline-none focus:outline-blue-400 p-2 "
              placeholder="Enter the service name"
              onChange={(e)=>setServiceName(e.target.value)}
            />
            <input
              type="text"
          className="bg-white w-full border mt-4 text-black rounded-[8px] outline-none focus:outline-blue-400  p-2 "
              placeholder="Enter the description"
              onChange={(e)=>setDescription(e.target.value)}
            />
            {addServiceError && <p className="text-sm text-red-600 mt-5 text-center">{addServiceError}</p>}
            <div className="flex justify-end space-x-3 mt-9">
              <button
                onClick={() => setIsModalOpen(false)} 
                className="border px-5 rounded-[6px] py-2 bg-red-500 hover:opacity-95 text-white font-semibold "
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit} 
                className="border px-5 rounded-[6px] py-2 bg-blue-500 hover:opacity-95 text-white font-semibold "
              >
                Confirm
              </button>
            </div>
          </Box>
        </Modal>
      )}
       {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          className="fixed inset-0 flex items-center rounded-[6px] justify-center z-50"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <Box className="bg-white rounded-[10px]  py-14 px-16 w-[450px] shadow-lg">
            <h2 className="text-xl text-center text-black font-semibold mb-4">
              Edit Service
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
                  <img
                  src={serviceToBeEdited?.logo}
                  alt="Uploaded"
                  className="object-cover w-full h-full"
                />
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
              className="bg-white w-full border mt-8 rounded-[8px] text-black outline-none focus:outline-blue-400 p-2 "
              placeholder={serviceToBeEdited?.serviceName}
              onChange={(e)=>setServiceName(e.target.value)}
            />
            <input
              type="text"
              className="bg-white w-full border mt-4 text-black rounded-[8px] outline-none focus:outline-blue-400  p-2 "
              placeholder={serviceToBeEdited?.description}
              onChange={(e)=>setDescription(e.target.value)}
            />
            {addServiceError && <p className="text-sm text-red-600 mt-5 text-center">{addServiceError}</p>}
            <div className="flex justify-end space-x-3 mt-9">
              <button
                onClick={() => setIsEditModalOpen(false)} 
                className="border px-5 rounded-[6px] py-2 bg-red-500 hover:opacity-95 text-white font-semibold "
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit} 
                className="border px-5 rounded-[6px] py-2 bg-blue-500 hover:opacity-95 text-white font-semibold "
              >
                Confirm
              </button>
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ServicesTable;
