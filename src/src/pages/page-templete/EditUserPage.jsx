import PageContainer from "../../components/PageContainer"

const EditUserPage=()=>{
    return(
        <PageContainer
              title="Edit Users"
              breadcrumbs={[{ title: "Users", path: "/users" }, { title: "Update" }]}
            >
        </PageContainer>
    )
}
export default EditUserPage