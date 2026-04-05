import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AddURLProps {
    onNavigateToRemove: () => void
}

function isValidPattern(input: string): boolean {
    const domainPattern = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}/
    return domainPattern.test(input)
}

export default function AddURL({ onNavigateToRemove }: AddURLProps) {
    const [url, setUrl] = useState('')
    const [urls, setUrls] = useState<string[]>([])
    const [error, setError] = useState('')

    const handleAdd = () => {
        let trimmed = url.trim().replace(/^https?:\/\//, '').toLowerCase()
        if (!trimmed) return
        if (!isValidPattern(trimmed)) {
            setError('Enter a valid pattern e.g. youtube.com/shorts/*')
            return
        }
        if (!trimmed.includes('/')) trimmed = trimmed + '/*'
        if (urls.includes(trimmed)) {
            setError('This pattern is already in the list')
            return
        }
        setUrls([...urls, trimmed])
        setUrl('')
        setError('')
    }

    return (
        <div className="min-h-screen flex flex-col font-mono">
            <div className="flex-1 flex items-start justify-center pt-24">
                <div className="flex flex-col gap-6 w-120">
                    <div>
                        <label className="text-base font-medium mb-2 block">Block URL</label>
                        <div className="flex gap-2">
                            <Input
                                className="text-base h-11"
                                value={url}
                                onChange={e => { setUrl(e.target.value); setError('') }}
                                onKeyDown={e => e.key === 'Enter' && handleAdd()}
                                placeholder="youtube.com/shorts/*"
                            />
                            <Button variant="outline" size="icon" className="h-11 w-11 text-lg" onClick={handleAdd}>+</Button>
                        </div>
                        {error && <p className="text-destructive text-sm mt-1">{error}</p>}
                    </div>

                    <div className="border rounded-md divide-y min-h-40">
                        {urls.length === 0 ? (
                            <p className="text-muted-foreground text-base p-4">No URLs added yet</p>
                        ) : (
                            urls.map(u => (
                                <div key={u} className="px-4 py-3 text-base">
                                    {u}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end p-6">
                <Button variant="destructive" onClick={onNavigateToRemove}>
                    Remove URL
                </Button>
            </div>
        </div>
    )
}
