"use client";

import { useMemo, useState } from "react";
import Item from "./item";

export type ShoppingItem = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

type ItemListProps = {
  items: ShoppingItem[];
  onItemSelect: (itemName: string) => void;
};

type SortKey = "name" | "category";

export default function ItemList({ items, onItemSelect }: ItemListProps) {
  const [sortBy, setSortBy] = useState<SortKey>("name");
  const [grouped, setGrouped] = useState<boolean>(false);

  const sortedItems = useMemo(() => {
    const copy = [...items];
    copy.sort((a, b) => {
      const aVal = a[sortBy].toLowerCase();
      const bVal = b[sortBy].toLowerCase();
      return aVal.localeCompare(bVal);
    });
    return copy;
  }, [items, sortBy]);

  const groupedItems = useMemo(() => {
    if (!grouped) return null;

    const map: Record<string, ShoppingItem[]> = {};
    for (const item of sortedItems) {
      const key = item.category || "other";
      if (!map[key]) map[key] = [];
      map[key].push(item);
    }
    return map;
  }, [sortedItems, grouped]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <button
          onClick={() => setSortBy("name")}
          className={`px-5 py-2 rounded-full text-sm font-semibold border transition ${
            sortBy === "name"
              ? "bg-orange-600 text-white border-orange-600"
              : "bg-slate-200 text-slate-700 border-slate-200 hover:bg-slate-300"
          }`}
        >
          Sort by Name
        </button>

        <button
          onClick={() => setSortBy("category")}
          className={`px-5 py-2 rounded-full text-sm font-semibold border transition ${
            sortBy === "category"
              ? "bg-orange-600 text-white border-orange-600"
              : "bg-slate-200 text-slate-700 border-slate-200 hover:bg-slate-300"
          }`}
        >
          Sort by Category
        </button>

        <button
          onClick={() => setGrouped((g) => !g)}
          className={`px-5 py-2 rounded-full text-sm font-semibold border transition ${
            grouped
              ? "bg-slate-800 text-white border-slate-800"
              : "bg-slate-200 text-slate-700 border-slate-200 hover:bg-slate-300"
          }`}
        >
          {grouped ? "Grouped" : "Group by Category"}
        </button>
      </div>

      {!grouped && (
        <ul className="space-y-5">
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
              onSelect={() => onItemSelect(item.name)}
            />
          ))}
        </ul>
      )}

      {grouped && groupedItems && (
        <div className="space-y-10">
          {Object.keys(groupedItems)
            .sort()
            .map((cat) => (
              <div key={cat}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                  {cat}
                </h3>
                <ul className="space-y-5">
                  {groupedItems[cat].map((item) => (
                    <Item
                      key={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      category={item.category}
                      onSelect={() => onItemSelect(item.name)}
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