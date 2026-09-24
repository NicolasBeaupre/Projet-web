import { QuizField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';

export default function QuestionsForm() {
    return (
        <form>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className="mb-4">
                    <label htmlFor="nom" className="mb-2 block text-sm font-medium text-black">
                        Question
                    </label>
                    <div className="relative">
                        <input
                            id="nom"
                            name="nom"
                            type="text"
                            placeholder="Qu'elle est la couleur du soleil..."
                            className="peer block w-full rounded-md border border-gray-200 py-4 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div className="mb-4 h-50">
                        <label htmlFor="nom" className="mb-2 block text-sm font-medium text-black">
                            Réponse 1
                        </label>
                        <div className="relative">
                            <textarea
                                id="r1"
                                name="r1"
                                rows={8}
                                placeholder="Orange..."
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="mb-4 h-50">
                        <label htmlFor="r2" className="mb-2 block text-sm font-medium text-black">
                            Réponse 2
                        </label>
                        <div className="relative">
                            <textarea
                                id="r2"
                                name="r2"
                                rows={8}
                                placeholder="Jaune..."
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="mb-4 h-50">
                        <label htmlFor="r3" className="mb-2 block text-sm font-medium text-black">
                            Réponse 3
                        </label>
                        <div className="relative">
                            <textarea
                                id="r3"
                                name="r3"
                                rows={8}
                                placeholder="Rouge..."
                                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <CheckIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>
                    <div className="mb-4 h-50">
                        <label htmlFor="r4" className="mb-2 block text-sm font-medium text-black">
                            Réponse 4
                        </label>
                        <div className="relative">
                            <textarea
                                id="r4"
                                name="r4"
                                rows={8}
                                placeholder="Blanc..."
                                className="peer block w-full my-auto rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                            />
                            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
                <Button type="submit">Terminer la création</Button>
            </div>
        </form>
    );
}