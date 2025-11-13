import { Button, useTheme } from "@mui/material"
const MyButton=({buttonLable,onClick,startIcon,type="button",isSubmitting=false})=>{
    const theme=useTheme();
    return(
        <Button
            variant="contained"
            onClick={onClick}
            startIcon={startIcon??''}
            type={type}
             loading={isSubmitting}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              px: 3,
              py: 1,
              backgroundColor:
                theme.palette.mode === "dark" ? "#fbfeffff" : "#060606ff",
              "&:hover": { backgroundColor: "#0169e8ff" },
            }}
          >
            {buttonLable??'Create'}
          </Button>
    )
}

export default MyButton;