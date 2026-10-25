"use server"
import { createClient } from '@/lib/supabase/server';
import { Salle } from './definitions';
import { revalidatePath } from 'next/cache'
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

export async function modifierPointage(nouveauPointage: number, utilisateurId: any, code_salle: any) {
  const supabase = await createClient();

  const { error } = await supabase
    .schema('public')
    .from('salle_joueur')
    .update(
      {
        points: nouveauPointage,
      }
    )
    .match({ id_salle: code_salle, id_joueur:utilisateurId })


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
    .single()

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

