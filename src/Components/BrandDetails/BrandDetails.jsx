import { Link, useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function BrandDetails() {
  const { id } = useParams();
  const dataQuery = useQuery({
    queryKey: ["brandDetails"],
    queryFn: () =>
      axios
        .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
        .then((res) => res.data.data),
  });
  const { data, isError, isLoading } = dataQuery;
  console.log(data);

  if (isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <h1 className="text-center text-3xl text-red-500">
        Something went wrong error fetching data 404
      </h1>
    );
  }

  return (
    <>
      <div className="container  mb-50 mt-10 h-[80vh]">
        <div className="bg-lime-950 w-[30%]   mx-5 rounded-lg flex flex-col gap-3">
          <h1 className=" p-5 text-2xl md:text-2xl lg:text-4xl font-bold text-cyan-100">
            Brand Details
          </h1>
          <div className=" rounded-lg  group relative overflow-hidden">
            <img className="w-full p-3 rounded-2xl" src={data.image} alt={data.name} />
          </div>
          <div className="flex-col-reverse items-center justify-between ms-2 ">
            <h3 className="lg:text-2xl font-bold text-cyan-100">{data.name} Lorem ipsum dolor sit </h3>
            <p className="lg:text-2xl  font-bold text-cyan-100">{data.slug} Lorem ipsum dolor sit </p>
          </div>
        </div>
      </div>
    </>
  );
}
