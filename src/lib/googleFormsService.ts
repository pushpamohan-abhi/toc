import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { QuizQuestion } from '../types';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/forms.body');

let cachedAccessToken: string | null = null;
let isSigningIn = false;

export const initAuthListener = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const signInWithGoogle = async (): Promise<{ user: User; accessToken: string }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Could not retrieve Google Access Token for Google Forms.');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } finally {
    isSigningIn = false;
  }
};

export const getCachedToken = () => cachedAccessToken;

export const createGoogleFormQuiz = async (
  moduleNumber: number,
  moduleTitle: string,
  questions: QuizQuestion[],
  accessToken: string
): Promise<{ formId: string; responderUri: string }> => {
  // 1. Create Empty Form
  const createRes = await fetch('https://forms.googleapis.com/v1/forms', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      info: {
        title: `Automata Theory (10CS56/21CS51) - Module ${moduleNumber} Quiz`,
        documentTitle: `Module ${moduleNumber} Quiz - ${moduleTitle}`
      }
    })
  });

  if (!createRes.ok) {
    const errorData = await createRes.json();
    throw new Error(errorData.error?.message || 'Failed to create Google Form');
  }

  const form = await createRes.json();
  const formId = form.formId;
  const responderUri = form.responderUri;

  // 2. Batch Update: Turn into Quiz & Add Questions
  const requests: any[] = [
    {
      updateSettings: {
        settings: {
          quizSettings: {
            isQuiz: true
          }
        },
        updateMask: 'quizSettings.isQuiz'
      }
    }
  ];

  questions.forEach((q, idx) => {
    const correctAnswerText = q.options[q.answerIndex];
    requests.push({
      createItem: {
        item: {
          title: `${idx + 1}. ${q.question}`,
          description: `Topic: ${q.topic}`,
          questionItem: {
            question: {
              required: true,
              grading: {
                pointValue: 1,
                correctAnswers: {
                  answers: [{ value: correctAnswerText }]
                },
                whenRight: {
                  text: `Correct! ${q.explanation}`
                },
                whenWrong: {
                  text: `Explanation: ${q.explanation}`
                }
              },
              choiceQuestion: {
                type: 'RADIO',
                options: q.options.map((opt) => ({ value: opt }))
              }
            }
          }
        },
        location: { index: idx }
      }
    });
  });

  const updateRes = await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ requests })
  });

  if (!updateRes.ok) {
    const errorData = await updateRes.json();
    throw new Error(errorData.error?.message || 'Failed to populate Google Form questions');
  }

  return { formId, responderUri };
};
