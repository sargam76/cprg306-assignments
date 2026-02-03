"use client";
import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");
  const [nameTouched, setNameTouched] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!name || name.length < 2) {
      alert("Please enter a valid name with at least 2 characters.");
      return;
    }
    if (typeof name !== "string") {
      alert("Name must be a string.");
      return;
    }

    const item = { name, quantity: Number(quantity), category };
    console.log(item);
    alert(`Item Added: ${name}, Quantity: ${quantity}, Category: ${category}`);

    setName("");
    setQuantity(1);
    setCategory("produce");
    setNameTouched(false);
  };

  const isFormInvalid = !name || name.trim().length === 0;

  const nameError =
    nameTouched &&
    (!name ||
      /^\d+$/.test(name) ||
      name.length <= 2);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Add New Item
          </h2>
          <p className="text-gray-600">Fill in the details below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Item Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setNameTouched(true)}
              onFocus={() => setNameTouched(false)}
              placeholder="e.g. Apples"
              className={`w-full px-4 py-3 rounded-lg bg-gray-50 text-black border-2 transition-all duration-200
                focus:outline-none focus:border-purple-500 focus:bg-white
                ${nameError ? "border-red-400" : "border-gray-200"}
              `}
              required
            />

            {nameTouched && !name && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span>⚠️</span> Name is required.
              </p>
            )}
            {nameTouched && name && /^\d+$/.test(name) && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span>⚠️</span> Name cannot be only numbers.
              </p>
            )}
            {nameTouched && name && name.length <= 2 && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span>⚠️</span> Name must be at least 2 characters long.
              </p>
            )}
          </div>

          {/* Quantity Field */}
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              max="99"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 text-black border-2 border-gray-200
                focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-200"
              required
            />
          </div>

          {/* Category Field */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 text-black border-2 border-gray-200
                focus:outline-none focus:border-purple-500 focus:bg-white transition-all duration-200"
            >
              <option value="produce">Produce</option>
              <option value="dairy">Dairy</option>
              <option value="bakery">Bakery</option>
              <option value="meat">Meat</option>
              <option value="frozen foods">Frozen Foods</option>
              <option value="canned goods">Canned Goods</option>
              <option value="dry goods">Dry Goods</option>
              <option value="beverages">Beverages</option>
              <option value="snacks">Snacks</option>
              <option value="household">Household</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Submit Button with Gradient */}
          <button
            type="submit"
            disabled={isFormInvalid}
            className="w-full py-4 rounded-lg font-bold text-white text-lg
              bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500
              hover:from-purple-700 hover:via-pink-600 hover:to-orange-600
              transform hover:scale-[1.02] active:scale-[0.98]
              transition-all duration-200 shadow-lg hover:shadow-xl
              disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed 
              disabled:transform-none disabled:shadow-none"
          >
            Add Item ✨
          </button>
        </form>
      </div>
    </div>
  );
}