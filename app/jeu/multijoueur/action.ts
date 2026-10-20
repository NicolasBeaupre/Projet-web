const CaractereCode = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
type Salle = {
    idCreateur?: string,
    nomLobby: string,
    nbrJoueurMax: string
}
export async function CreerSalle(salle: Salle ) {
    let code = ''
    
    const CaractereCodeLength = CaractereCode.length
    for (let i = 0; i < 6; i++) {
        code +=  CaractereCode[ Math.floor(CaractereCodeLength * Math.random())]
    }

    return code

}