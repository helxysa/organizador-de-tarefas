'use client'

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-zinc-900 p-4">
      <input 
        type="text" 
        className="w-full p-2 rounded-md border border-zinc-700 bg-zinc-800 text-white mb-4" 
        placeholder="Search tasks..."
        onChange={(e) => console.log('Searching for:', e.target.value)}
      />
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2 p-2 hover:bg-zinc-800 rounded-md cursor-pointer text-zinc-300">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 3C2 2.44772 2.44772 2 3 2H6.29289L8 3.70711L13 3C13.5523 3 14 3.44772 14 4V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3Z" stroke="currentColor"/>
          </svg>
          <span>Meus Projetos</span>
        </div>

        <div className="flex items-center space-x-2 p-2 hover:bg-zinc-800 rounded-md cursor-pointer text-zinc-300">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 3C2 2.44772 2.44772 2 3 2H6.29289L8 3.70711L13 3C13.5523 3 14 3.44772 14 4V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3Z" stroke="currentColor"/>
          </svg>
          <span>Calendario</span>
        </div>

        <div className="flex items-center space-x-2 p-2 hover:bg-zinc-800 rounded-md cursor-pointer text-zinc-300">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 3C2 2.44772 2.44772 2 3 2H6.29289L8 3.70711L13 3C13.5523 3 14 3.44772 14 4V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3Z" stroke="currentColor"/>
          </svg>
          <span>Ideias</span>
        </div>
      </div>
    </div>
  )
}