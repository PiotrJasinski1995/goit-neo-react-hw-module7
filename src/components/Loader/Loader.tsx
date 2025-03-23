import { LoaderStyled, LoaderBackground } from "./styled";
import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <LoaderStyled>
      <LoaderBackground>
        <BeatLoader />
      </LoaderBackground>
    </LoaderStyled>
  );
};

export default Loader;
