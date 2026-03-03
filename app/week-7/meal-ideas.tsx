"use client";

import { useEffect, useState } from "react";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type MealIdeasProps = {
  ingredient: string;
};

export default function MealIdeas({ ingredient }: MealIdeasProps) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeals = async () => {
      if (!ingredient) {
        setMeals([]);
        setError("");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
            ingredient
          )}`
        );

        if (!response.ok) throw new Error("Fetch failed");

        const data: { meals: Meal[] | null } = await response.json();
        setMeals(data.meals ?? []);
      } catch {
        setMeals([]);
        setError("Failed to load meals.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [ingredient]);

  return (
    <div>
      <h2 className="text-xl font-extrabold mb-2">Meal Ideas</h2>
      <p className="text-sm text-slate-500 mb-6">
        {ingredient ? (
          <>
            Showing meals for <span className="font-bold">{ingredient}</span>
          </>
        ) : (
          "Select an item to see meals."
        )}
      </p>

      {loading && <p className="text-slate-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {meals.map((meal) => (
          <li
            key={meal.idMeal}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow"
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="h-36 w-full object-cover"
            />
            <div className="p-4">
              <p className="font-bold text-slate-800">{meal.strMeal}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}