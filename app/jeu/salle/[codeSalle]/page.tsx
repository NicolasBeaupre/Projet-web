
import { lireSalle } from "@/app/lib/action";

export default async function Page(props: PageProps<'/jeu/salle/[codeSalle]'>) {
    const { codeSalle } = await props.params

    const salle = await lireSalle(codeSalle)
    let salleExiste = true
    if (salle == null || salle?.length == 0) {
        salleExiste = false
    }
    else {

    }


    return (
        <div className="flex flex-col flex-1 items-center align-middle  justify-center">
            
                {salleExiste &&
                    <div>{salle[0].nom_salle}</div>}
                {!salleExiste &&
                    <div className="flex flex-col h-full justify-center items-center">
                        <div className="flex-col flex">
                            <h1 className="text-2xl font-bold">Oups...</h1>
                            <p>Cette salle n'existe pas ou ou n'existe plus.</p>
                        </div>
                    </div>}

            
        </div >
    )
}

