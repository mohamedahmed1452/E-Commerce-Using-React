import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useCategories() {
  const dataQuery = useQuery({
    queryKey: ["allCategories"],
    queryFn: () =>
      axios
        .get("https://ecommerce.routemisr.com/api/v1/categories")
        .then((res) => res.data.data),
  });
  return dataQuery;
}
