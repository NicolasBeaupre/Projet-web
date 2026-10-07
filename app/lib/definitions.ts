// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Quiz = {
  nomQuiz: string,
  imageURL: string,
  categorie: string,
  questions: [
    { titre: string, reponse1: string, reponse2: string, reponse3: string, reponse4: string, bonneReponse: string }
  ]
}

export type Questions = {
  id:string;
  titre:string;
  reponse1:string;
  reponse2:string;
  reponse3:string;
  reponse4:string;
}