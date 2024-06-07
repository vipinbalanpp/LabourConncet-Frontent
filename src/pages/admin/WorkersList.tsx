import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../components/admin/AdminSidebar";
import WorkerListTable from "../../components/admin/WorkerListTable";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { getAllWorkers } from "../../redux/actions/adminActions";
import { Button, ButtonGroup } from "@mui/material";

const WorkersList = () => {
  const workers = useSelector((state: RootState) => state.admin.workers);
  const dispatch = useDispatch<AppDispatch>();
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    if (!workers.length) {
      const response = dispatch(getAllWorkers());
      console.log(response);
    }
  }, []);
  const filteredWorkers = workers.filter((worker) => {
    if (filter === "active") return !worker.blocked;
    if (filter === "blocked") return worker.blocked;
    return true;
  });
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
              All workers
            </Button>
            <Button
              variant={filter === "active" ? "contained" : "outlined"}
              onClick={() => setFilter("active")}
            >
              Active workers
            </Button>
            <Button
              variant={filter === "blocked" ? "contained" : "outlined"}
              onClick={() => setFilter("blocked")}
            >
              Blocked workers
            </Button>
          </ButtonGroup>
        </div>
        <WorkerListTable workers={filteredWorkers} />
      </div>
    </div>
  );
};
export default WorkersList;
