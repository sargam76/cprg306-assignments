"use client";

type ItemProps = {
  name: string;
  quantity: number;
  category: string;
  onSelect?: () => void;
};

export default function Item({ name, quantity, category, onSelect }: ItemProps) {
  return (
    <li
      onClick={() => onSelect && onSelect()}
      className="cursor-pointer rounded-xl bg-[#334257] text-white shadow-lg border border-white/10 hover:shadow-xl hover:-translate-y-[1px] transition"
    >
      <div className="px-6 py-5">
        <div className="text-lg font-extrabold capitalize leading-tight">
          {name}
        </div>
        <div className="mt-1 text-sm text-white/80">
          Buy <span className="font-semibold">{quantity}</span> in{" "}
          <span className="font-semibold capitalize">{category}</span>
        </div>
      </div>
    </li>
  );
}