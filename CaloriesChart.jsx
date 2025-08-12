import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target } from "lucide-react";

const CaloriesChart = ({ data, dailyTarget = 2000 }) => {
  if (!data || data.length === 0) {
    return (
      <Card className="w-full max-w-xl mx-auto my-6 shadow-lg dark:bg-slate-800 glassmorphism-card">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary dark:text-emerald-400" />
            Suivi des calories (7 derniers jours)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 dark:text-gray-400 py-10">
            Pas encore assez de données pour afficher le graphique. Commencez par ajouter des repas à votre journal !
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-xl mx-auto my-6 shadow-lg dark:bg-slate-800 glassmorphism-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-primary dark:text-emerald-400" />
          Suivi des calories (7 derniers jours)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 5, right: 30, bottom: 5, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} className="dark:stroke-gray-600" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 11 }} 
              className="dark:fill-gray-400"
              tickFormatter={(tick) => {
                const date = new Date(tick);
                return `${date.getDate()}/${date.getMonth() + 1}`;
              }}
            />
            <YAxis 
              tick={{ fontSize: 11 }} 
              unit=" kcal" 
              className="dark:fill-gray-400"
              domain={['auto', `dataMax + ${dailyTarget * 0.1}`]} 
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                backdropFilter: 'blur(5px)',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                color: '#334155'
              }}
              labelStyle={{ fontWeight: 'bold', color: '#0f172a' }}
              formatter={(value, name, props) => [`${value} kcal`, "Calories"]}
              labelFormatter={(label) => {
                 const date = new Date(label);
                 return date.toLocaleDateString("fr-FR", { weekday: 'long', day: 'numeric', month: 'short' });
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <Line 
              type="monotone" 
              dataKey="calories" 
              stroke="url(#colorCalories)" 
              strokeWidth={3} 
              dot={{ r: 5, strokeWidth: 2, fill: '#fff', stroke: '#ef4444' }} 
              activeDot={{ r: 7, strokeWidth: 2, fill: '#fff', stroke: '#ef4444' }}
              name="Calories consommées"
            />
            <ReferenceLine
              y={dailyTarget}
              stroke="#10b981" 
              strokeDasharray="4 4"
              strokeWidth={2}
              label={{ 
                value: `Objectif: ${dailyTarget} kcal`, 
                position: "insideTopRight", 
                fill: "#10b981", 
                fontSize: 10,
                fontWeight: 'bold',
                dy: -5, 
                dx: -5 
              }}
            />
            <defs>
              <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#f87171" stopOpacity={0.5}/>
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CaloriesChart;