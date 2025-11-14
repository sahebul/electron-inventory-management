import { IconButton, Stack, Tooltip } from "@mui/material";
import PageContainer from "../../components/PageContainer";
import { MyButton } from "../../components/UI";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const EditUserPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleRefresh = () => {
    fetchList();
  };
  const fetchList = async () => {
    const result = await window.db.execute(
      {
        model: "users",
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
    setData(result.data);
  };
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
          <MyButton
            buttonLable={"Create"}
            onClick={() => navigate("/add-user")}
            startIcon={<AddIcon />}
          />
        </Stack>
      }
    ></PageContainer>
  );
};
export default EditUserPage;
