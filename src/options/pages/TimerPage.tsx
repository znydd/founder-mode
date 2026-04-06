import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

interface TimerPageProps {
    onComplete: () => void
    onCancel: () => void
}

export default function TimerPage({ onComplete, onCancel }: TimerPageProps) {
    const [seconds, setSeconds] = useState(30)

    useEffect(() => {
        if (seconds <= 0) {
            onComplete()
            return
        }
        const id = setTimeout(() => setSeconds(s => s - 1), 1000)
        return () => clearTimeout(id)
    }, [seconds, onComplete])

    return (
        <div className="min-h-screen flex flex-col font-mono">
            <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center gap-8 w-120">
                    <p className="text-xl text-center">Ok! I will still give you 30 seconds to think.</p>
                    <span className="text-9xl font-bold">{seconds}</span>
                    <Button variant="outline" className="h-10 px-6 text-base" onClick={onCancel}>
                        Alright! I won&apos;t unblock
                    </Button>
                </div>
            </div>
        </div>
    )
}
