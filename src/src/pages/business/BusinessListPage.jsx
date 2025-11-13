import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BusinessTable from "../../components/tables/BusinessTable";
import PageContainer from "../../components/PageContainer";
import {
  Alert,
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  useTheme,
} from "@mui/material";
import { useDialogs } from "../../hooks/useDialogs";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import DataTableDemo from "../../components/tables/DataTableDemo";
import { MyButton } from "../../components/UI";
function BusinessListPage() {
  const [business, setBusiness] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dialogs = useDialogs();
  const fetchBusiness = async () => {
    const result = await window.db.execute(
      {
        model: "business",
        action: "findMany",
      },
      {
        orderBy: {
          createdAt: "desc",
        },
      }
    );
    if (!result.success) {
      console.log("No records found");
      setError({ message: "No records found" });
      return null;
    }
    setBusiness(result.data);
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
          { model: "business", action: "delete" },
          { where: { id } }
        );
        if (!result.success) {
          console.log("No records found");
          return null;
        }
        fetchBusiness();
    }
  };
  const handleRefresh = () => {
    fetchBusiness();
  };
  const handleError = () => {
    // Alert
  };

  useEffect(() => {
    fetchBusiness();
  }, []);

  return (
    <PageContainer
      title={"Business"}
      breadcrumbs={[{ title: "Business" }]}
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
          <MyButton buttonLable={"Create"} onClick={()=>navigate("/add-business")} startIcon={<AddIcon />}/>
        </Stack>
      }
    >
      {error ? (
        <Box sx={{ flexGrow: 1 }}>
          <Alert severity="error">{error.message}</Alert>
        </Box>
      ) : (
        <DataTableDemo
          business={business}
          handleDeleteRow={handleDeleteRow}
          handleError={handleError}
        />
      )}

      {/* <BusinessTable business={business}/> */}
    </PageContainer>
  );
}

export default BusinessListPage;
