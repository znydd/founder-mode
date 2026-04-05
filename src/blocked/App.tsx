export default function App() {
    const params = new URLSearchParams(window.location.search)
    const blockedUrl = params.get('url')

    return (
        <div className="min-h-screen flex items-center justify-center font-mono">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Blocked</h1>
                {blockedUrl && (
                    <p className="text-muted-foreground text-lg">
                        <span className="font-medium text-foreground">{blockedUrl}</span> is blocked
                    </p>
                )}
            </div>
        </div>
    )
}
