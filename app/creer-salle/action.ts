'use server'
import { lireCodeExiste, lireSalle } from "@/app/lib/action"
import { ajouterSalle, lireSalleCreeUser } from "@/app/lib/action"
import { createClient } from '@/lib/supabase/server'
import { Salle } from "@/app/lib/definitions"
import { supprimerSalle, lireSalleIdParIdDuCreater } from "@/app/lib/action"
const CaractereCode = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
type SalleTemp = {
    id: string,
    idCreateur?: string,
    nomLobby: string,
    nbrJoueurMax: string,
    code?: string
}
export default async function CreerSalle(pSalle: SalleTemp) {
    try {

        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user == null) {
            return 'Vous devez être connecter avant de créer une salle'
        }
        if (user.id !== pSalle.idCreateur) {
            return 'Vous ne pouvez pas créer une salle pour un autre utilisateur.'
        }
        if (user.is_anonymous == true) {
            return 'Vous devez être connecter avant de créer une salle'
        }
        let code = ''
        let codeExiste = true
        while (codeExiste) {
            code = ''
            const CaractereCodeLength = CaractereCode.length
            for (let i = 0; i < 6; i++) {
                code += CaractereCode[Math.floor(CaractereCodeLength * Math.random())]
            }
            codeExiste = await lireCodeExiste(code)
        }


        const possedeDejaUneSalle = await lireSalleCreeUser(user.id)
        // if (possedeDejaUneSalle) return "Vous Possédez déjà une salle en cours de jeu. Veuillez la fermer avant d'en créer une nouvelle."
        if (possedeDejaUneSalle) {
            const salle = await lireSalleIdParIdDuCreater(user.id)
            if (salle !== null) {
                await supprimerSalle(salle)

            }

        }

        const nbrJoueurMax = Number(pSalle.nbrJoueurMax)

        const salle: Salle = { code: code, createur_salle: pSalle.idCreateur, nbr_joueur_max: nbrJoueurMax, nom_salle: pSalle.nomLobby }

        await ajouterSalle(salle)
        const salleExiste = await lireCodeExiste(code)
        if (salleExiste) return ({ resultat: "Creer", code: code })


        return "Veuillez nous excuser. Une erreur imprévue est survenue. Veillez réessayer plus tard"

    }
    catch {
        return ("Une erreur imprévue est survenue. Veillez réessayer plus tard")
    }
}

