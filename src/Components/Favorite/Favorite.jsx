import { useContext } from 'react';
import { favoriteContext } from '../../context/FavoriteContext';
import Spinner from '../Spinner/Spinner';

export default function Favorite() {
  const { favoriteItems,removeFromFavorite} = useContext(favoriteContext);

  if (!favoriteItems.products) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <Spinner />
      </div>
    );
  }

  const favoriteProducts = favoriteItems.products;
  console.log(favoriteProducts.length);

  return (
    <div className="min-h-[100vh]">
      <div className=" mx-auto mt-3 flex  justify-center ">
        <div className="w-[90%] m-3  p-5 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-2xl font-bold leading-none text-gray-900 dark:text-white">
              Favorite Products
            </h5>
          </div>

          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {favoriteProducts.map((product) => (
                <li key={product._id} className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="shrink-0">
                      <img
                        className="w-[200px] h-[200px] rounded-full"
                        src={product.product.imageCover}
                        alt="Product image"
                      />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-2xl font-medium text-gray-900 truncate dark:text-white">
                        {product.product.title}
                      </p>
                      <p className="text-2xl text-gray-500 truncate dark:text-gray-400">
                        {product.product.category.name}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
                      {product.price} EGP
                    </div>
                        <div
                    onClick={() => {
                       removeFromFavorite(product.product._id);
                    }}
                    className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    <i className="text-2xl fa-solid fa-trash"></i>
                  </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
