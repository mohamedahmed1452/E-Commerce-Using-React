import {  useContext } from 'react';
import { cartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import useAllProducts from '../../customHooks/useAllProducts';
import Spinner from '../Spinner/Spinner';

export default function Products() {
  const productQuery = useAllProducts();

  const { data, isError, isLoading } = productQuery;

  const { addProductToCart } = useContext(cartContext);

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

      <div className="container mx-auto mb-50 mt-15">
        <h1 className="text-2xl md:text-2xl lg:text-4xl font-bold">
          Show All Products
        </h1>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-5 relative ">
          {data?.map((product) => (
            <Link to={`/productdetails/${product.id}`} key={product.id}>
              <div
                key={product.id}
                className="bg-blue-300 rounded-lg  group relative overflow-hidden"
              >
                <img src={product.imageCover} alt={product.title} />
                <div className="flex-col-reverse items-center justify-between ">
                  <h3>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                  <p>{product.category.name}</p>
                  <div className="flex justify-between mt-3">
                    <p>{product.price}</p>
                    <p> ⭐ {product.ratingsAverage}</p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addProductToCart(product.id);
                    }}
                    className="w-10 h-10 bg-emerald-700 absolute top-2 right-2 translate-x-[200%] group-hover:translate-x-0 "
                  >
                    +
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="container mx-auto mb-50 mt-15"></div>
      </div>
    </>
  );
}
