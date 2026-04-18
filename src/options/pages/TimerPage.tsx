import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

interface TimerPageProps {
    onComplete: () => void
    onCancel: () => void
}

export default function TimerPage({ onComplete, onCancel }: TimerPageProps) {
    const [seconds, setSeconds] = useState(60)
    const [isVisible, setIsVisible] = useState(document.visibilityState === 'visible')
    const [isFocused, setIsFocused] = useState(document.hasFocus())

    useEffect(() => {
        if (!isVisible || !isFocused) return;
        if (seconds <= 0) {
            onComplete()
            return
        }

        const id = setTimeout(() => setSeconds(s => s - 1), 1000)
        return () => clearTimeout(id)
    }, [seconds, isVisible, isFocused, onComplete])

    useEffect(() => {
        const onVisibility = () => setIsVisible(document.visibilityState === 'visible')
        const onFocus = () => setIsFocused(true)
        const onBlur = () => setIsFocused(false)

        document.addEventListener('visibilitychange', onVisibility)
        window.addEventListener('focus', onFocus)
        window.addEventListener('blur', onBlur)
        return () => {
            document.removeEventListener('visibilitychange', onVisibility)
            window.removeEventListener('focus', onFocus)
            window.removeEventListener('blur', onBlur)
        }
    }, [])

    return (
        <div className="min-h-screen flex flex-col font-mono">
            <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center gap-8 w-120">
                    <p className="text-2xl text-center">Ok! I will still give you 60 seconds to think.</p>
                    <span className="text-9xl font-bold">{seconds}</span>
                    <Button variant="outline" className="h-10 px-6 text-base" onClick={onCancel}>
                        Alright! I won't unblock
                    </Button>
                </div>
            </div>
        </div>
    )
}
