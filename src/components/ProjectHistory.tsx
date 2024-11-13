import React from 'react'
import { useProjects } from '../hooks/useProjects'
import { formatDistanceToNow } from 'date-fns'

export function ProjectHistory() {
  const { projects, loadProject } = useProjects()

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
      
      <div className="space-y-4">
        {projects.map(project => (
          <div 
            key={project.id}
            className="flex items-center justify-between p-4 border rounded hover:bg-gray-50 cursor-pointer"
            onClick={() => loadProject(project.id)}
          >
            <div>
              <h3 className="font-medium">{project.name}</h3>
              <p className="text-sm text-gray-500">
                Last modified {formatDistanceToNow(new Date(project.updatedAt))} ago
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-sm ${
                project.status === 'deployed' ? 'bg-green-100 text-green-800' :
                project.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {project.status}
              </span>
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}