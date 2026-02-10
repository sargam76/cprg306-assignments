"use client";

import { useState } from "react";
import Item from "./item";
import itemsData from "./items.json";

type ShoppingItem = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function ItemList() {
  const [sortBy, setSortBy] = useState<"name" | "category">("name");
  const [grouped, setGrouped] = useState(false);

  const items = itemsData as ShoppingItem[];

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return a.category.localeCompare(b.category);
  });

  const groupedItems = sortedItems.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, ShoppingItem[]>);

  const categories = Object.keys(groupedItems).sort((a, b) =>
    a.localeCompare(b)
  );

  return (
    <div className="max-w-3xl mx-auto">
      {/* Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => {
            setSortBy("name");
            setGrouped(false);
          }}
          className={`px-5 py-2 rounded-full font-semibold ${
            !grouped && sortBy === "name"
              ? "bg-amber-700 text-white"
              : "bg-gray-300 text-gray-800"
          }`}
        >
          Sort by Name
        </button>

        <button
          onClick={() => {
            setSortBy("category");
            setGrouped(false);
          }}
          className={`px-5 py-2 rounded-full font-semibold ${
            !grouped && sortBy === "category"
              ? "bg-amber-700 text-white"
              : "bg-gray-300 text-gray-800"
          }`}
        >
          Sort by Category
        </button>

        <button
          onClick={() => {
            setSortBy("category");
            setGrouped(true);
          }}
          className={`px-5 py-2 rounded-full font-semibold ${
            grouped
              ? "bg-amber-700 text-white"
              : "bg-gray-300 text-gray-800"
          }`}
        >
          Group by Category
        </button>
      </div>

      {/* Normal list */}
      {!grouped && (
        <ul className="space-y-6">
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      )}

      {/* Grouped list */}
      {grouped && (
        <div className="space-y-10">
          {categories.map((category) => (
            <div key={category}>
              <h2 className="text-xl font-bold capitalize text-amber-800 mb-4">
                {category}
              </h2>
              <ul className="space-y-6">
                {[...groupedItems[category]]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => (
                    <Item
                      key={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      category={item.category}
                    />
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
