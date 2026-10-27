"use server"
import { createClient } from '@/lib/supabase/server';
import { Salle } from './definitions';
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation';


export default async function ajouterQuiz(data: any, utilisateurId: any) {
  const supabase = await createClient();
  const nomQuiz = data.nomQuiz.trim()
  const { data: quiz } = await supabase
    .schema('public')
    .from('Quiz')
    .select('nomQuiz')
    .eq('nomQuiz', nomQuiz)
    .single();

  if (quiz) {
    return false
  }
  const { error } = await supabase
    .schema('public')
    .from('Quiz')
    .insert([
      {
        nomQuiz: nomQuiz,
        imageURL: data.imageURL,
        categorie: data.categorie,
        questions: data.questions,
        createur: utilisateurId
      }
    ])


  return true


}

export async function ajouterNote(idQuiz: Number, nouvelleNote: number, utilisateurId: any) {
  const supabase = await createClient();

  const { data: noteQuiz } = await supabase
    .schema('public')
    .from('Quiz')
    .select('notes')
    .eq('id', idQuiz)
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
    .eq('id', idQuiz)
  }

}



export async function lireUnQuiz(data: number) {
  const supabase = await createClient()
  const { data: donneeQuiz, error } = await supabase
    .schema('public')
    .from('Quiz')
    .select()
    .match({ id: data })
    .single()

  if (error) {
    // throw new Error('Quiz inexistant')
    console.log(donneeQuiz)
  }

  return donneeQuiz
}

//Supprime un joueurs d'une salle
export async function supprimerQuiz(id_joueur: string, id_quiz: string) {
  const supabase = await createClient();
  const {data, error:authErreur} = await supabase.auth.getUser()
  if (authErreur || !data.user) throw new Error("Vous devez être connecté afin d'effectuer cette action.")
  if( data.user.id !== id_joueur) throw new Error("Vous devez être connecté au compte ayant créé ce quiz, afin d'effectuer cette action.")
  const { error } = await supabase
    .schema('public')
    .from('Quiz')
    .delete().match({ createur: id_joueur, id: id_quiz })

    if(error) throw new Error(error.message)
    else redirect("/compte")
}




export async function ajouterSalle(data: any) {
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
  revalidatePath('/', 'layout')
}

// Renvoi true si le code de la salle existe déjà
export async function lireCodeExiste(pCode: string) {
  const supabase = await createClient();
  const { data: salle, error } = await supabase
    .schema('public')
    .from('salle')
    .select()
    .match({ code: pCode })

  if (salle && salle.length > 0)
    return true
  else return false
}

export async function lireSalle(code: string) {
  const supabase = await createClient();
  const { data: salle, error } = await supabase
    .schema('public')
    .from('salle')
    .select()
    .match({ code: code })

  return salle

}

export async function lireSalleCodeParIdDuCreater(createur_salle: string) {
  const supabase = await createClient();
  const { data: salle, error } = await supabase
    .schema('public')
    .from('salle')
    .select()
    .match({ createur_salle: createur_salle })

  if (salle !== null && salle.length > 0) return salle[0].code
  return null

}
export async function lireSalleIdParIdDuCreater(createur_salle: string) {
  const supabase = await createClient();
  const { data: salle, error } = await supabase
    .schema('public')
    .from('salle')
    .select()
    .match({ createur_salle: createur_salle })

  if (salle !== null) return salle[0].id
  return null

}


export async function lireSalleCreeUser(createur_salle: string) {
  //Renvoie true si le user a actuellement une salle en cours et que la partie de celle-ci n'est pas en cours
  const supabase = await createClient();
  const { data: salle, error } = await supabase
    .schema('public')
    .from('salle')
    .select()
    .match({ createur_salle: createur_salle })

  if (salle && salle.length > 0)
    return true

  else return false
}



export async function lireSalleJoueur(id_salle: string) {
  const supabase = await createClient();
  const { data: salle, error } = await supabase
    .schema('public')
    .from('salle_joueur')
    .select()
    .match({ id_salle: id_salle })

  return salle

}



export async function ajouterJoueurSalle(data: any) {
  const supabase = await createClient();
  const joueurs = await lireSalleJoueur(data.id_salle)

  let estDejaPresent = false
  if (joueurs !== null) {

    for (let i = 0; i < joueurs.length; i++) {
      if (joueurs[i].id_joueur == data.id_joueur) estDejaPresent = true

    }
  }
  if (!estDejaPresent) {

    const { error } = await supabase
      .schema('public')
      .from('salle_joueur')
      .insert([
        {
          id_salle: data.id_salle,
          id_joueur: data.id_joueur,
          nom_joueur: data.nom_joueur
        }
      ])
  }

}

//Supprime un joueurs d'une salle
export async function supprimerJoueurSalle(id_joueur: string, id_salle: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .schema('public')
    .from('salle_joueur')
    .delete().match({ id_salle: id_salle, id_joueur: id_joueur })

}

//Supprime tout les joueurs d'une salle
export async function supprimerJoueursSalle( id_salle: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .schema('public')
    .from('salle_joueur')
    .delete().match({ id_salle: id_salle})

}


export async function supprimerSalle( id_salle: string) {

  const supabase = await createClient();
  await supprimerJoueursSalle(id_salle)

  const { error } = await supabase
    .schema('public')
    .from('salle')
    .delete().eq('id', id_salle)


  revalidatePath('/', 'layout')
}

export async function ajouterTentativeQuiz(quiz_id:number, score:number, nombre_question:number){
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Vous devez être connecté afin d'effectuer cette action.")

  const quiz = await lireUnQuiz(quiz_id)
  console.log(quiz)
  console.log(quiz_id)
  if (!quiz) throw new Error("Ce quiz n'existe pas.")
  const {error} = await supabase.from('historique_joueurs').insert({
    id_joueur:user.id,
    id_quiz:quiz.id,
    score:score,
    nbr_question:nombre_question,
    nom_quiz:quiz.nomQuiz
  })

  revalidatePath('/compte')
}

export async function lireCategoriesQuiz() {
  const supabase = await createClient();
  const { data:categorie, error } = await supabase
    .schema('public')
    .from('Quiz')
    .select('categorie').order('categorie')

  if (categorie == null)
    return null
  return Array.from(new Set(categorie.map((q) => q.categorie)));

}

export async function lireLesQuizDUneCategorie(categorie:string) {
  const supabase = await createClient();

  const { data:quiz, error } = await supabase
    .schema('public')
    .from('Quiz')
    .select('*').match({categorie:categorie})


  return quiz

}



