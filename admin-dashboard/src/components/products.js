import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };
  const handleSubmit = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:3001/items/${id}`)
      .then(() => {
        console.log("Item Deleted");
        fetchData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <h1 className="mt-10 mb-10 text-2xl font-semibold">
        Welcome, Ank Maw Khon
        <br></br>
        <small className="font-normal text-sm text-gray-600">
          Here's what happening in your shop today.
        </small>
      </h1>
      <div className="drop-shadow-xl bg-white w-5/6 p-5 rounded-md mb-5">
        <div className="grid grid-cols-2 justify-between">
          <div className="flex flex-wrap items-center">
            <div className="bg-[#772BD4] rounded w-4 h-8 mr-2"></div>
            <p>Products</p>
          </div>
          <Link
            to="/add-product"
            className="justify-self-end bg-[#772BD4] text-white py-2 px-3 rounded-md"
          >
            Add a Product
          </Link>
        </div>
        <div className="w-full mt-5">
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden shadow-md sm:rounded-lg">
                  <table class="min-w-full table-fixed">
                    <thead class="bg-gray-50 2xl:text-sm text-xs">
                      <tr>
                        <th
                          scope="col"
                          class="py-3 px-6 font-medium tracking-wider text-left text-gray-700 uppercase"
                        >
                          Image
                        </th>
                        <th
                          scope="col"
                          class="py-3 px-6 font-medium tracking-wider text-left text-gray-700 uppercase"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          class="py-3 px-6 font-medium tracking-wider text-left text-gray-700 uppercase"
                        >
                          Color
                        </th>
                        <th
                          scope="col"
                          class="py-3 px-6 font-medium tracking-wider text-left text-gray-700 uppercase"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          class="py-3 px-6 font-medium tracking-wider text-left text-gray-700 uppercase"
                        >
                          Price
                        </th>
                        <th
                          colSpan="2"
                          scope="col-2"
                          class="py-3 px-6 font-medium tracking-wider text-left text-gray-700 uppercase"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {!data
                        ? "No data"
                        : data.map((item, index) => (
                            <tr
                              class="bg-white border-b 2xl:text-lg text-xs"
                              key={index}
                            >
                              <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                <img
                                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                                  className="w-20 rounded"
                                />
                              </td>
                              <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                {item.name}
                              </td>
                              <td class="py-4 px-6 text-gray-500 whitespace-nowrap">
                                Laptop
                              </td>
                              <td class="py-4 px-6 text-gray-500 whitespace-nowrap">
                                {item.stock}
                              </td>
                              <td class="py-4 px-6 text-gray-500 whitespace-nowrap">
                                ${item.price}
                              </td>
                              <td class="py-4 px-6 font-medium text-right whitespace-nowrap">
                                <Link
                                  to={`/edit-product?id=${item._id}`}
                                  class="text-[#2BD477] hover:underline"
                                >
                                  Edit
                                </Link>
                              </td>
                              <td class="py-4 px-6 font-medium text-right whitespace-nowrap">
                                <button
                                  class="text-[#2BD477] hover:underline"
                                  onClick={(e) => handleSubmit(item._id)}
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
