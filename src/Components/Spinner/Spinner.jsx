import { ThreeCircles } from "react-loader-spinner";

export default function Spinner() {
  return (
    <ThreeCircles
      visible={true}
      height="100"
      width="100"
      color="#000"
      ariaLabel="three-circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
