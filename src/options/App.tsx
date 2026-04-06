import { useState } from "react"
import AddURL from "./pages/AddURL"
import RemoveURL from "./pages/RemoveURL"
import SurePage from "./pages/SurePage"
import TimerPage from "./pages/TimerPage"

type Page = 'add' | 'sure' | 'timer' | 'remove'

export default function App() {
    const [page, setPage] = useState<Page>('add')

    const closeTab = () => window.close()

    return (
        <div className="min-h-screen font-mono">
            {page === 'add' && <AddURL onNavigateToRemove={() => setPage('sure')} />}
            {page === 'sure' && <SurePage onConfirm={() => setPage('timer')} onCancel={closeTab} />}
            {page === 'timer' && <TimerPage onComplete={() => setPage('remove')} onCancel={closeTab} />}
            {page === 'remove' && <RemoveURL onNavigateToAdd={() => setPage('add')} />}
        </div>
    )
}
