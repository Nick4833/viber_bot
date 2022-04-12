import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div class="flex flex-col w-80 min-h-screen h-100vh px-4 py-8 bg-[#772BD4] border-r hidden xl:block">
      <h2 class="text-3xl font-semibold text-white">
        <span className="flex flex-row flex-wrap items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-receipt"
            width="34"
            height="34"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#FFFFFF"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2m4 -14h6m-6 4h6m-2 4h2" />
          </svg>
          <span className="ml-2">
            Shopr
            <small className="font-normal text-sm self-end ml-2 text-gray-300">
              Dashboard
            </small>
          </span>
        </span>
      </h2>

      <div class="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <span className="text-sm text-gray-300">Menu</span>
          <a
            class="flex items-center px-4 py-2 mt-5 text-white rounded-md"
            href="#"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span class="mx-4 font-medium">Dashboard</span>
          </a>

          <Link
            to="/products"
            class="flex items-center px-4 py-2 mt-5 focus:bg-[#2BD477] text-white transition-colors duration-200 transform rounded-md hover:bg-gray-200 hover:text-gray-800"
            href="#"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span class="mx-4 font-medium">Products</span>
          </Link>
          <Link
            to="/orders"
            class="flex items-center px-4 py-2 mt-5 focus:bg-[#2BD477] text-white transition-colors duration-200 transform rounded-md hover:bg-gray-200 hover:text-gray-800"
            href="#"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span class="mx-4 font-medium">Orders</span>
          </Link>
          <a
            class="flex items-center px-4 py-2 mt-5 focus:bg-[#2BD477] text-white transition-colors duration-200 transform rounded-md hover:bg-gray-200 hover:text-gray-800"
            href="#"
          >
            <svg
              class="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span class="mx-4 font-medium">Records</span>
          </a>
          <hr class="my-6 border-gray-500" />
        </nav>

        <div class="flex items-center px-4 -mx-2">
          <img
            class="object-cover mx-2 rounded-full h-9 w-9"
            src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            alt="avatar"
          />
          <h4 class="mx-2 font-medium text-white hover:underline">John Doe</h4>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
