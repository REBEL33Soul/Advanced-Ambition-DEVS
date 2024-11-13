import React from 'react'
import { usePreferences } from '../hooks/usePreferences'

export function PreferenceSelector() {
  const { preferences, updatePreferences } = usePreferences()

  return (
    <div className="preference-selector p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Build Preferences</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interaction Mode
          </label>
          <select
            value={preferences.interactionMode}
            onChange={(e) => updatePreferences({ 
              interactionMode: e.target.value as 'autonomous' | 'interactive' 
            })}
            className="w-full p-2 border rounded"
          >
            <option value="autonomous">Complete All Tasks Automatically</option>
            <option value="interactive">Ask at Each Step</option>
          </select>
          
          <p className="mt-1 text-sm text-gray-500">
            {preferences.interactionMode === 'autonomous' 
              ? 'The app will automatically complete all tasks without interruption'
              : 'The app will ask for confirmation at each major step'}
          </p>
        </div>

        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.autoSave}
              onChange={(e) => updatePreferences({ autoSave: e.target.checked })}
              className="mr-2"
            />
            <span>Auto-save progress</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={preferences.autoDeploy}
              onChange={(e) => updatePreferences({ autoDeploy: e.target.checked })}
              className="mr-2"
            />
            <span>Auto-deploy when ready</span>
          </label>
        </div>

        <div>
          <h3 className="font-medium mb-2">Notifications</h3>
          <div className="space-y-2">
            {Object.entries(preferences.notifications).map(([key, value]) => (
              <label key={key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => updatePreferences({
                    notifications: {
                      ...preferences.notifications,
                      [key]: e.target.checked
                    }
                  })}
                  className="mr-2"
                />
                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}