import { Alert, Box, IconButton, Stack, Tooltip } from "@mui/material";
import PageContainer from "../../components/PageContainer";
import { MyButton } from "../../components/UI";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import UserTable from "../../components/tables/UserTable";
import { useDialogs } from "../../hooks/useDialogs";
const UserListPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dialogs = useDialogs();
  const handleRefresh = () => {
    fetchList();
  };
  useEffect(()=>{
    fetchList();
  },[])
  const fetchList = async () => {
    const result = await window.db.execute(
      {
        model: "user",
        action: "findMany",
      },
      {
        orderBy: {
          createdAt: "desc",
        },
        include:{
          business:true
        }
      }
    );
    if (!result.success) {
      console.log("No records found");
      setError({ message: "No records found" });
      return null;
    }
    console.log("user list",result.data);
    setData(result.data);
  };
  const handleDeleteRow = async (id) => {

    const confirmed = await dialogs.confirm("Do you wish to delete?", {
      title: "Delete business?",
      severity: "error",
      okText: "Delete",
      cancelText: "Cancel",
    });

    console.log(confirmed);

    if(confirmed){
        const result = await window.db.execute(
          { model: "user", action: "delete" },
          { where: { id } }
        );
        if (!result.success) {
          console.log("No records found");
          return null;
        }
        fetchList();
    }
  };
   const handleError = () => {
    // Alert
  };
  return (
    <PageContainer
      title={"Users"}
      breadcrumbs={[{ title: "Users" }]}
      actions={
        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title="Reload data" placement="right" enterDelay={1000}>
            <div>
              <IconButton
                size="small"
                aria-label="refresh"
                onClick={handleRefresh}
              >
                <RefreshIcon />
              </IconButton>
            </div>
          </Tooltip>
          <MyButton
            buttonLable={"Create"}
            onClick={() => navigate("/add-user")}
            startIcon={<AddIcon />}
          />
        </Stack>
      }
    >

          {error ? (
        <Box sx={{ flexGrow: 1 }}>
          <Alert severity="error">{error.message}</Alert>
        </Box>
      ) : (
        <UserTable
          data={data}
          handleDeleteRow={handleDeleteRow}
          handleError={handleError}
        />
      )}



    </PageContainer>
  );
};
export default UserListPage;
