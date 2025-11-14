import { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import { UserForm } from "../../components/forms";
import CustomAlert from "../../components/CustomAlert";
import { useParams, useNavigate } from "react-router-dom";
const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetchById();
    fetchBusiness();
  }, [id]);
  const INITIAL_VALUES = {
    values: {},
    errors: {},
  };
  const [alert, setAlert] = useState({
    open: false,
    type: "success",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState(INITIAL_VALUES);
  const [business, setBusiness] = useState(null);

   


  const fetchBusiness=async()=>{
    try{
        const result=await window.db.execute(
            {model:'business',action:"findMany"},
            {
                select:{
                    id:true,
                    name:true
                }
            }
        )

          if (!result.success) {
            console.log("No records found");
            return null;
            }else{
                console.log("Fetch business list ",result.data);
                setBusiness(result.data);
            }
    }catch(error){
        console.log(error)
    }
  }

  const fetchById = async () => {
    const result = await window.db.execute(
      { model: "user", action: "findUnique" },
      { where: { id } }
    );
    if (result.success) {
      setFormState({
        ...formState,
        values: result.data,
      });
    }
  };

  function resetForm() {
    setTimeout(()=>{
      setFormState(INITIAL_VALUES);
      navigate(-1);
    },1000)
  
  }
  function handleFormFieldChange(e) {
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        [e.target.name]: e.target.value,
      },
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await window.db.execute(
      { model: "user", action: "update" },
      {
        where: { id },
        data: formState.values,
      }
    );
    setIsSubmitting(false);
    if (!result.success) {
      setFormState({ ...formState, errors: result.data });
    } else {
      setAlert({
        open: true,
        type: "success",
        message: "Successfully Record Updated...",
      });
      resetForm();
    }
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  function handleReset() {
    console.log("reset");
  }

  return (
    <PageContainer
      title="Edit User"
      breadcrumbs={[
        { title: "User", path: "/user" },
        { title: "Edit" },
      ]}
    >
      <CustomAlert alert={alert} onClose={handleCloseAlert} />
      <UserForm
        formState={formState}
        handleFormFieldChange={handleFormFieldChange}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
        isSubmitting={isSubmitting}
        business={business??[]}
        submitButtonLabel="Update"
      />
    </PageContainer>
  );
};

export default EditUserPage;
