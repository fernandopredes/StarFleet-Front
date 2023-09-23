import styled from "styled-components";
import data from "../assets/data.jpg";
import { useEffect, useState } from "react";
import { fetchAllQuizzes } from "../api";
import { Quiz } from "../types/quiz";

const Wrapper = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  background: url(${data}) no-repeat center;
  background-size: cover;
  background-position: bottom;
  padding-top: 500px;
  width: 100%;
  position: relative;

  & > span {
    font-size: 48px;
    font-weight: 400;
    position: absolute;
    bottom: 10vh;
    left: 5vw;
    text-align: start;
  }
  @media (max-width: 768px) {
    & > span {
      bottom: 8vh;
      left: 3vw;
    }
  }
`;

const QuizContainer = styled.div`
  background-color: rgba(144, 129, 129, 0.1);
  border: 2px solid #b0b0b0;
  border-radius: 5px;
  width: 70%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 1rem;
  h2{
    margin: auto;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OptionButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: rgba(176, 176, 176, 0.1);
  border: 2px solid #b0b0b0;
  color: #b0b0b0;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgba(176, 176, 176, 0.2);
  }
`;

const FeedbackContainer = styled.div`
  background-color: rgba(176, 176, 176, 0.1);
  border: 2px solid #B0B0B0;
  border-radius: 5px;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
`;

const FeedbackMessage = styled.span`
  font-size: 18px;
  margin-bottom: 20px;
`;

const NextQuestionButton = styled.button`
  padding: 8px 16px;
  background-color: rgba(176, 176, 176, 0.1);
  border: 2px solid #B0B0B0;
  color: #b0b0b0;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgba(176, 176, 176, 0.2);
  }
`;

const Challenge = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number | null>(null);
  const [userAnsweredCorrectly, setUserAnsweredCorrectly] = useState<
    boolean | null
  >(null)

  useEffect(() => {
    async function loadQuizzes() {
      try {
        const fetchedQuizzes = await fetchAllQuizzes();
        setQuizzes(fetchedQuizzes);
        setCurrentQuizIndex(Math.floor(Math.random() * fetchedQuizzes.length))
      } catch (error) {
        console.error("Failed to load quizzes:", error)
      }
    }
    loadQuizzes()
  }, [])

  function handleAnswer(answer: string) {
    if (currentQuizIndex !== null) {
      const quiz = quizzes[currentQuizIndex]
      if (quiz.correct_answer === answer) {
        setUserAnsweredCorrectly(true)
      } else {
        setUserAnsweredCorrectly(false)
      }
    }
  }

  function nextQuestion() {
    const newIndex = Math.floor(Math.random() * quizzes.length)
    setCurrentQuizIndex(newIndex)
    setUserAnsweredCorrectly(null)
  }

  function shuffleArray(array: string[]): string[] {
    return [...array].sort(() => Math.random() - 0.5)
  }

  return (
    <Wrapper>
      <Header>
        <span>Fleet Examination</span>
      </Header>
      {currentQuizIndex !== null && userAnsweredCorrectly === null && (
        <QuizContainer>
          <h2>{quizzes[currentQuizIndex].question}</h2>
          <OptionsContainer>
            {shuffleArray([
              ...quizzes[currentQuizIndex].incorrect_answers
                .split(";")
                .map((answer) => answer.trim()),
              quizzes[currentQuizIndex].correct_answer,
            ]).map((answer, index) => (
              <OptionButton key={index} onClick={() => handleAnswer(answer)}>
                {answer}
              </OptionButton>
            ))}
          </OptionsContainer>
        </QuizContainer>
      )}
      {userAnsweredCorrectly !== null && (
        <FeedbackContainer>
          <FeedbackMessage>
            {userAnsweredCorrectly ? "Correct!" : "Wrong answer...Let's try again."}
          </FeedbackMessage>
          <NextQuestionButton onClick={nextQuestion}>Next question</NextQuestionButton>
      </FeedbackContainer>
      )}
    </Wrapper>
  );
};

export default Challenge;
