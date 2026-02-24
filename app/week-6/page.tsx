"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";

export type ItemType = {
  name: string;
  quantity: number;
  category: string;
};

export default function Page() {
  const [items, setItems] = useState<ItemType[]>(itemsData as ItemType[]);

  function handleAddItem(item: ItemType) {
    setItems((prev) => [...prev, item]);
  }

  return (
    <main className="min-h-screen bg-black px-4 py-10">
      <h1 className="text-center text-5xl font-extrabold tracking-tight text-white mb-10">
        Shopping List
      </h1>

      <div className="mx-auto w-full max-w-4xl rounded-3xl bg-white shadow-[0_20px_80px_rgba(0,0,0,0.65)] px-8 py-10">
        <ItemList items={items} />

        <div className="mt-10">
          <NewItem onAddItem={handleAddItem} />
        </div>
      </div>
    </main>
  );
}