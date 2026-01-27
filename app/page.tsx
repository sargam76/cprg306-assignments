import Link from "next/link";
export default function Home() {
  return (
    <main>
      <h1>CPRG 306: Web Development 2 - Assignments</h1>
      <Link className="p-10 m-5 bg-gray-600 text-white rounded-lg" href="/week-2"> 
      <button type="button">week-2</button></Link>
      <br />
      <Link href="/week-3">
      <button className="p-10 bg-gray-600 text-white rounded-lg" type="button">week-3</button></Link>
      </main>
  );
}
