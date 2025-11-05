import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BusinessTable from '../components/tables/BusinessTable';
import PageContainer from "../components/PageContainer";
import { Button, IconButton, Stack, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
function BusinessListPage() {
  const [business, setBusiness] = useState([]);
  const navigate = useNavigate();
 
  const fetchBusiness = async () => {
        const items = await window.api.product.list();
    setBusiness(items);
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
              <IconButton size="small" aria-label="refresh"
              //  onClick={handleRefresh}
               >
                <RefreshIcon />
              </IconButton>
            </div>
          </Tooltip>
          <Button
            variant="contained"
            onClick={()=>navigate("/add-products")}
            startIcon={<AddIcon />}
          >
            Create
          </Button>
        </Stack>
      }
    >
        <BusinessTable business={business}/>
    </PageContainer>
  );
}

export default BusinessListPage;
