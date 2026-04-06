import { Button } from '@/components/ui/button'

interface SurePageProps {
    onConfirm: () => void
    onCancel: () => void
}

export default function SurePage({ onConfirm, onCancel }: SurePageProps) {
    return (
        <div className="min-h-screen flex flex-col font-mono">
            <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center gap-8 w-120">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">Are You Sure?</h1>
                        <p className="text-2xl font-bold">You can use your phone.</p>
                    </div>
                    <Button variant="outline" className="h-10 px-6 text-base" onClick={onCancel}>
                        Ok, I will use my phone
                    </Button>
                </div>
            </div>

            <div className="flex justify-end p-6">
                <Button variant="destructive" onClick={onConfirm}>
                    Yes! Sure →
                </Button>
            </div>
        </div>
    )
}
