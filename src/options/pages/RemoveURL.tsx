import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getBlockedUrls, removeBlockedUrl } from '@/lib/storage'

interface RemoveURLProps {
    onNavigateToAdd: () => void
}

export default function RemoveURL({ onNavigateToAdd }: RemoveURLProps) {
    const [search, setSearch] = useState('')
    const [urls, setUrls] = useState<string[]>([])

    const loadUrls = async () => {
        const data = await getBlockedUrls()
        setUrls(data.blockedUrls)
    }

    useEffect(() => { loadUrls() }, [])

    const handleRemove = async (url: string) => {
        const success = await removeBlockedUrl(url)
        if (success) await loadUrls()
    }

    const filtered = urls.filter(u => u.includes(search.toLowerCase()))

    return (
        <div className="min-h-screen flex flex-col font-mono">
            <div className="flex-1 flex items-start justify-center pt-24">
                <div className="flex flex-col gap-6 w-120">
                    <Button variant="success" className="w-full h-11 text-base" onClick={onNavigateToAdd}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                        Go Back to Add URL
                    </Button>
                    <div>
                        <label className="text-base font-medium mb-2 block">Remove URL</label>
                        <div className="flex gap-2">
                            <Input
                                className="text-base h-11"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search URLs..."
                            />
                            <Button variant="outline" size="icon" className="h-11 w-11 text-lg" disabled>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </Button>
                        </div>
                    </div>

                    <div className="border rounded-md divide-y min-h-40">
                        {filtered.length === 0 ? (
                            <p className="text-muted-foreground text-base p-4">
                                {urls.length === 0 ? 'No URLs added yet' : 'No matching URLs'}
                            </p>
                        ) : (
                            filtered.map(u => (
                                <div key={u} className="group flex items-center justify-between px-4 py-3 text-base hover:bg-muted transition-colors">
                                    <span>{u}</span>
                                    <button
                                        onClick={() => handleRemove(u)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive/80"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}
