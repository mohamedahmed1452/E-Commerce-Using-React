import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

export default function Brand() {
  const brandQuery = useQuery({
    queryKey: ['brandData'],
    queryFn: () =>
      axios
        .get('https://ecommerce.routemisr.com/api/v1/brands')
        .then((res) => res.data.data),
  });
  const { data, isLoading, isError } = brandQuery;

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
    <div className="container mx-auto mb-50 mt-15">
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-5 relative ">
        {data?.map((brand) => (
          <Link to={`/brandProducts/${brand._id}`} key={brand._id}>
            <div className="bg-lime-800 rounded-lg  group relative ">
              <img src={brand.image} alt={brand.name} />
              <div className="flex-col-reverse items-center justify-between ">
                <h3>{brand.name}</h3>
                <p>{brand.slug}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
