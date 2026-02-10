import ItemList from "./item-list";

export default function Page() {
  return (
    <main className="min-h-screen flex justify-center bg-black">
      <div className="w-full max-w-3xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">
          Shopping List
        </h1>
        <ItemList />
      </div>
    </main>
  );
}
