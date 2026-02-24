"use client";

import { useMemo, useState } from "react";
import Item from "./item";
import type { ItemType } from "./page";

type ItemListProps = {
  items: ItemType[];
};

export default function ItemList({ items }: ItemListProps) {
  const [sortBy, setSortBy] = useState<"name" | "category">("name");
  const [grouped, setGrouped] = useState<boolean>(false);

  const sortedItems = useMemo(() => {
    const copy = [...items]; // do NOT mutate props
    copy.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.category.localeCompare(b.category);
    });
    return copy;
  }, [items, sortBy]);

  const groupedMap = useMemo(() => {
    const map: Record<string, ItemType[]> = {};
    for (const item of sortedItems) {
      const key = item.category;
      if (!map[key]) map[key] = [];
      map[key].push(item);
    }
    return map;
  }, [sortedItems]);

  const categories = useMemo(() => {
    return Object.keys(groupedMap).sort((a, b) => a.localeCompare(b));
  }, [groupedMap]);

  const pillBase =
    "rounded-full px-6 py-3 text-base font-semibold transition shadow-sm";
  const pillInactive = "bg-slate-200 text-slate-900 hover:bg-slate-300";
  const pillActiveOrange = "bg-orange-700 text-white hover:bg-orange-800";
  const pillActiveBlue = "bg-slate-700 text-white hover:bg-slate-800";

  return (
    <section>
      {/* Pills */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <button
          className={`${pillBase} ${
            sortBy === "name" ? pillActiveOrange : pillInactive
          }`}
          onClick={() => setSortBy("name")}
          type="button"
        >
          Sort by Name
        </button>

        <button
          className={`${pillBase} ${
            sortBy === "category" ? pillActiveBlue : pillInactive
          }`}
          onClick={() => setSortBy("category")}
          type="button"
        >
          Sort by Category
        </button>

        <button
          className={`${pillBase} ${grouped ? pillActiveBlue : pillInactive}`}
          onClick={() => setGrouped((g) => !g)}
          type="button"
        >
          Group by Category
        </button>
      </div>

      {/* List */}
      {!grouped ? (
        <ul className="space-y-7">
          {sortedItems.map((item) => (
            <Item
              key={`${item.name}-${item.category}-${item.quantity}`}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
            />
          ))}
        </ul>
      ) : (
        <div className="space-y-10">
          {categories.map((cat) => (
            <div key={cat}>
              <h2 className="mb-4 text-lg font-bold text-slate-800">
                {cat.toUpperCase()}
              </h2>
              <ul className="space-y-7">
                {groupedMap[cat].map((item) => (
                  <Item
                    key={`${item.name}-${item.category}-${item.quantity}`}
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
    </section>
  );
}