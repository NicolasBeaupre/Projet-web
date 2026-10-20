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
    .select('notes')
    .eq('nomQuiz', nomQuiz)
    .single();


  const notesExistantes = noteQuiz?.notes
  const noteActuelle = notesExistantes ? [...notesExistantes, nouvelleNote] : [nouvelleNote]


  const { error } = await supabase
    .schema('public')
    .from('Quiz')
    .update(
      {
        notes: noteActuelle,
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





export async function ajouterSalle(data:any) {
  const supabase = await createClient();
  const { error } = await supabase
  .schema('public')
  .from('salle')
  .insert([
    {
    code: data.code,
    createur_salle: data.createur_salle,
    nbr_joueur_max: data.nbr_joueur_max,
    nom_salle: data.nom_salle,
    }
  ])
}

// Renvoi true si le code de la salle existe déjà
export async function lireCodeExiste(pCode : string){
  const supabase = await createClient();
  const {data:salle, error } = await supabase
  .schema('public')
  .from('salle')
  .select()
  .match({code:pCode})

  if (salle && salle.length > 0)
    return true
  else return false
}

export async function lireSalle(code : string){
  const supabase = await createClient();
  const {data:salle, error } = await supabase
  .schema('public')
  .from('salle')
  .select()
  .match({code: code})

  return salle
  
}

export async function lireSalleCreeUser(createur_salle : string){
  //Renvoie true si le user a actuellement une salle en cours et que la partie de celle-ci n'est pas en cours
  const supabase = await createClient();
  const {data:salle, error } = await supabase
  .schema('public')
  .from('salle')
  .select()
  .match({createur_salle: createur_salle})

  if (salle && salle.length > 0)
    return true

  else return false
}
