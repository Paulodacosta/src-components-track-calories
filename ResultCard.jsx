import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const ResultCard = ({ result, onAddToJournalClick }) => {
  if (!result) return null;

  const { food_name, calories, protein_g, fat_g, carbs_g, confidence } = result;

  return (
    <div className="max-w-md mx-auto my-4 p-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 glassmorphism-button">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">🍽 {food_name || "Aliment inconnu"}</h2>
        {confidence && (
          <span className="text-sm text-green-600 dark:text-green-400 font-medium">
            Confiance : {(confidence * 100).toFixed(0)}%
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
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

      <div className="mt-5 text-right">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full sm:w-auto border-sky-500 text-sky-500 hover:bg-sky-500/10 hover:text-sky-600 dark:border-sky-400 dark:text-sky-400 dark:hover:bg-sky-400/10 dark:hover:text-sky-300" 
          onClick={() => onAddToJournalClick(result)}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Ajouter au journal
        </Button>
      </div>
    </div>
  );
};

export default ResultCard;