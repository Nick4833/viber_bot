import axios from "axios";
import { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const createItem = {
      name,
      description,
      price,
      stock,
    };

    console.log(createItem);
    axios
      .post("http://localhost:3001/items", createItem)
      .then(() => console.log("Item Created"))
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <p className="mt-10 mb-10 text-3xl font-semibold">Add a Product</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">Product Name</label>
        <br></br>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          className="border border-1"
        ></input>
        <br></br>
        <br></br>
        <label htmlFor="price">Product Price</label>
        <br></br>
        <input
          type="number"
          id="price"
          name="price"
          onChange={(e) => setPrice(e.target.value)}
          className="border border-1"
        ></input>
        <br></br>
        <br></br>
        <label htmlFor="stock">Product Stock</label>
        <br></br>
        <input
          type="number"
          id="stock"
          name="stock"
          onChange={(e) => setStock(e.target.value)}
          className="border border-1"
        ></input>
        <br></br>
        <br></br>
        <label htmlFor="description">Product Description</label>
        <br></br>
        <input
          type="text"
          id="description"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          className="border border-1"
        ></input>

        <br></br>
        <br></br>
        <button className="bg-blue-500" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
