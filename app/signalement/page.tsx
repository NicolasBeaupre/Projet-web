import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { lireSignalement, lireUnQuiz } from "../lib/action"
export default async function SignalementPage() {
    const signalements = await lireSignalement()
    return (
        <div className="flex justify-center">
            <div className="container   flex flex-col gap-10 my-25 justify-center text-center align-middle">

                <Table >
                    <TableCaption>{signalements.length == 0 && "Il n'y a aucun signalement"}</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead >signalement</TableHead>
                            <TableHead>id du quiz</TableHead>
                            <TableHead>id de l'utilisateur (si connecté)</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">date du signalement</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {signalements.map((signalement) => (

                            <TableRow key={signalement.id}>
                                <TableCell className="font-medium">{signalement.id}</TableCell>
                                <TableCell >{signalement.id_quiz}</TableCell>
                                <TableCell >{signalement.user}</TableCell>
                                <TableCell>{signalement.description}</TableCell>
                                <TableCell><time>{new Date(signalement.created_at).toLocaleDateString('fr-FR', {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}</time></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </div>
        </div>
    )

}


async function lireIdQuiz(id:number){
    return await lireUnQuiz(id)
}