import React from 'react'
export default function ErrorState({message, onRetry}){
  return (
    <div className="p-4 text-center">
      <p className="text-red-600 mb-3">Error: {message}</p>
      <button className="px-3 py-1 bg-blue-600 text-white rounded" onClick={onRetry}>Retry</button>
    </div>
  )
}
