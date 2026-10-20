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



// import { createClient } from '@/lib/supabase/server';

// export default async function Notes() {
//   const supabase = await createClient();
//   const { data: notes, error } = await supabase
//   .schema('public')
//   .from('notes')
//   .select();

//   return <pre>{JSON.stringify(notes, null, 2)}</pre>
// }