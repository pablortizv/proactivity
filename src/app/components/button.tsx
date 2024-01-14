import { Button } from "@mui/material";

interface ButtonProps {
    title: string;
    disabled: boolean;
  }

function ButtonCreate({ title, disabled }: ButtonProps) {
    return (
      <Button disabled={disabled} variant="outlined" size="large" >{title}</Button>
    );
  }

  export default ButtonCreate