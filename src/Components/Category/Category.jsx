import { SyncLoader } from 'react-spinners';
import useCategories from '../../customHooks/useCategories';
import Spinner from '../Spinner/Spinner';

export default function Category() {
  const { data, isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <Spinner />
      </div>
    );
  }

  return (
    <div className=" container mx-auto mb-10 mt-15">
      <h1 className="text-2xl md:text-2xl lg:text-4xl font-bold mb-5">
        Show Popular Categories
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5 relative  rounded-lg">
        {data.map((category) => (
          <div key={category._id} className="bg-gray-500 rounded-lg p-3">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-60  rounded-full mb-3"
            />
            <div className="flex-col items-center justify-between  ">
              <h3 className="text-sm text-white md:text-[20px]">{category.name}</h3>
              <p className="text-sm text-white md:text-[20px]">{category.slug}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
