import { useState,useEffect} from "react";
import CustomAlert from "../../components/CustomAlert";
import UserForm from "../../components/forms/UserForm";
import PageContainer from "../../components/PageContainer";

const AddUserPage = () => {
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

  useEffect(()=>{
    fetchBusiness();
  },[])


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

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };
  function handleFormFieldChange(e) {
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        [e.target.name]: e.target.value,
      },
    });
  }
  const handleReset = () => {
    setFormState(INITIAL_VALUES);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await window.db.execute(
      { model: "user", action: "create" },
      { data: formState.values }
    );
    setIsSubmitting(false);
    if (!result.success) {
      setFormState({ ...formState, errors: result.data });
      console.log(result);
    } else {
      handleReset();
      setAlert({
        open: true,
        type: "success",
        message: "Successfully Record Created...",
      });
    }
  };

  return (
    <PageContainer
      title="New Users"
      breadcrumbs={[{ title: "Users", path: "/users" }, { title: "New" }]}
    >
      <CustomAlert alert={alert} onClose={handleCloseAlert} />
      <UserForm
        formState={formState}
        handleFormFieldChange={handleFormFieldChange}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
        isSubmitting={isSubmitting}
        business={business??[]}
        submitButtonLabel="Create"
      />
    </PageContainer>
  );
};
export default AddUserPage;
