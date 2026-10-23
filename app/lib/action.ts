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

export async function ajouterNote(nomQuiz: any, nouvelleNote: number, utilisateurId: any) {
  const supabase = await createClient();

  const { data: noteQuiz } = await supabase
    .schema('public')
    .from('Quiz')
    .select('notes')
    .eq('nomQuiz', nomQuiz)
    .single();


  let notesExistantes = noteQuiz?.notes || []

  const indexUtilisateur = notesExistantes.findIndex((note: {utilisateur: any; note:number}) => note.utilisateur === utilisateurId)

  let modifierNote = false

  if (indexUtilisateur !== -1) {
    if (nouvelleNote !== notesExistantes[indexUtilisateur].note) {
      notesExistantes[indexUtilisateur].note = nouvelleNote
      modifierNote = true
    }
  }
  else{
    notesExistantes.push({utilisateur: utilisateurId, note: nouvelleNote})

    modifierNote = true
  }

  if (modifierNote) {
    const { error } = await supabase
    .schema('public')
    .from('Quiz')
    .update(
      {
        notes: notesExistantes,
      }
    )
    .eq('nomQuiz', nomQuiz)
  }

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