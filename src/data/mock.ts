export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Topic {
  id: string;
  name: string;
  questionCount: number;
  difficulty: Difficulty;
}

export interface Chapter {
  id: string;
  name: string;
  topics: Topic[];
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  questionCount: number;
  chapters: Chapter[];
}

export interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface QuizAttempt {
  id: string;
  subjectId: string;
  subjectName: string;
  chapterName: string;
  topicName: string;
  score: number;
  total: number;
  correct: number;
  wrong: number;
  unanswered: number;
  avgTime: number;
  date: string;
}

const mkTopics = (names: [string, number, Difficulty][]): Topic[] =>
  names.map(([name, q, d], i) => ({
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name,
    questionCount: q,
    difficulty: d,
  }));

const mkChapter = (id: string, name: string, topics: Topic[]): Chapter => ({ id, name, topics });

export const SUBJECTS: Subject[] = [
  {
    id: "math",
    name: "Mathematics",
    icon: "Sigma",
    gradient: "from-[oklch(0.55_0.18_264)] to-[oklch(0.7_0.16_220)]",
    questionCount: 320,
    chapters: [
      mkChapter("ch1", "Number System", mkTopics([
        ["Integers", 12, "Easy"],
        ["Rational Numbers", 15, "Medium"],
        ["Real Numbers", 10, "Hard"],
      ])),
      mkChapter("ch2", "Algebra", mkTopics([
        ["Linear Equations", 14, "Medium"],
        ["Polynomials", 12, "Medium"],
      ])),
      mkChapter("ch3", "Geometry", mkTopics([
        ["Triangles", 10, "Easy"],
        ["Circles", 12, "Hard"],
      ])),
    ],
  },
  {
    id: "science",
    name: "Science",
    icon: "FlaskConical",
    gradient: "from-[oklch(0.7_0.17_150)] to-[oklch(0.6_0.16_200)]",
    questionCount: 280,
    chapters: [
      mkChapter("ch1", "Cell Structure", mkTopics([
        ["Cell Organelles", 10, "Easy"],
        ["Cell Membrane", 8, "Medium"],
        ["Cell Division", 12, "Hard"],
      ])),
      mkChapter("ch2", "Microorganisms", mkTopics([
        ["Bacteria", 9, "Easy"],
        ["Viruses", 8, "Medium"],
      ])),
      mkChapter("ch3", "Metals and Non-metals", mkTopics([
        ["Properties of Metals", 11, "Medium"],
        ["Reactions", 10, "Hard"],
      ])),
    ],
  },
  {
    id: "english",
    name: "English",
    icon: "BookOpen",
    gradient: "from-[oklch(0.65_0.18_300)] to-[oklch(0.55_0.16_330)]",
    questionCount: 220,
    chapters: [
      mkChapter("ch1", "Grammar", mkTopics([
        ["Tenses", 12, "Easy"],
        ["Articles", 8, "Easy"],
      ])),
      mkChapter("ch2", "Comprehension", mkTopics([
        ["Reading Passages", 10, "Medium"],
      ])),
    ],
  },
  {
    id: "social",
    name: "Social Studies",
    icon: "Globe2",
    gradient: "from-[oklch(0.72_0.16_60)] to-[oklch(0.62_0.18_30)]",
    questionCount: 240,
    chapters: [
      mkChapter("ch1", "History of Odisha", mkTopics([
        ["Kalinga War", 10, "Medium"],
        ["Maritime Trade", 8, "Hard"],
      ])),
      mkChapter("ch2", "Geography", mkTopics([
        ["Physical Features", 12, "Easy"],
      ])),
    ],
  },
  {
    id: "odia",
    name: "Odia",
    icon: "Languages",
    gradient: "from-[oklch(0.7_0.18_25)] to-[oklch(0.55_0.18_350)]",
    questionCount: 180,
    chapters: [
      mkChapter("ch1", "ବ୍ୟାକରଣ (Grammar)", mkTopics([
        ["Sandhi", 8, "Medium"],
        ["Samasa", 8, "Hard"],
      ])),
      mkChapter("ch2", "Literature", mkTopics([
        ["Poems", 10, "Easy"],
      ])),
    ],
  },
];

export const SAMPLE_QUESTIONS: MCQ[] = [
  {
    id: "q1",
    question: "Which organelle is known as the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi body"],
    correctIndex: 1,
    explanation: "Mitochondria produce ATP, the energy currency of the cell.",
  },
  {
    id: "q2",
    question: "The capital of Odisha is:",
    options: ["Cuttack", "Puri", "Bhubaneswar", "Rourkela"],
    correctIndex: 2,
  },
  {
    id: "q3",
    question: "Which number is a prime number?",
    options: ["9", "15", "21", "23"],
    correctIndex: 3,
  },
  {
    id: "q4",
    question: "Choose the correct article: ___ honest man.",
    options: ["A", "An", "The", "No article"],
    correctIndex: 1,
    explanation: "'Honest' begins with a vowel sound.",
  },
  {
    id: "q5",
    question: "The Kalinga War was fought in the year:",
    options: ["261 BCE", "321 BCE", "150 BCE", "78 CE"],
    correctIndex: 0,
  },
  {
    id: "q6",
    question: "Water boils at what temperature at sea level?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    correctIndex: 1,
  },
  {
    id: "q7",
    question: "Which of these is a non-metal?",
    options: ["Iron", "Copper", "Sulphur", "Aluminium"],
    correctIndex: 2,
  },
  {
    id: "q8",
    question: "Synonym of 'Brave':",
    options: ["Timid", "Courageous", "Weak", "Sad"],
    correctIndex: 1,
  },
];

export const CLASS_OPTIONS = [6, 7, 8, 9, 10] as const;

export const SAMPLE_HISTORY: QuizAttempt[] = [
  {
    id: "h1", subjectId: "science", subjectName: "Science", chapterName: "Cell Structure",
    topicName: "Cell Organelles", score: 85, total: 10, correct: 8, wrong: 1, unanswered: 1,
    avgTime: 18, date: "2026-05-21",
  },
  {
    id: "h2", subjectId: "math", subjectName: "Mathematics", chapterName: "Algebra",
    topicName: "Linear Equations", score: 70, total: 10, correct: 7, wrong: 3, unanswered: 0,
    avgTime: 25, date: "2026-05-19",
  },
  {
    id: "h3", subjectId: "social", subjectName: "Social Studies", chapterName: "History of Odisha",
    topicName: "Kalinga War", score: 92, total: 12, correct: 11, wrong: 1, unanswered: 0,
    avgTime: 14, date: "2026-05-17",
  },
];
