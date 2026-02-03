"use client";

import React, { useState } from "react";

export default function NewItemPage() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert(`Item Added:\nName: ${name}\nQuantity: ${quantity}\nCategory: ${category}`);

    setName("");
    setQuantity(1);
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-black p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Add New Item</h1>

      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white 
             border border-gray-600 focus:border-blue-400 
             focus:ring-2 focus:ring-blue-500 outline-none transition"
      />

      <input
        type="number"
        min="1"
        max="100"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        required
        className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-white 
             border border-gray-600 focus:border-blue-400 
             focus:ring-2 focus:ring-blue-500 outline-none transition"

      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
          className="w-full mb-6 p-3 rounded-lg bg-gray-800 text-white border border-gray-600 
             focus:border-blue-400 focus:ring-2 focus:ring-blue-500 outline-none transition"
      >
        <option value="">Select Category</option>
        <option value="produce">Produce</option>
        <option value="dairy">Dairy</option>
        <option value="bakery">Bakery</option>
        <option value="meat">Meat</option>
        <option value="beverages">Beverages</option>
        <option value="snacks">Snacks</option>
        <option value="household">Household</option>
        <option value="other">Other</option>
        <option value="dry goods">Dry goods</option>
        <option value="canned goods">Canned goods</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Item
      </button>
    </form>
  );
}