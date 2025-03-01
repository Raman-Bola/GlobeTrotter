import React, { useState, useEffect } from "react";
import UserRegistration from "./UserRegistration";
import { Button } from "./Button";
import ScoreBoard from "./ScoreBoard";
import ConfettiEffect from "./ConfettiEffect";
import { fetchQuestion, checkAnswer} from "../services/api";
import { fetchOptions } from "../services/api";

export default function GeoQuiz() {
  const [username, setUsername] = useState(null);
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false);
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState(null);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNewQuestion();
  }, []);

  const loadNewQuestion = async () => {
  try {
    setLoading(true);
    const data = await fetchQuestion(); 
    const optionsData = await fetchOptions(data.id); 
    optionsData[data.city] = data.fun_fact[0];
    const shuffledOptions = Object.entries(optionsData)
      .sort(() => Math.random() - 0.5) 
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}); 
    setQuestion(data);
    setOptions(shuffledOptions);
    setSelectedAnswer(null);
    setFeedback(null);
    setShowConfetti(false);
  } catch (error) {
    console.error("Error fetching question:", error);
  } finally {
    setLoading(false);
  }
};

const handleAnswer = async (answer) => {
  setSelectedAnswer(answer);
  try {
    const result = await checkAnswer(question.id, answer); 

    const funFact = options[answer] ? options[answer] : "No fun fact available." ;
    if (result.correct) {
      setFeedback({ correct: true, fact: funFact });
      setShowConfetti(true);
      setScore((prev) => ({ ...prev, correct: prev.correct + 1 }));
    } else {
      setFeedback({ correct: false, fact: funFact });
      setScore((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));
    }
  } catch (error) {
    console.error("Error checking answer:", error);
  }
};

  const generateInviteLink = () => {
    return `${window.location.origin}?invite=${username}&score=${score.correct}`;
  };

  const shareOnWhatsApp = () => {
    if (!username) {
      setShowUsernamePrompt(true);
      return;
    }
    const inviteLink = generateInviteLink();
    const message = `🌍 I’m playing the GeoQuiz! I scored ${score.correct} so far! Can you beat me? Play here: ${inviteLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="quiz-container">
      {showConfetti && <ConfettiEffect />}
      <h1>Guess the Destination! 🌍</h1>

      {loading ? <p>Loading...</p> : question && (
        <>
          <p className="clue">{question.clues}</p>
          <div className="options">
            {Object.keys(options).map(city => (
              <Button key={city} onClick={() => handleAnswer(city)}>
                {city}
              </Button>
            ))}
          </div>
        </>
      )}

      {feedback && (
        <div className="feedback">
          {feedback.correct ? (
            <p className="correct">🎉 Correct! Fun fact: {feedback.fact}</p>
          ) : (
            <p className="incorrect">😢 Incorrect! Fun fact: {feedback.fact}</p>
          )}
          <Button onClick={loadNewQuestion}>Play Again</Button>
        </div>
      )}

      <ScoreBoard score={score} />

      <div className="share-section">
        <h3>Challenge Your Friends!</h3>
        <Button onClick={shareOnWhatsApp}>Challenge a Friend 🎉</Button>
      </div>

      {showUsernamePrompt && (
        <UserRegistration
          onRegister={(name) => {
            setUsername(name);
            setShowUsernamePrompt(false);
            shareOnWhatsApp(); // Retry sharing after username is set
          }}
        />
      )}

    </div>
  );
}
