import { Button } from "@mui/material";

interface ButtonProps {
    title: string;
    disabled: boolean;
    onClick: (row : any)=> void;
  }

function ButtonCreate({ title, disabled, onClick }: ButtonProps) {
    return (
      <Button onClick={onClick} disabled={disabled} variant="outlined" size="large" >{title}</Button>
    );
  }

  export default ButtonCreate