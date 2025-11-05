import React from "react";
import { useQuery } from '@tanstack/react-query';
import axios from "axios";

export default function useAllProducts() {
  const dataQuery = useQuery({
    queryKey: ["allProducts"],
    queryFn: () =>
      axios
        .get("https://ecommerce.routemisr.com/api/v1/products")
        .then((res) => res.data.data),
  });
  return dataQuery;
}
