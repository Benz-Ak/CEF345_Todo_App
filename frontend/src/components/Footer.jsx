import React from 'react'

export default function Footer(props) {
    const {tasks} = props;
  return (
      <div className="flex justify-between items-center pt-6 border-t border-gray-100">
          <span className="text-sm text-gray-500 font-semibold">
              {tasks.length} tasks left
          </span>
          <button className="text-sm text-red-400 hover:text-red-600 font-medium transition-colors">
              Clear Completed
          </button>
      </div>
  )
}
