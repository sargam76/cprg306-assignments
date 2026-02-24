type ItemProps = {
  name: string;
  quantity: number;
  category: string;
};

function titleCase(text: string) {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function Item({ name, quantity, category }: ItemProps) {
  return (
    <li className="w-full rounded-xl bg-slate-700 px-10 py-8 shadow-md">
      <p className="text-2xl font-extrabold text-white">
        {name}
      </p>
      <p className="mt-2 text-lg font-semibold text-white/90">
        Buy {quantity} in {titleCase(category)}
      </p>
    </li>
  );
}