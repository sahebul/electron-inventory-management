import PageContainer from "../components/PageContainer"
import ProductForm from '../components/forms/ProductForm';
const AddProductPage=()=>{

    const formState=()=>{

      
    }

      function handleFormFieldChange(){
            
        }
     function handleFormSubmit(){
            
        }
         function handleFormReset(){
            
        }

    return(
    <PageContainer
      title="New Product"
      breadcrumbs={[{ title: 'Products', path: '/products' }, { title: 'New' }]}
      >
      <ProductForm
        formState={formState}
        onFieldChange={handleFormFieldChange}
        onSubmit={handleFormSubmit}
        onReset={handleFormReset}
        submitButtonLabel="Create"
      />
    </PageContainer>
    )
}

export default AddProductPage