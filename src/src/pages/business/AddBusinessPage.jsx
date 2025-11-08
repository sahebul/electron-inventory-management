import { useState } from "react";
import PageContainer from "../../components/PageContainer"
import {BusinessForm} from "../../components/forms";
import CustomAlert from "../../components/CustomAlert";
const AddBusinessPage=()=>{
  const INITIAL_VALUES={
  values:{},
      errors:{}
  }
  const [alert, setAlert] = useState({ open: false, type: "success", message: "" });
  const [isSubmitting,setIsSubmitting]=useState(false);
      const [formState,setFormState]=useState(INITIAL_VALUES)
      function resetForm(){
        setFormState(INITIAL_VALUES)
      }
      function handleFormFieldChange(e){
            setFormState({
              ...formState,
              values:{
                ...formState.values,
                [e.target.name]:e.target.value
              }
            })
            
        }
// Auto-close after 3 seconds
    // setTimeout(() => {
    //   setAlert({ ...alert, open: false });
    // }, 5000);
        const handleSubmit=async(e)=>{
            e.preventDefault();
            console.log("submit handle",formState.values);
setIsSubmitting(true);
            // et item= await window.api.business.add(formState.values);;

            const result = await window.db.execute(
              {model:'business',action:'create'},
              {data:formState.values}
            )
            setIsSubmitting(false);
            if(!result.success){

              // setFormState({...formState,errors:result.error})
              setFormState({...formState,errors:result.data})
              console.log(result);
              //  setAlert({
              //   open: true,
              //   type: "error",
              //   message: "Invalid credentials. Please try again.",
              // });
            }else{
resetForm()
               setAlert({
                open: true,
                type: "success",
                message: "Successfully Record Created...",
              });
              
            }
            
      }

      const handleCloseAlert = () => {
  setAlert(prev => ({ ...prev, open: false }));
};
    
         function handleReset(){
              console.log("reset");
        }

    return(
    <PageContainer
      title="New Business"
      breadcrumbs={[{ title: 'Business', path: '/business' }, { title: 'New' }]}
      >
      <CustomAlert  alert={alert} onClose={handleCloseAlert}/>
      <BusinessForm
        formState={formState}
        handleFormFieldChange={handleFormFieldChange}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
        isSubmitting={isSubmitting}
        submitButtonLabel="Create"
      />
    </PageContainer>
    )
}

export default AddBusinessPage