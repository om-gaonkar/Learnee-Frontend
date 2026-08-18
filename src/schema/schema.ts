export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface Course {
  _id: string;
  title: string;
  subject: string;
  grade: number;
  description: string;
  price: number;
  duration: string;
  teacher: {
    name: string;
    rating: number;
  };
}

export const subjects = [
  "Mathematics",
  "Science",
  "English",
  "Social Studies",
  "Computer Science",
  "Physics",
  "Chemistry",
  "Biology",
];