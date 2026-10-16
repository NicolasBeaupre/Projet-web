import { Separator } from '@/components/ui/separator'
import Link from "next/link"
import { Button } from "@/components/ui/button"


const Footer = () => {
    return (
        <footer className='flex justify-center'>
            <div className='container'>

                <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-8'>
                    <Button variant="link" className="text-2xl font-bold" render={<Link href="/" />} nativeButton={false}  >Quiztro</Button>

                    <div className='flex items-center gap-5 whitespace-nowrap'>
                        <a href='#' className='opacity-80 transition-opacity duration-300 hover:opacity-100'>
                            À propos
                        </a>

                    </div>


                </div>

                <Separator />

                <div className='mx-auto flex max-w-7xl justify-center px-4 py-8 sm:px-6'>
                    <p className='text-center font-medium text-balance'>
                        {`©${new Date().getFullYear()}`}{' '}
                        <Button variant="link" className="text-lg pl-0"  render={<Link href="/" />} nativeButton={false}  >Quiztro</Button>
                    
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
