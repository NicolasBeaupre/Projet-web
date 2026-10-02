"use server"
import { createClient } from '@/lib/supabase/server';

export default async function ajouterQuiz(data:any) {
  const supabase = await createClient();
  const { error } = await supabase
  .schema('public')
  .from('Quiz')
  .insert([
    {
    nomQuiz: data.nomQuiz,
    imageURL: data.imageURL,
    categorie: data.categorie,
    questions: data.questions,
    }
  ])
}


export async function lireUnQuiz(data:any) {
  const supabase = await createClient();
  const { error } = await supabase
  .schema('public')
  .from('Quiz')
  .select()
  .match({id:data});
}