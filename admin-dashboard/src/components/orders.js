import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3001/orders/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  };

  const updateOrder = (e, id) => {
    const orderStatus = e.target.value;
    const editOrder = {
      orderStatus,
    };

    axios
      .patch(`http://localhost:3001/orders/${id}`, editOrder)
      .then(() => {
        console.log("Order Edited");
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
            <p>Orders</p>
          </div>
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
                          Order No
                        </th>
                        <th
                          scope="col"
                          class="py-3 px-6 font-medium tracking-wider text-left text-gray-700 uppercase"
                        >
                          Item Name
                        </th>
                        <th
                          scope="col"
                          class="py-3 px-6 font-medium tracking-wider text-left text-gray-700 uppercase"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          class="py-3 px-6 font-medium tracking-wider text-left text-gray-700 uppercase"
                        >
                          Phone
                        </th>
                        <th
                          colSpan="3"
                          scope="col-2"
                          class="py-3 px-6 font-medium tracking-wider text-left text-gray-700 uppercase"
                        >
                          Order Status
                        </th>
                      </tr>
                    </thead>
                    <tbody data-theme="light">
                      {!data
                        ? "No data"
                        : data.map((order, index) => (
                            <tr
                              class="bg-white border-b 2xl:text-lg text-xs"
                              key={index}
                            >
                              <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                {order._id}
                              </td>
                              <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                {order.item_name}
                              </td>
                              <td class="py-4 px-6 text-gray-500 whitespace-nowrap">
                                ${order.price}
                              </td>
                              <td class="py-4 px-6 text-gray-500 whitespace-nowrap">
                                {order.phone}
                              </td>

                              <td class="py-4 px-6 font-medium text-right whitespace-nowrap inline-flex flex-wrap items-center">
                                <select
                                  name="orders"
                                  id="orders"
                                  defaultValue={order.orderStatus}
                                  onChange={(e) => updateOrder(e, order._id)}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="on delivery">
                                    On Delivery
                                  </option>
                                  <option value="completed">Completed</option>
                                </select>
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

export default Orders;
