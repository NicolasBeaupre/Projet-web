import SkeletonCard from '@/app/ui/skeleton-quiz'
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

const PlaceholderContenue = () => {
    return (
        <div className='flex flex-col justify-center gap-20'>
            <div>

                <h1 className='text-2xl font-bold text-center mb-5'>Catégories</h1>
                <div className='flex w-full justify-center gap-5 flex-wrap px-4'>

                    <Button className="w-30 h-15">Science</Button>
                    <Button className="w-30 h-15">Culture</Button>
                    <Button className="w-30 h-15">Jeux vidéo</Button>
                    <Button className="w-30 h-15">Histoire</Button>
                    <Button className="w-30 h-15">Mathématiques</Button>
                    <Button className="w-30 h-15">Musique</Button>
                    <Button className="w-30 h-15">Sport</Button>
                    <Button className="w-30 h-15">Littérature</Button>
                    <Button className="w-30 h-15">Animaux</Button>
                    <Button className="w-30 h-15 ">Autre...</Button>
                   
                    


                </div>
            </div>
            <div>

                <h1 className='text-2xl font-bold text-center mb-5'>Quiz les plus populaire</h1>

                <div className='flex w-full justify-center gap-5 flex-wrap px-4'>

                    {/* <SkeletonCard></SkeletonCard>
                    <SkeletonCard></SkeletonCard>
                    <SkeletonCard></SkeletonCard>
                    <SkeletonCard></SkeletonCard>
                    <SkeletonCard></SkeletonCard>
                    <SkeletonCard></SkeletonCard>
                    <SkeletonCard></SkeletonCard>
                    <SkeletonCard></SkeletonCard>
                    <SkeletonCard></SkeletonCard> */}
                    <div>Aucun quiz pour le moment.</div>

                </div>
            </div>
        </div>



    )
}
export default PlaceholderContenue 
