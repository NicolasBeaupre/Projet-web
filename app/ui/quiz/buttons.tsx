'use client'
import { useState } from 'react';
import React from 'react';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import QuestionsForm from './creer-questions';
import { ajouterQuestions, creerQuiz } from '@/app/lib/actions';
import { Crete_Round } from 'next/font/google';

export function CreerQuestionBtn() {
  const [questions, setQuestionId] = React.useState<React.ReactNode[]>([])

  function ajouterQuestionClick(){
    setQuestionId([...questions,<QuestionsForm key={questions.length}/>])
  }
  return (
    <>
      <div>
        {questions}
      </div>
      <button type="button" className="rounded-md border p-2 hover:bg-gray-100" onClick={ajouterQuestionClick}>
        <span className="sr-only">Ajouter une question</span>
        <PlusIcon className="w-5" />
      </button>
    </>
    );
}

export function SupprimerQuizBtn() {
  return (
    <>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Supprimer</span>
        <TrashIcon className="w-5" />
      </button>
    </>
  );
}

export function SupprimerQuestionBtn({ id }: { id: string }) {
  return (
    <>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Supprimer</span>
        <TrashIcon className="w-5" />
      </button>
    </>
  );
}


