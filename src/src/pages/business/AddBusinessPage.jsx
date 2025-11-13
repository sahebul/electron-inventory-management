import { useState } from "react";
import PageContainer from "../../components/PageContainer";
import { BusinessForm } from "../../components/forms";
import CustomAlert from "../../components/CustomAlert";

const AddBusinessPage = () => {
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

  



  function resetForm() {
    setFormState(INITIAL_VALUES);
  }

 
  
const handleFileChange = (file_path) => {
  setFormState({
      ...formState,
      values: {
        ...formState.values,
        logo: file_path,
      },
    });
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit handle", formState.values);
    if(formState.values.logo){
      try{
             const upload = await window.db.uploadFile(formState.values.logo);
      }catch(error){

      }
    }
   

    setIsSubmitting(true);
    const result = await window.db.execute(
      { model: "business", action: "create" },
      { data: formState.values }
    );
    setIsSubmitting(false);
    if (!result.success) {
      setFormState({ ...formState, errors: result.data });
      console.log(result);
    } else {
      resetForm();
      setAlert({
        open: true,
        type: "success",
        message: "Successfully Record Created...",
      });
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
      title="New Business"
      breadcrumbs={[{ title: "Business", path: "/business" }, { title: "New" }]}
    >
      <CustomAlert alert={alert} onClose={handleCloseAlert} />
      <BusinessForm
        formState={formState}
        handleFormFieldChange={handleFormFieldChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
        isSubmitting={isSubmitting}
        submitButtonLabel="Create"
      />
    </PageContainer>
  );
};

export default AddBusinessPage;
