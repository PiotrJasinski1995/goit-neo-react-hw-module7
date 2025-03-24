import { ErrorStyled } from "./styled";

interface IError {
  message: string;
}

const ErrorComponent = ({ message = "" }: IError) => {
  return <ErrorStyled>{message}</ErrorStyled>;
};

export default ErrorComponent;
