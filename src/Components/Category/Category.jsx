import { SyncLoader } from 'react-spinners';
import useCategories from '../../customHooks/useCategories';

export default function Category() {
  const { data, isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <h1>Hello</h1>
        <SyncLoader />
      </div>
    );
  }

  return (
    <div className="h-[70vh] container mx-auto mb-30 mt-15 ">
      <h1 className="text-2xl md:text-2xl lg:text-4xl font-bold mb-5">
        Show Popular Categories
      </h1>

      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-5 relative ">
        {data.map((category) => (
          <div key={category.id} className="bg-blue-300 rounded-lg p-3">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40  rounded-md"
            />
            <div className="flex-col items-center justify-between mt-3 ">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.slug}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
