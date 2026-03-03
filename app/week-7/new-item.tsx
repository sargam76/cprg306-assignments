"use client";

import { useState } from "react";
import type { ShoppingItem } from "./item-list";

type Props = {
  onAddItem: (item: ShoppingItem) => void;
};

export default function NewItem({ onAddItem }: Props) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: name.trim(),
      quantity,
      category,
    };

    onAddItem(newItem);

    setName("");
    setQuantity(1);
    setCategory("produce");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-xl font-extrabold mb-6">Add New Item</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-500 mb-2">
            Item Name
          </label>
          <input
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. bananas 🍌"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-2">
            Qty
          </label>
          <input
            type="number"
            min={1}
            max={99}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-500 mb-2">
            Category
          </label>
          <select
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="produce">Produce</option>
            <option value="dairy">Dairy</option>
            <option value="bakery">Bakery</option>
            <option value="meat">Meat</option>
            <option value="frozen">Frozen</option>
            <option value="canned">Canned</option>
            <option value="dry">Dry</option>
            <option value="beverages">Beverages</option>
            <option value="snacks">Snacks</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="flex items-end justify-end">
          <button
            type="submit"
            className="rounded-full bg-orange-600 px-7 py-3 text-sm font-bold text-white shadow-md hover:bg-orange-700 transition"
          >
            Add Item
          </button>
        </div>
      </div>
    </form>
  );
}