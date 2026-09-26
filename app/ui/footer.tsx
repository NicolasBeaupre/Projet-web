import { Separator } from '@/components/ui/separator'


const Footer = () => {
    return (
        <footer className='flex justify-center'>
            <div className='container'>

                <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 max-md:flex-col sm:px-6 sm:py-6 md:gap-6 md:py-8'>
                    <a href="#" className="text-xl font-bold">
                        Logo
                    </a>

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
                        <a href='#' className='hover:underline'>
                            QUIZTRO
                        </a>

                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
