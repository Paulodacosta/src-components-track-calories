import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Camera, BarChart2, Zap, ShieldCheck, Info, HelpCircle, Loader2, AlertTriangle, Image as ImageIcon, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import ResultCard from '@/components/track-calories/ResultCard';
import MealHistoryCard from '@/components/track-calories/MealHistoryCard';


export const marketingTexts = {
  intro: "🍽️ Bienvenue dans Track-Calories ! Ici, scanne ton repas en 1 photo et découvre instantanément son apport calorique et nutritionnel.",
  freeScans: (remaining) => `✅ Il te reste ${remaining} ${remaining === 1 ? 'analyse gratuite' : 'analyses gratuites'}. Utilise-les pour prendre soin de ta santé !`,
  creditsAvailable: (credits) => `💰 Tu as ${credits} ${credits === 1 ? 'crédit disponible' : 'crédits disponibles'}.`,
  premiumUser: "🌟 Tu es un membre Premium ! Profite d'un accès illimité à Track-Calories.",
  noScansLeft: "🚫 Tu as utilisé tes 10 analyses gratuites.",
  callToAction: "🎯 Atteins tes objectifs forme et bien-être grâce au suivi quotidien de tes repas.",
  upgradePrompt: "💎 Pour continuer, passe en Premium pour un accès illimité ou achète des crédits !",
  subscribeNow: "🔥 S’abonner maintenant",
  buyCredits: "💰 Acheter des crédits",
  historyTitle: "📖 Mon Journal Alimentaire",
  noHistory: "Ton journal est vide pour le moment. Scanne ton premier repas pour commencer !",
  chartTitle: "📊 Suivi Calorique Hebdomadaire"
};

export const TrackCaloriesUI = ({
  userStatus,
  isLoading,
  error,
  analysisResult,
  uploadedImagePreview,
  mealLog,
  chartData,
  dailyTarget,
  CaloriesChartComponent,
  onScanMealClick,
  onSubscribeClick,
  onBuyCreditsClick,
  onAddToJournalClick,
  fileInputRef,
  handleImageUpload,
}) => {
  const { isPremium, canUseForFree, credits, remainingFreeScans } = userStatus;
  const canUseTrackCaloriesOverall = isPremium || canUseForFree || credits > 0;

  let statusMessage;
  if (isPremium) statusMessage = marketingTexts.premiumUser;
  else if (canUseForFree) statusMessage = marketingTexts.freeScans(remainingFreeScans);
  else if (credits > 0) statusMessage = marketingTexts.creditsAvailable(credits);
  else statusMessage = marketingTexts.noScansLeft;

  return (
    <>
      <Card className="glassmorphism-card shadow-xl dark:bg-slate-800/80">
        <CardHeader className="text-center">
          <div className="inline-block p-3 bg-primary/10 dark:bg-primary/20 rounded-full mx-auto mb-4"><BarChart2 className="h-10 w-10 text-primary dark:text-emerald-400" /></div>
          <CardTitle className="text-3xl font-bold text-primary dark:text-emerald-400">Track-Calories</CardTitle>
          <CardDescription className="text-md text-muted-foreground dark:text-slate-400">{marketingTexts.intro}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-lg font-semibold dark:text-slate-200">{statusMessage}</p>
          <p className="text-muted-foreground dark:text-slate-400">{marketingTexts.callToAction}</p>
          <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
          
          {canUseTrackCaloriesOverall && !isLoading && (
            <Button size="lg" className="w-full md:w-auto bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-primary-foreground dark:text-white text-lg py-3" onClick={onScanMealClick}>
              <Camera className="mr-2 h-5 w-5" /> Scanner mon repas
            </Button>
          )}
          {isLoading && (
            <Button size="lg" className="w-full md:w-auto" disabled>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyse en cours...
            </Button>
          )}

          {!canUseTrackCaloriesOverall && !isLoading && (
            <div className="space-y-4 pt-4">
              <p className="text-lg font-semibold text-amber-600 dark:text-amber-400">{marketingTexts.upgradePrompt}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button onClick={onSubscribeClick} size="lg" className="bg-purple-600 hover:bg-purple-700 text-white"><Zap className="mr-2 h-5 w-5" /> {marketingTexts.subscribeNow}</Button>
                <Button onClick={onBuyCreditsClick} size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 dark:border-emerald-500 dark:text-emerald-500 dark:hover:bg-emerald-500/10">{marketingTexts.buyCredits}</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive bg-destructive/10 dark:bg-red-900/30 shadow-lg">
          <CardHeader><CardTitle className="text-destructive dark:text-red-400 flex items-center"><AlertTriangle className="mr-2 h-5 w-5" /> Erreur d'analyse</CardTitle></CardHeader>
          <CardContent><p className="text-destructive dark:text-red-400">{error}</p></CardContent>
        </Card>
      )}

      {uploadedImagePreview && !analysisResult && !isLoading && !error && (
         <Card className="glassmorphism-card shadow-lg dark:bg-slate-800/80">
            <CardHeader><CardTitle className="text-xl font-semibold text-primary dark:text-emerald-400 flex items-center"><ImageIcon className="mr-2 h-5 w-5" /> Image Téléchargée</CardTitle></CardHeader>
            <CardContent className="flex justify-center">
                <img-replace src={uploadedImagePreview} alt="Aperçu du repas téléchargé" className="max-h-64 rounded-md shadow-md" />
            </CardContent>
         </Card>
      )}
      
      {analysisResult && analysisResult.length > 0 && (
        <Card className="glassmorphism-card shadow-xl dark:bg-slate-800/80">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary dark:text-emerald-400">Résultats de l'analyse</CardTitle>
            {uploadedImagePreview && (
                <div className="mt-4 flex justify-center">
                    <img-replace src={uploadedImagePreview} alt="Repas analysé" className="max-h-48 rounded-md shadow-md" />
                </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {analysisResult.map((item, index) => (
              <ResultCard key={index} result={item} onAddToJournalClick={onAddToJournalClick} />
            ))}
          </CardContent>
        </Card>
      )}
      {analysisResult && analysisResult.length === 0 && !isLoading && (
         <Card className="glassmorphism-card shadow-lg dark:bg-slate-800/80">
            <CardHeader><CardTitle className="text-xl font-semibold text-amber-600 dark:text-amber-400 flex items-center"><AlertTriangle className="mr-2 h-5 w-5" /> Aucun aliment détecté</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground dark:text-slate-400">L'API n'a pas pu identifier d'aliments dans l'image. Essaie avec une photo plus claire ou un angle différent.</p>
                 {uploadedImagePreview && (
                    <div className="mt-4 flex justify-center">
                        <img-replace src={uploadedImagePreview} alt="Repas non détecté" className="max-h-48 rounded-md shadow-md" />
                    </div>
                )}
            </CardContent>
         </Card>
      )}

      {CaloriesChartComponent && <CaloriesChartComponent data={chartData} dailyTarget={dailyTarget} />}

      {mealLog && mealLog.length > 0 && (
        <Card className="glassmorphism-card shadow-xl dark:bg-slate-800/80">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary dark:text-emerald-400 flex items-center">
              <BookOpen className="mr-3 h-7 w-7" /> {marketingTexts.historyTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mealLog.slice().reverse().map((meal, index) => (
              <MealHistoryCard key={meal.id || index} meal={meal} />
            ))}
          </CardContent>
        </Card>
      )}

      {mealLog && mealLog.length === 0 && !analysisResult && !isLoading && (
         <Card className="glassmorphism-card shadow-lg dark:bg-slate-800/80">
            <CardHeader><CardTitle className="text-xl font-semibold text-primary dark:text-emerald-400 flex items-center"><BookOpen className="mr-2 h-5 w-5" /> {marketingTexts.historyTitle}</CardTitle></CardHeader>
            <CardContent>
                <p className="text-muted-foreground dark:text-slate-400">{marketingTexts.noHistory}</p>
            </CardContent>
         </Card>
      )}


      <Card className="glassmorphism-card shadow-lg dark:bg-slate-800/80">
          <CardHeader><CardTitle className="text-xl font-semibold text-primary dark:text-emerald-400 flex items-center"><Info className="mr-2 h-5 w-5" /> Comment ça marche ?</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-muted-foreground dark:text-slate-400">
            <p>1. Clique sur "Scanner mon repas" et sélectionne une photo claire de ton assiette.</p>
            <p>2. Notre IA (via CalorieMama) analyse les aliments et estime les calories et macronutriments.</p>
            <p>3. Ajoute les aliments à ton journal pour suivre tes progrès.</p>
          </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glassmorphism-card shadow-md dark:bg-slate-800/80">
          <CardHeader><CardTitle className="text-lg font-semibold text-primary dark:text-emerald-400 flex items-center"><ShieldCheck className="mr-2 h-5 w-5" /> Tes Données</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground dark:text-slate-400">Nous respectons ta vie privée. Tes photos de repas sont utilisées uniquement pour l'analyse et ne sont pas partagées. Tu peux consulter notre <Link to="/confidentialite" className="text-primary hover:underline dark:text-emerald-400 dark:hover:text-emerald-300">politique de confidentialité</Link>.</CardContent>
        </Card>
        <Card className="glassmorphism-card shadow-md dark:bg-slate-800/80">
          <CardHeader><CardTitle className="text-lg font-semibold text-primary dark:text-emerald-400 flex items-center"><HelpCircle className="mr-2 h-5 w-5" /> Besoin d'aide ?</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground dark:text-slate-400">Des questions sur Track-Calories ? Consulte notre <Link to="/faq" className="text-primary hover:underline dark:text-emerald-400 dark:hover:text-emerald-300">FAQ</Link> (bientôt) ou <Link to="/contact" className="text-primary hover:underline dark:text-emerald-400 dark:hover:text-emerald-300">contacte le support</Link>.</CardContent>
        </Card>
      </div>
    </>
  );
};