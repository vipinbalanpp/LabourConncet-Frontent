import AdminSidebar from "../../components/admin/AdminSidebar";
import ServicesTable from "../../components/admin/ServicesTable";

const ServiceList = () => {
  return (
    <>
      
      <div className="flex">
        <AdminSidebar />
        <div className="w-full">
        <ServicesTable />
        </div>
      </div>
    </>
  );
};

export default ServiceList;
