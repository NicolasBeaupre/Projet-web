import SkeletonCard from '@/app/ui/skeleton-quiz'
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

const PlaceholderContenue = () => {
    return (
        <div className='flex flex-col justify-center gap-20'>
            <div>

                <h1 className='text-2xl font-bold text-center mb-5'>Catégories</h1>
                <div className='flex w-full justify-center gap-5 flex-wrap px-4'>

                    <Button className="w-30 h-15"></Button>
                    <Button className="w-30 h-15"></Button>
                    <Button className="w-30 h-15"></Button>
                    <Button className="w-30 h-15"></Button>
                    <Button className="w-30 h-15"></Button>
                    <Button className="w-30 h-15"></Button>
                    <Button className="w-30 h-15"></Button>
                    <Button className="w-30 h-15"></Button>
                    <Button className="w-30 h-15"></Button>
                    <Button className="w-30 h-15"></Button>
                    <Button className="w-30 h-15"></Button>
                    <Button className="w-30 h-15"></Button>
                    {/* <Skeleton className="h-15 w-30 bg-primary rounded-lg" />
                    <Skeleton className="h-15 w-30 bg-primary rounded-lg" />
                    <Skeleton className="h-15 w-30 bg-primary rounded-lg" />
                    <Skeleton className="h-15 w-30 bg-primary rounded-lg" />
                    <Skeleton className="h-15 w-30 bg-primary rounded-lg" />
                    <Skeleton className="h-15 w-30 bg-primary rounded-lg" />
                    <Skeleton className="h-15 w-30 bg-primary rounded-lg" />
                    <Skeleton className="h-15 w-30 bg-primary rounded-lg" />
                    <Skeleton className="h-15 w-30 bg-primary rounded-lg" />
                    <Skeleton className="h-15 w-30 bg-primary rounded-lg" />
                    <Skeleton className="h-15 w-30 bg-primary rounded-lg" />
                    <Skeleton className="h-15 w-30 bg-primary rounded-lg" /> */}


                </div>
            </div>
            <div>

                <h1 className='text-2xl font-bold text-center mb-5'>Quiz les plus populaire</h1>

                <div className='flex w-full justify-center gap-5 flex-wrap px-4'>

                    <SkeletonCard></SkeletonCard>
                    <SkeletonCard></SkeletonCard>
                    <SkeletonCard></SkeletonCard>
                    <SkeletonCard></SkeletonCard>
                    <SkeletonCard></SkeletonCard>
                    <SkeletonCard></SkeletonCard>
                    <SkeletonCard></SkeletonCard>
                    <SkeletonCard></SkeletonCard>
                    <SkeletonCard></SkeletonCard>

                </div>
            </div>
        </div>



    )
}
export default PlaceholderContenue 
