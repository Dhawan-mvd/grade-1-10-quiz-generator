import React, { useState } from 'react';
import './App.css';

const loadingGif = 'https://i.gifer.com/origin/b1/b1d917f813c167b616523900494ff9f4.gif';
const congratulationsGif = 'https://media.tenor.com/images/a093f14b03a259f20719a7999761c38f/tenor.gif';
const tryAgainGif = 'https://media.tenor.com/images/a515956559b1b6d12942931111ff1a3b/tenor.gif';

function App() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [grade, setGrade] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [showSolutions, setShowSolutions] = useState(false);

  const subjects = [
    { name: 'maths', label: 'Maths' },
    { name: 'english', label: 'English' },
    { name: 'science', label: 'Science' },
    { name: 'kannada', label: 'Kannada' },
    { name: 'hindi', label: 'Hindi' },
    { name: 'social_studies', label: 'Social Studies' },
  ];

  const handleSubjectChange = (subjectName) => {
    setSelectedSubject(subjectName);
    setError('');
  };

  const generateMathsPrompt = () => {
    return `Generate exactly 20 unique multiple-choice questions for grade ${grade} about maths, following the Indian curriculum. Present the questions in a way that is engaging for children. Ensure that the questions are different each time. For each question, also provide the correct answer and a brief, step-by-step explanation of how to arrive at the correct answer, suitable for a grade ${grade} student following Indian standards.

    Format each question EXACTLY like this:

    Q1: [question text]
    A) [option 1]
    B) [option 2]
    C) [option 3]
    D) [option 4]
    Correct Answer: [letter A-D]
    Solution: [step-by-step explanation]

    Requirements:
    1. Only include the 20 questions in this exact format.
    2. Questions should be appropriate and interesting for grade ${grade} students based on the Indian curriculum.
    3. Each question must have 4 options.
    4. Only one correct answer per question.
    5. Provide a 'Correct Answer' and a 'Solution' for each question.
    6. Do not include any additional text or explanations outside the specified format.`;
  };

  const generateEnglishPrompt = () => {
    return `Generate exactly 20 unique multiple-choice questions for grade ${grade} about english, following the Indian curriculum. Present the questions in a way that is engaging for children. Ensure that the questions are different each time. For each question, also provide the correct answer and a brief explanation of why it is correct, suitable for a grade ${grade} student following Indian standards.

    Format each question EXACTLY like this:

    Q1: [question text]
    A) [option 1]
    B) [option 2]
    C) [option 3]
    D) [option 4]
    Correct Answer: [letter A-D]
    Solution: [brief explanation]

    Requirements:
    1. Only include the 20 questions in this exact format.
    2. Questions should be appropriate and interesting for grade ${grade} students based on the Indian curriculum.
    3. Each question must have 4 options.
    4. Only one correct answer per question.
    5. Provide a 'Correct Answer' and a 'Solution' for each question.
    6. Do not include any additional text or explanations outside the specified format.`;
  };

  const generateSciencePrompt = () => {
    return `Generate exactly 20 unique multiple-choice questions for grade ${grade} about science, following the Indian curriculum. Present the questions in a way that is engaging for children. Ensure that the questions are different each time. For each question, also provide the correct answer and a brief explanation of why it is correct, suitable for a grade ${grade} student following Indian standards.

    Format each question EXACTLY like this:

    Q1: [question text]
    A) [option 1]
    B) [option 2]
    C) [option 3]
    D) [option 4]
    Correct Answer: [letter A-D]
    Solution: [brief explanation]

    Requirements:
    1. Only include the 20 questions in this exact format.
    2. Questions should be appropriate and interesting for grade ${grade} students based on the Indian curriculum.
    3. Each question must have 4 options.
    4. Only one correct answer per question.
    5. Provide a 'Correct Answer' and a 'Solution' for each question.
    6. Do not include any additional text or explanations outside the specified format.`;
  };

  const generateKannadaPrompt = () => {
    return `Generate exactly 20 unique multiple-choice questions for grade ${grade} about kannada, following the Karnataka state board curriculum. Present the questions in a way that is engaging for children. Ensure that the questions are different each time and that the questions and options are in Kannada. For each question, also provide the correct answer and a brief explanation in Kannada of why it is correct, suitable for a grade ${grade} student following Karnataka state board standards.

    Format each question EXACTLY like this:

    Q1: [question text]
    A) [option 1]
    B) [option 2]
    C) [option 3]
    D) [option 4]
    Correct Answer: [letter A-D]
    Solution: [brief explanation in Kannada]

    Requirements:
    1. Only include the 20 questions in this exact format.
    2. Questions should be appropriate and interesting for grade ${grade} students based on the Karnataka state board curriculum.
    3. Each question must have 4 options.
    4. Only one correct answer per question.
    5. Provide a 'Correct Answer' and a 'Solution' for each question.
    6. Do not include any additional text or explanations outside the specified format.`;
  };

  const generateHindiPrompt = () => {
    return `Generate exactly 20 unique multiple-choice questions for grade ${grade} about hindi, following the Indian curriculum. Present the questions in a way that is engaging for children. Ensure that the questions are different each time and that the questions and options are in Hindi. For each question, also provide the correct answer and a brief explanation in Hindi of why it is correct, suitable for a grade ${grade} student following Indian standards.

    Format each question EXACTLY like this:

    Q1: [question text]
    A) [option 1]
    B) [option 2]
    C) [option 3]
    D) [option 4]
    Correct Answer: [letter A-D]
    Solution: [brief explanation in Hindi]

    Requirements:
    1. Only include the 20 questions in this exact format.
    2. Questions should be appropriate and interesting for grade ${grade} students based on the Indian curriculum.
    3. Each question must have 4 options.
    4. Only one correct answer per question.
    5. Provide a 'Correct Answer' and a 'Solution' for each question.
    6. Do not include any additional text or explanations outside the specified format.`;
  };

  const generateSocialStudiesPrompt = () => {
    return `Generate exactly 20 unique multiple-choice questions for grade ${grade} about social studies (history, geography, civics), following the Indian curriculum. Present the questions in a way that is engaging for children. Ensure that the questions are different each time. For each question, also provide the correct answer and a brief explanation of why it is correct, suitable for a grade ${grade} student following Indian standards.

    Format each question EXACTLY like this:

    Q1: [question text]
    A) [option 1]
    B) [option 2]
    C) [option 3]
    D) [option 4]
    Correct Answer: [letter A-D]
    Solution: [brief explanation]

    Requirements:
    1. Only include the 20 questions in this exact format.
    2. Questions should be appropriate and interesting for grade ${grade} students based on the Indian curriculum.
    3. Each question must have 4 options.
    4. Only one correct answer per question.
    5. Provide a 'Correct Answer' and a 'Solution' for each question.
    6. Do not include any additional text or explanations outside the specified format.`;
  };

  const parseQuestions = (responseText) => {
    const questionBlocks = responseText.split(/Q\d+:\s/).filter(Boolean);
    return questionBlocks.map((block, originalIndex) => {
      const lines = block.split('\n').filter(line => line.trim() !== '');
      if (lines.length < 6) return null;

      const questionMatch = lines[0].match(/(.*)/);
      const options = {};
      ['A', 'B', 'C', 'D'].forEach((letter, i) => {
        const optionLine = lines[i + 1];
        const match = optionLine?.match(new RegExp(`${letter}\\)\\s*(.*)`));
        if (match) {
          options[letter] = match[1]?.trim();
        }
      });
      const correctAnswerMatch = lines[5]?.match(/Correct Answer:\s*([A-D])/i);
      const solutionMatch = lines[6]?.match(/Solution:\s*(.*)/i);

      if (
        questionMatch &&
        options['A'] &&
        options['B'] &&
        options['C'] &&
        options['D'] &&
        correctAnswerMatch &&
        solutionMatch
      ) {
        return {
          originalIndex,
          question: questionMatch[1]?.trim(),
          options,
          correctAnswer: correctAnswerMatch[1]?.toUpperCase(),
          solution: solutionMatch[1]?.trim(),
        };
      }
      return null;
    }).filter(Boolean);
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const evaluateAnswers = () => {
    let correctCount = 0;
    const detailedResults = questions.map((question, index) => {
      const isCorrect = userAnswers[index] === question.correctAnswer;
      if (isCorrect) {
        correctCount++;
      }
      return {
        questionIndex: index + 1, // Display question number
        questionText: question.question,
        isCorrect: isCorrect,
        correctAnswer: question.correctAnswer,
        solution: question.solution,
        userAnswer: userAnswers[index] || null, // Handle not answered
      };
    });

    setResults({
      total: questions.length,
      correct: correctCount,
      percentage: Math.round((correctCount / questions.length) * 100),
      details: detailedResults
    });
    setShowSolutions(true);
  };

  const resetQuiz = () => {
    window.location.reload();
  };

  const fetchQuestions = async () => {
    if (!apiKey) {
      setError('Please enter your Google AI Studio API key.');
      return;
    }

    if (!selectedSubject) {
      setError('Please select a subject.');
      return;
    }

    setIsLoading(true);
    setQuestions([]);
    setResults(null);
    setUserAnswers({});
    setError('');
    setShowSolutions(false);

    let prompt = '';
    switch (selectedSubject) {
      case 'maths':
        prompt = generateMathsPrompt();
        break;
      case 'english':
        prompt = generateEnglishPrompt();
        break;
      case 'science':
        prompt = generateSciencePrompt();
        break;
      case 'kannada':
        prompt = generateKannadaPrompt();
        break;
      case 'hindi':
        prompt = generateHindiPrompt();
        break;
      case 'social_studies':
        prompt = generateSocialStudiesPrompt();
        break;
      default:
        setError('Invalid subject selected.');
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 3500,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = 'Failed to fetch questions.';
        if (data.error?.message) {
          errorMessage += ` API error: ${data.error.message}`;
        } else if (response.status === 401) {
          errorMessage = 'Invalid API key. Please double-check your key.';
        } else if (response.status === 429) {
          errorMessage = 'API request limit exceeded. Please try again later.';
        }
        throw new Error(errorMessage);
      }

      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!responseText) {
        throw new Error('No questions generated in the response.');
      }

      const parsedQuestions = parseQuestions(responseText);
      if (parsedQuestions.length !== 20) {
        throw new Error(`Expected 20 questions, but received ${parsedQuestions.length}. Please try again.`);
      }
      if (parsedQuestions.some(q => !q)) {
        throw new Error('Failed to parse all questions correctly. Please try again.');
      }

      setQuestions(parsedQuestions);
    } catch (error) {
      console.error('API Error:', error);
      setError(error.message || 'Failed to generate questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fun Quiz Time!</h1>
      </header>
      <main className="main-content">
        {questions.length === 0 && !isLoading && (
          <div className="setup-form">
            <h2>Grade 1-10 Quiz Generator</h2>
            <h2>Choose Your Adventure!</h2>
            <div className="form-group">
              <label>Pick a Subject:</label>
              <div className="subject-options">
                {subjects.map(subject => (
                  <label key={subject.name} className={`subject-label ${selectedSubject === subject.name ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="subject"
                      value={subject.name}
                      checked={selectedSubject === subject.name}
                      onChange={() => handleSubjectChange(subject.name)}
                    />
                    <span>{subject.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Select Your Grade:</label>
              <select
                value={grade}
                onChange={(e) => setGrade(parseInt(e.target.value))}
                className="grade-select"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div className="form-group api-key-input">
              <label>Secret Key (for grown-ups):</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setError('');
                }}
                placeholder="Enter API Key"
              />
              <span className="api-key-help">
                <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer">
                  Where to find this?
                </a>
              </span>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button
              onClick={fetchQuestions}
              disabled={isLoading || !selectedSubject || !apiKey}
              className="generate-button"
            >
              Let's Go!
            </button>
          </div>
        )}

        {isLoading && (
          <div className="loading-container">
            <img src={loadingGif} alt="Loading..." className="loading-gif" />
            <p className="loading-text">Getting your awesome questions ready...</p>
          </div>
        )}

        {questions.length > 0 && !results && (
          <div className="quiz-container">
            <h2>Time for your {selectedSubject.charAt(0).toUpperCase() + selectedSubject.slice(1)} Quiz! (Grade {grade})</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              evaluateAnswers();
            }}>
              {questions.map((question, index) => (
                <div key={index} className="question-card">
                  <h3>Q{index + 1}: {question.question}</h3>
                  <div className="options">
                    {['A', 'B', 'C', 'D'].map(option => {
                      const optionText = question.options[option];
                      return optionText ? (
                        <label key={option} className="option-label">
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            checked={userAnswers[index] === option}
                            onChange={() => handleAnswerSelect(index, option)}
                            required
                          />
                          <span className="option-letter">{option})</span> {optionText}
                        </label>
                      ) : null;
                    })}
                  </div>
                </div>
              ))}
              <button type="submit" className="submit-button">
                Check My Answers!
              </button>
            </form>
          </div>
        )}

        {results && (
          <div className="results-container">
            <h2>Quiz Results!</h2>
            {results.percentage >= 70 ? (
              <img src={congratulationsGif} alt="Congratulations!" className="result-gif" />
            ) : (
              <img src={tryAgainGif} alt="Try Again!" className="result-gif" />
            )}
            <div className="score-summary">
              You got <span className="score">{results.correct}</span> out of <span className="total">{results.total}</span> correct! ({results.percentage}%)
            </div>

            {showSolutions && results.details && (
              <div className="solutions-container">
                <h3>Detailed Results and Solutions:</h3>
                {results.details.map(detail => (
                  <div key={detail.questionIndex} className={`solution-item ${detail.isCorrect ? 'correct' : 'incorrect'}`}>
                    <h4>Question {detail.questionIndex}: {detail.questionText}</h4>
                    <p>Your Answer: <span className={detail.userAnswer === null ? 'not-answered' : detail.isCorrect ? 'correct-answer-text' : 'incorrect-answer-text'}>
                      {detail.userAnswer === null ? 'Not answered' : detail.userAnswer}
                    </span>
                    </p>
                    <p>Correct Answer: <span className='correct-answer-text'>{detail.correctAnswer}</span></p>
                    <p>Solution: {detail.solution}</p>
                  </div>
                ))}
              </div>
            )}

            <button onClick={resetQuiz} className="new-quiz-button">
              Play Again!
            </button>
          </div>
        )}
      </main>
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Fun Quiz Generator | Developed by <a href="https://www.linkedin.com/in/dhawan-mvd-308b67ba/" target="_blank" rel="noopener noreferrer">Dhawan MVD</a></p>
      </footer>
    </div>
  );
}

export default App;
