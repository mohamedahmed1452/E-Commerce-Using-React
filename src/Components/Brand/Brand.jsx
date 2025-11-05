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
    staleTime: Infinity, // ✅ data is always "fresh"
    cacheTime: Infinity, // ✅ never garbage-collect from cache
    refetchOnMount: false, // ✅ don’t refetch when component mounts
    refetchOnWindowFocus: false, // ✅ don’t refetch on window focus
    refetchOnReconnect: false, // ✅ don’t refetch on network reconnect
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
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-7 relative ">
        {data?.map((brand) => (
          <Link to={`/brandDetails/${brand._id}`} key={brand._id}>
            <div className="bg-gray-400 rounded-lg group relative ">
              <img className='w-full  h-full rounded-full' src={brand.image} alt={brand.name} />
              <div className="ms-5 flex-col-reverse items-center justify-between text-2xl  mb-3 ">
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
