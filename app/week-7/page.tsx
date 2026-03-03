"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList, { ShoppingItem } from "./item-list";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

function cleanIngredientName(rawName: string) {
  let name = rawName.split(",")[0].trim();
  name = name.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "");
  return name.trim();
}

const initialItems: ShoppingItem[] = itemsData as unknown as ShoppingItem[];

export default function Page() {
  const [items, setItems] = useState<ShoppingItem[]>(initialItems);
  const [selectedItemName, setSelectedItemName] = useState<string>("");

  const handleAddItem = (newItem: ShoppingItem) => {
    setItems((prev) => [...prev, newItem]);
  };

  const handleItemSelect = (itemName: string) => {
    setSelectedItemName(cleanIngredientName(itemName));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#081a33] via-[#0a2142] to-[#07162b] px-6 py-10 text-slate-100">
      <h1 className="text-4xl font-extrabold text-center tracking-tight mb-10">
        Shopping List
      </h1>

      <div className="mx-auto w-full max-w-6xl rounded-3xl bg-white text-slate-900 shadow-2xl">
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <section>
              <ItemList items={items} onItemSelect={handleItemSelect} />
              <div className="mt-10">
                <NewItem onAddItem={handleAddItem} />
              </div>
            </section>

            <section className="lg:pl-2">
              <MealIdeas ingredient={selectedItemName} />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}