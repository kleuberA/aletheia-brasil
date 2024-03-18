import { Button } from '@/components/ui/button'
import { ResetIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='w-full min-h-screen justify-center items-center flex flex-col gap-5'>
            <div className='absolute blur-md flex flex-row gap-2'>
                <h1 className='text-[20rem] -z-10 font-bold font-mono rotate-45'>4</h1>
                <h1 className='text-[20rem] -z-10 font-bold font-mono'>0</h1>
                <h1 className='text-[20rem] -z-10 font-bold font-mono rotate-45'>4</h1>
            </div>
            <div className='relative z-20 flex items-center flex-col gap-3'>
                <h2 className='text-6xl font-bold font-mono'>Not Found 😢</h2>
                <p className='text-xl font-bol font-mono'>Could not find requested resource.</p>
                <Link href="/">
                    <Button variant="outline" className='flex flex-row gap-2 items-center'> <ResetIcon /> Return Home</Button>
                </Link>
            </div>
        </div>
    )
}