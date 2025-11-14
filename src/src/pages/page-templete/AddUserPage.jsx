import CustomAlert from "../../components/CustomAlert";
import UserForm from "../../components/forms/UserForm";
import PageContainer from "../../components/PageContainer";
import { useState,useEffect} from "react";
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
    console.log("submit handle", formState.values);
    if (formState.values.logo) {
      try {
        const upload = await window.db.uploadFile(formState.values.logo);
      } catch (error) {}
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

  return (
    <PageContainer
      title="New Users"
      breadcrumbs={[{ title: "Users", path: "/users" }, { title: "New" }]}
    >
      <CustomAlert alert={alert} onClose={handleCloseAlert} />
      <UserForm
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
export default AddUserPage;
