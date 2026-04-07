export default function App() {
  const openOptions = () => chrome.runtime.openOptionsPage()

  return (
    <div className="p-4 w-48 font-mono flex flex-col gap-3">
      <h1 className="text-base font-bold text-center">*Founder Mode</h1>
      <button
        onClick={openOptions}
        className="w-full border border-border rounded px-3 py-2 text-sm hover:bg-muted transition-colors"
      >
        Manage URLs
      </button>
    </div>
  )
}
