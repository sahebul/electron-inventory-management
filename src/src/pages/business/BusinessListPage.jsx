import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BusinessTable from "../../components/tables/BusinessTable";
import PageContainer from "../../components/PageContainer";
import { Button, IconButton, Stack, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import DataTableDemo from "../../components/tables/DataTableDemo";
function BusinessListPage() {
  const [business, setBusiness] = useState([]);
  const navigate = useNavigate();

  const fetchBusiness = async () => {
    const result = await window.db.execute({
      model: "business",
      action: "findMany",
    },{
      orderBy:{
        createdAt:'desc'
      }
    });
    if (!result.success) {
      console.log("No records found");
      return null;
    }
    setBusiness(result.data);
  };

  const handleDeleteRow = async (id) => {
    const result = await window.db.execute(
      { model: "business", action: "delete" },
      { where: { id } }
    );
    if (!result.success) {
      console.log("No records found");
      return null;
    }
    fetchBusiness();
  };
  const handleRefresh=()=>{
    fetchBusiness();
  }

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
          <Button
            variant="contained"
            onClick={() => navigate("/add-business")}
            startIcon={<AddIcon />}
          >
            Create
          </Button>
        </Stack>
      }
    >
      {/* <BusinessTable business={business}/> */}
      <DataTableDemo business={business} handleDeleteRow={handleDeleteRow} />
    </PageContainer>
  );
}

export default BusinessListPage;
