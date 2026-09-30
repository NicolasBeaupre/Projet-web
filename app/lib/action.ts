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

// import { createClient } from '@/lib/supabase/server';

// export default async function Notes() {
//   const supabase = await createClient();
//   const { data: notes, error } = await supabase
//   .schema('public')
//   .from('notes')
//   .select();

//   return <pre>{JSON.stringify(notes, null, 2)}</pre>
// }