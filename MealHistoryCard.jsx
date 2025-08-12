import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";

const MealHistoryCard = ({ meal }) => {
  if (!meal) return null;

  const {
    food_name,
    calories,
    protein_g,
    fat_g,
    carbs_g,
    scanned_at, 
    image_url 
  } = meal;

  const formattedDate = new Date(scanned_at).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Card className="w-full max-w-md mx-auto my-3 shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-slate-800 glassmorphism-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {image_url ? (
              <img-replace
                src={image_url}
                alt={food_name || "Repas"}
                className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <Utensils className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
            )}
            <div>
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">{food_name || "Aliment inconnu"}</CardTitle>
              <p className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700 dark:text-gray-300">
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">🔥 Calories</p>
            <p>{calories || 'N/A'} kcal</p>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">💪 Protéines</p>
            <p>{protein_g || 'N/A'} g</p>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">🍞 Glucides</p>
            <p>{carbs_g || 'N/A'} g</p>
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-gray-100">🧈 Lipides</p>
            <p>{fat_g || 'N/A'} g</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealHistoryCard;