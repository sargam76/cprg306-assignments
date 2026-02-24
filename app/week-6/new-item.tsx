"use client";

import { useState } from "react";
import type { ItemType } from "./page";

type NewItemProps = {
  onAddItem: (item: ItemType) => void;
};

export default function NewItem({ onAddItem }: NewItemProps) {
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [category, setCategory] = useState<string>("produce");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const item: ItemType = { name, quantity, category };
    onAddItem(item);

    setName("");
    setQuantity(1);
    setCategory("produce");
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
      <h2 className="text-xl font-extrabold text-slate-900 mb-4">
        Add New Item
      </h2>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Item Name
          </label>
          <input
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., bananas 🍌"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Qty
          </label>
          <input
            type="number"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={quantity}
            min={1}
            max={99}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <div className="sm:col-span-3">
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Category
          </label>
          <select
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="produce">Produce</option>
            <option value="dairy">Dairy</option>
            <option value="bakery">Bakery</option>
            <option value="meat">Meat</option>
            <option value="frozen">Frozen</option>
            <option value="canned goods">Canned Goods</option>
            <option value="dry goods">Dry Goods</option>
            <option value="beverages">Beverages</option>
            <option value="snacks">Snacks</option>
            <option value="household">Household</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          className="rounded-full bg-orange-700 px-7 py-3 text-base font-bold text-white shadow-sm transition hover:bg-orange-800"
          type="submit"
        >
          Add Item
        </button>
      </div>
    </form>
  );
}