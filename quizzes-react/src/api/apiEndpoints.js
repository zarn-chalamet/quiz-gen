const BASE_URL = "http://localhost:8080/api/v1";

export const apiEndpoints = {
  CREATE_QUIZ: `${BASE_URL}/test/quizzes/create`,
  UPDATE_QUIZ: (id) => `${BASE_URL}/test/quizzes/update/${id}`,
  DELETE_QUIZ: (id) => `${BASE_URL}/test/quizzes/delete/${id}`,
  FETCH_QUIZZES: `${BASE_URL}/test/quizzes`,
  FETCH_USER_QUIZZES: `${BASE_URL}/test/quizzes/user-quizzes`,
  FETCH_QUIZ_BY_ID: (id) => `${BASE_URL}/test/quizzes/${id}`,

  CREATE_FLASHCARD: `${BASE_URL}/test/flash-cards/create`,
  UPDATE_FLASHCARD: (id) => `${BASE_URL}/test/flash-cards/update/${id}`,
  DELETE_FLASHCARD: (id) => `${BASE_URL}/test/flash-cards/delete/${id}`,
  FETCH_FLASHCARDS: `${BASE_URL}/test/flash-cards`,
  FETCH_USER_FLASHCARDS: `${BASE_URL}/test/flash-cards/user-cards`,
  FETCH_FLASHCARD_BY_ID: (id) => `${BASE_URL}/test/flash-cards/${id}`,

  GENERATE_QUIZ: `${BASE_URL}/test/generate/quiz`,
  GENERATE_FLASHCARD: `${BASE_URL}/test/generate/flash-cards`,
};
