import { useState } from "react"
import AddURL from "./pages/AddURL"
import RemoveURL from "./pages/RemoveURL"

type Page = 'add' | 'remove'

export default function App() {
    const [page, setPage] = useState<Page>('add')

    return (
        <div className="min-h-screen font-mono">
            {page === 'add' && <AddURL onNavigateToRemove={() => setPage('remove')} />}
            {page === 'remove' && <RemoveURL onNavigateToAdd={() => setPage('add')} />}
        </div>
    )
}
