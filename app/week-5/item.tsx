export default function Item(props: {
  name: string;
  quantity: number;
  category: string;
}) {
  const { name, quantity, category } = props;

  return (
    <li className="p-4 rounded-lg bg-gray-700 text-white">
      <p className="font-bold">{name}</p>
      <p>
        Buy {quantity} in <span className="capitalize">{category}</span>
      </p>
    </li>
  );
}
