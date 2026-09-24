import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  Footprints,
  Compass,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { sound } from '../utils/sound';

export const CivicActivitiesSection: React.FC = () => {
  const {
    quizzes,
    answeredQuizIds,
    answerQuiz,
    userPoints,
    quests,
    toggleJoinQuest,
    toggleStopComplete
  } = useCivicData();

  const [activeSubTab, setActiveSubTab] = useState<'quiz' | 'hazard_game' | 'walking_quests'>('quiz');
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [quizResults, setQuizResults] = useState<Record<string, { isCorrect: boolean; points: number }>>({});

  // Mini-game state
  const [gameStep, setGameStep] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const hazardGameScenarios = [
    {
      img: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80',
      question: 'What immediate municipal hazard is present in this street photo?',
      options: ['Severed Live Electric Wire', 'Water Pipe Burst', 'Uncollected Dry Leaves', 'Faded Lane Markings'],
      correctIdx: 0,
      dept: 'MGVCL & VMC Emergency Electrical Cell'
    },
    {
      img: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
      question: 'Identify the traffic safety violation on this flyover section:',
      options: ['Over-speeding Truck', 'Stray Cattle Obstruction', 'Broken Guard Rail', 'Oil Spill on Ramp'],
      correctIdx: 1,
      dept: 'VMC Cattle Nuisance Control (CNCD)'
    },
    {
      img: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
      question: 'What defect category should be assigned to this road condition?',
      options: ['Cosmetic Discoloration', 'Severe Bitumen Crater / Subsidence', 'Temporary Gravel', 'Speed Breaker'],
      correctIdx: 1,
      dept: 'VMC Roads & Bridges Engineering Division'
    }
  ];

  const handleQuizSelect = (quizId: string, idx: number) => {
    if (answeredQuizIds.includes(quizId)) return;

    setSelectedQuizAnswers((prev) => ({ ...prev, [quizId]: idx }));
    const result = answerQuiz(quizId, idx);
    setQuizResults((prev) => ({ ...prev, [quizId]: { isCorrect: result.isCorrect, points: result.pointsAwarded } }));

    if (result.isCorrect) {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const handleGameAnswer = (selectedIdx: number) => {
    const current = hazardGameScenarios[gameStep];
    const isCorrect = selectedIdx === current.correctIdx;

    if (isCorrect) {
      sound.playSuccess();
      setGameScore((s) => s + 30);
    } else {
      sound.playClick();
    }

    if (gameStep + 1 < hazardGameScenarios.length) {
      setGameStep((s) => s + 1);
    } else {
      setGameOver(true);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const restartGame = () => {
    setGameStep(0);
    setGameScore(0);
    setGameOver(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-neutral-800 bg-[#0F141F] p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
              <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              <span>Vadodara Citizen Community & Games</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Fun Activities & Civic Quests
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              Test your knowledge of Vadodara history, sharpen your hazard detection eye, or take a walking quest through royal Gaekwad avenues. Earn bonus points for the redemption store!
            </p>
          </div>

          {/* Sub-tab pills */}
          <div className="flex flex-wrap gap-2 self-start md:self-auto bg-neutral-900/80 p-1.5 rounded-2xl border border-neutral-800">
            <button
              onClick={() => setActiveSubTab('quiz')}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                activeSubTab === 'quiz'
                  ? 'bg-neutral-200 text-neutral-900 shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Daily Quiz (+75 pts)
            </button>
            <button
              onClick={() => setActiveSubTab('hazard_game')}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                activeSubTab === 'hazard_game'
                  ? 'bg-neutral-200 text-neutral-900 shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Hazard Inspector Mini-Game
            </button>
            <button
              onClick={() => setActiveSubTab('walking_quests')}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all ${
                activeSubTab === 'walking_quests'
                  ? 'bg-neutral-200 text-neutral-900 shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Heritage Trails
            </button>
          </div>
        </div>
      </div>

      {/* 1. Daily Civic Quiz */}
      {activeSubTab === 'quiz' && (
        <div className="space-y-6">
          <div className="text-xs font-mono uppercase text-neutral-400">
            Today’s Vadodara Civic Challenge • Earn +25 Points per correct answer
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quizzes.map((quiz, idx) => {
              const isAnswered = answeredQuizIds.includes(quiz.id);
              const result = quizResults[quiz.id];

              return (
                <div
                  key={quiz.id}
                  className="flex flex-col justify-between rounded-2xl border border-neutral-800 bg-[#0E131E] p-5 space-y-4 shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-400 font-bold">Question {idx + 1}</span>
                      <span className="text-neutral-400">+{quiz.points} pts</span>
                    </div>

                    <h4 className="font-bold text-sm text-white leading-snug">
                      {quiz.question}
                    </h4>

                    {/* Options */}
                    <div className="space-y-2 pt-2">
                      {quiz.options.map((opt, oIdx) => {
                        const isSelected = selectedQuizAnswers[quiz.id] === oIdx;
                        const isCorrectOption = oIdx === quiz.correctIndex;

                        let btnClass = 'border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:border-neutral-700';
                        if (isAnswered) {
                          if (isCorrectOption) {
                            btnClass = 'border-emerald-600 bg-emerald-950/60 text-emerald-300 font-bold';
                          } else if (isSelected && !isCorrectOption) {
                            btnClass = 'border-rose-600 bg-rose-950/60 text-rose-300 line-through';
                          } else {
                            btnClass = 'border-neutral-800 opacity-40 text-neutral-500';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={isAnswered}
                            onClick={() => handleQuizSelect(quiz.id, oIdx)}
                            className={`w-full rounded-xl border p-2.5 text-xs text-left transition-all ${btnClass}`}
                          >
                            <span className="mr-2 font-mono text-neutral-500">{String.fromCharCode(65 + oIdx)}.</span>
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feedback explanation if answered */}
                  {isAnswered && (
                    <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3 text-[11px] text-neutral-300 space-y-1">
                      <div className="flex items-center space-x-1.5 font-bold">
                        {result?.isCorrect ? (
                          <span className="text-emerald-400 flex items-center">
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                            Correct! (+{quiz.points} pts added)
                          </span>
                        ) : (
                          <span className="text-rose-400 flex items-center">
                            <XCircle className="h-3.5 w-3.5 mr-1" />
                            Incorrect
                          </span>
                        )}
                      </div>
                      <p className="text-neutral-400 leading-normal">{quiz.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Hazard Inspector Mini-Game */}
      {activeSubTab === 'hazard_game' && (
        <div className="max-w-2xl mx-auto rounded-3xl border border-neutral-800 bg-[#0E131E] overflow-hidden shadow-2xl">
          {gameOver ? (
            <div className="p-8 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-black text-white">Inspection Certification Complete!</h3>
              <p className="text-sm text-neutral-300 max-w-md mx-auto">
                You scored <strong className="text-amber-400 font-mono text-lg">{gameScore} Points</strong> on the Vadodara Street Hazard Challenge.
              </p>
              <button
                onClick={restartGame}
                className="rounded-xl bg-orange-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-orange-500 shadow"
              >
                Play Again
              </button>
            </div>
          ) : (
            <div>
              {/* Photo viewport */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-neutral-950">
                <img
                  src={hazardGameScenarios[gameStep].img}
                  alt="Hazard scenario"
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 left-3 rounded-lg bg-black/80 backdrop-blur-md px-2.5 py-1 text-xs font-mono font-bold text-white border border-neutral-700">
                  Scenario {gameStep + 1} of {hazardGameScenarios.length}
                </div>
                <div className="absolute top-3 right-3 rounded-lg bg-amber-500/20 backdrop-blur-md px-2.5 py-1 text-xs font-mono font-bold text-amber-300 border border-amber-500/40">
                  Score: {gameScore} pts
                </div>
              </div>

              {/* Question & choices */}
              <div className="p-6 space-y-4">
                <h4 className="font-bold text-base text-white">
                  {hazardGameScenarios[gameStep].question}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {hazardGameScenarios[gameStep].options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleGameAnswer(oIdx)}
                      className="rounded-xl border border-neutral-800 bg-neutral-900/70 p-3 text-xs font-semibold text-neutral-200 hover:border-orange-500 hover:bg-orange-950/20 hover:text-white transition-all text-left"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Heritage Trails View */}
      {activeSubTab === 'walking_quests' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quests.map((quest) => (
            <div
              key={quest.id}
              className="rounded-2xl border border-neutral-800 bg-[#0E131E] overflow-hidden shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-neutral-950">
                  <img src={quest.imageUrl} alt={quest.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E131E] via-transparent to-black/30" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs font-semibold text-emerald-400">{quest.titleGujarati}</span>
                    <h3 className="text-lg font-black text-white">{quest.title}</h3>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-xs text-neutral-300">{quest.description}</p>
                  <div className="flex items-center justify-between text-xs text-neutral-400 font-mono border-t border-neutral-800 pt-2">
                    <span>{quest.distanceKm} km</span>
                    <span>~{quest.estMinutes} mins</span>
                    <span className="text-amber-400 font-bold">+{quest.karmaReward} pts</span>
                  </div>

                  {/* Stops list */}
                  <div className="space-y-1.5 pt-2">
                    {quest.stops.map((st) => (
                      <div
                        key={st.id}
                        onClick={() => quest.joined && toggleStopComplete(quest.id, st.id)}
                        className={`flex items-start space-x-2 p-2 rounded-lg text-xs border ${
                          st.completed ? 'border-emerald-800 bg-emerald-950/20 text-emerald-300 line-through' : 'border-neutral-800 bg-neutral-900/40 text-neutral-300'
                        } ${quest.joined ? 'cursor-pointer' : ''}`}
                      >
                        <Check className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${st.completed ? 'text-emerald-400' : 'text-neutral-600'}`} />
                        <div>
                          <div className="font-semibold">{st.name}</div>
                          <div className="text-[10px] text-neutral-400">{st.hint}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-neutral-800">
                <button
                  onClick={() => toggleJoinQuest(quest.id)}
                  className={`w-full rounded-xl py-2.5 text-xs font-bold transition-all ${
                    quest.joined
                      ? 'border border-neutral-700 bg-neutral-800 text-neutral-300'
                      : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow'
                  }`}
                >
                  {quest.joined ? 'Leave Quest' : 'Start Walking Quest'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
