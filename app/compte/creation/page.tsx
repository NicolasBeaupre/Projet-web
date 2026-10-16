import { Metadata } from 'next';
import CreationCompte from '@/app/ui/compte/creation';
export const metadata: Metadata = {
  title: "Création d'un compte",
};
export default function PageCreationCompte() {
    
    return (
        
        <CreationCompte></CreationCompte>


    )
}