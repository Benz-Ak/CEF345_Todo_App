import React from 'react'

export default function Header() {
  return (
    <div>
          <header className="bg-indigo-600 p-6 flex justify-between items-center text-white">
              <h1 className="text-2xl font-bold italic">My ToDo List</h1>
              <button className="bg-indigo-500 hover:bg-red-500 px-4 py-1 rounded-lg transition-colors text-sm font-medium">
                  Logout
              </button>
          </header>
    </div>
  )
}
