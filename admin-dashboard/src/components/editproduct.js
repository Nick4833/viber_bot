import axios from "axios";
import React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const EditProduct = () => {
  const [query, setQuery] = useSearchParams();
  const id = query.get("id");
  const [data, setData] = React.useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);

  React.useEffect(() => {
    console.log(id);
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch(`http://localhost:3001/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setStock(data.stock);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const editItem = {
      name,
      description,
      price,
      stock,
    };

    console.log(editItem);
    axios
      .patch(`http://localhost:3001/items/${id}`, editItem)
      .then(() => console.log("Item Edited"))
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <p className="mt-10 mb-10 text-3xl font-semibold">Edit a Product</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">Product Name</label>
        <br></br>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          className="border border-1"
          value={name}
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
          value={price}
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
          value={stock}
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
          value={description}
        ></input>

        <br></br>
        <br></br>
        <button className="bg-blue-500" type="submit">
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
