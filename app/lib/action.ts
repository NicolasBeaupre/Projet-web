"use server"
import { createClient } from '@/lib/supabase/server';

export default async function ajouterQuiz(data: any) {
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

export async function ajouterNote(nomQuiz: any, nouvelleNote: number) {
  const supabase = await createClient();

  const { data: noteQuiz } = await supabase
    .schema('public')
    .from('Quiz')
    .select('note')
    .eq('nomQuiz', nomQuiz)
    .single();


  const notesExistantes = noteQuiz?.note
  const noteActuelle = notesExistantes ? [...notesExistantes, nouvelleNote] : [nouvelleNote]


  const { error } = await supabase
    .schema('public')
    .from('Quiz')
    .update(
      {
        note: noteActuelle,
      }
    )
    .eq('nomQuiz', nomQuiz)
    .single()
}



export async function lireUnQuiz(data: any) {
  const supabase = await createClient()
  console.log(data)
  const { data: donneeQuiz, error } = await supabase
    .schema('public')
    .from('Quiz')
    .select()
    .match({ nomQuiz: data })
    .single()

  if (error) {
    // throw new Error('Quiz inexistant')
    console.log(donneeQuiz)
  }

  return donneeQuiz
}