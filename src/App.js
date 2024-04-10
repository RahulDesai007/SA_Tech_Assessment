import React, { useState, useEffect } from 'react';
import { QUESTIONS } from './Questions';
import { Container, Paper, Typography, Button } from '@mui/material';

const questions = QUESTIONS;

const App = () => {
  const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
  const [currentScore, setCurrentScore] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [allScores, setAllScores] = useState([]);
  const [rounds, setRounds] = useState(0);
  const [yesButtonDisabled, setYesButtonDisabled] = useState(Array(questions.length).fill(false));
  const [selectedChoices, setSelectedChoices] = useState(Array(questions.length).fill(null));
  const [calculateButtonDisabled, setCalculateButtonDisabled] = useState(false);

  const handleAnswer = (index, answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = answer;
    setUserAnswers(updatedAnswers);
    const updatedYesButtonDisabled = [...yesButtonDisabled];
    updatedYesButtonDisabled[index] = true;
    setYesButtonDisabled(updatedYesButtonDisabled);
    const updatedSelectedChoices = [...selectedChoices];
    updatedSelectedChoices[index] = answer;
    setSelectedChoices(updatedSelectedChoices);
  };

  const calculateScore = () => {
    const yesCount = userAnswers.filter(answer => answer === 'Yes').length;
    const score = (yesCount / questions.length) * 100;
    setAllScores(prevScores => [...prevScores, score]); // Add current score to allScores array
    return score;
  };

  const handleCalculateScore = () => {
    const score = calculateScore();
    setCurrentScore(score);
    setRounds(prevRounds => prevRounds + 1);
    setCalculateButtonDisabled(true);
  };

  const handleReset = () => {
    setUserAnswers(Array(questions.length).fill(null));
    setSelectedChoices(Array(questions.length).fill(null));
    setCurrentScore(0);
    setCalculateButtonDisabled(false);
    setYesButtonDisabled(Array(questions.length).fill(false));
  };

  useEffect(() => {
    setAverageScore(allScores.reduce((acc, curr) => acc + curr, 0) / allScores.length);
  }, [allScores]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Please Select the Choices
        </Typography>
        {questions.map((question, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <Typography variant="body1">{question} {selectedChoices[index] !== null && <b>{selectedChoices[index]}</b>}</Typography>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '10px' }}
              onClick={() => handleAnswer(index, 'Yes')}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleAnswer(index, 'No')}
            >
              No
            </Button>
          </div>
        ))}
        <Button
          variant="contained"
          onClick={handleCalculateScore}
          style={{ marginTop: '20px' }}
          disabled={calculateButtonDisabled}
        >
          Calculate Score
        </Button>
        <Button variant="contained" onClick={handleReset} style={{ marginTop: '20px', marginLeft: '10px' }}>
          Reset
        </Button>
        <div style={{ background: '#CECECE', padding: '20px', marginTop: '20px' }}>
          <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>
            Current Score: {currentScore.toFixed(2)}
          </Typography>
          <Typography variant="h6" align="center">
            Average Score: {isNaN(averageScore.toFixed(2)) ? "0.00" : averageScore.toFixed(2)}
          </Typography>
          <Typography variant="h6" align="center">
            Total Rounds: {rounds}
          </Typography>
        </div>
      </Paper>
    </Container>
  );
};

export default App;
