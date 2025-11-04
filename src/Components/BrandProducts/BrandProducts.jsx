import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function BrandProducts() {
  const { id } = useParams();

  function fetchProductsByBrand(brandId) {
    // Implement the logic to fetch products by brand ID
    const dataQuery = useQuery({
      queryKey: ['allProducts'],
      queryFn: () =>
        axios
          .get('https://ecommerce.routemisr.com/api/v1/products')
          .then((res) => res.data.data),
    });
    const { data, isError, isLoading } = dataQuery;

    const filterProducts = data.filter(
      (product) => product.brand._id === brandId
    );

    console.log("filterProducts", filterProducts);
  }
  fetchProductsByBrand(id);
  return (
    <>
      <div>BrandProducts</div>
      {console.log(id)}
    </>
  );
}
