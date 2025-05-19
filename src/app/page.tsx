"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  "How are you feeling today?",
  "Do you like working in a team?",
  "Would you rather travel or stay in?",
  "What's your favorite time of day?",
  "Pick a color that vibes with you."
];

const options = [
  ["Great", "Okay", "Meh"],
  ["Yes", "Sometimes", "No"],
  ["Travel", "Stay In", "Depends"],
  ["Morning", "Afternoon", "Night"],
  ["Blue", "Red", "Green"]
];

export default function VibeCheckApp() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (submitted) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    if (step + 1 === questions.length) {
      setSubmitted(true);
    } else {
      setStep(step + 1);
    }
  };

  const getVibe = () => {
    const score = answers.reduce((acc, a, i) => acc + a.length, 0);
    return score % 2 === 0 ? "Chill Vibes" : "Hype Energy";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">
      {typeof window !== "undefined" && showConfetti && (
  <Confetti recycle={false} numberOfPieces={500} />
)}


      <h1 className="text-4xl font-bold mb-6">Vibe Check</h1>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full max-w-md">
              <CardContent className="flex flex-col gap-4 p-6">
                {step === 0 && (
                  <Input
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}
                <h2 className="text-xl font-medium">{questions[step]}</h2>
                <div className="flex flex-col gap-2">
                  {options[step].map((opt) => (
                    <Button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      disabled={step === 0 && name === ""}
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
                <Progress value={(step / questions.length) * 100} />
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="w-full max-w-md">
              <CardContent className="p-6 text-center">
                <h2 className="text-2xl font-semibold mb-4">Hi {name}!</h2>
                <p className="text-xl">
                  Your vibe is: <span className="font-bold">{getVibe()}</span>
                </p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setStep(0);
                    setAnswers([]);
                    setName("");
                    setSubmitted(false);
                  }}
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
