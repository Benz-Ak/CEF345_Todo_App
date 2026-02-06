import React from 'react'

export default function TaskList() {
  return (
      <ul className="space-y-3 mb-6">
          {/* Exemple d'item dynamique */}
          <li className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-3">
                  <i className="far fa-check-circle text-gray-300 cursor-pointer hover:text-green-500 transition-colors"></i>
                  <span className="text-gray-700 font-medium">Apprendre React + Tailwind</span>
              </div>
              <button className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="fas fa-trash"></i>
              </button>
          </li>
      </ul>
  )
}
