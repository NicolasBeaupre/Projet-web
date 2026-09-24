'use server';

// import {z} from 'zod';
import  QuestionsForm from '@/app/ui/quiz/creer-questions';
import type { NextApiRequest, NextApiResponse } from 'next';
import { createElement } from 'react';

export async function creerQuiz(formData: FormData) {}
export type Status = {
 type: 'default' | 'loading' | 'success' | 'error'
};

export async function ajouterQuestions() {
    // simulate server response time (2s)
    await new Promise((res) => setTimeout(res, 2000));

    return QuestionsForm()
}
