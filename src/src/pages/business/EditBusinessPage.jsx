import { useEffect, useState } from "react";
import PageContainer from "../../components/PageContainer";
import { BusinessForm } from "../../components/forms";
import CustomAlert from "../../components/CustomAlert";
import { useParams, useNavigate } from "react-router-dom";
const EditBusinessPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    fetchById();
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

  const fetchById = async () => {
    const result = await window.db.execute(
      { model: "business", action: "findUnique" },
      { where: { id } }
    );
    if (result.success) {
      setFormState({
        ...formState,
        values: result.data,
      });
    }
    console.log("recods of edit", result);
  };

  function resetForm() {
    setFormState(INITIAL_VALUES);
    navigate(-1);
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
    console.log("submit edit handle", formState.values);
    setIsSubmitting(true);

    const result = await window.db.execute(
      { model: "business", action: "update" },
      {
        where: { id },
        data: formState.values,
      }
    );
    setIsSubmitting(false);
    if (!result.success) {
      setFormState({ ...formState, errors: result.data });
      console.log(result);
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
      title="Edit Business"
      breadcrumbs={[
        { title: "Business", path: "/business" },
        { title: "Edit" },
      ]}
    >
      <CustomAlert alert={alert} onClose={handleCloseAlert} />
      <BusinessForm
        formState={formState}
        handleFormFieldChange={handleFormFieldChange}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
        isSubmitting={isSubmitting}
        submitButtonLabel="Update"
      />
    </PageContainer>
  );
};

export default EditBusinessPage;
