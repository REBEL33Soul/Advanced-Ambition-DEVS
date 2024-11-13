import React, { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { trpc } from '../../utils/trpc'
import { Document } from '@advanced-ambition/core'

export function DocumentEditor({ document, onSave }: { 
  document?: Document
  onSave: (doc: Partial<Document>) => void 
}) {
  const [content, setContent] = useState(document?.content || '')
  const [title, setTitle] = useState(document?.title || '')
  const [category, setCategory] = useState(document?.category || 'USER_GUIDE')

  const handleSave = () => {
    onSave({
      title,
      content,
      category,
      version: '1.0.0',
      lastUpdated: new Date()
    })
  }

  return (
    <div className="document-editor">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Document Title"
        className="title-input"
      />
      
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
        className="category-select"
      >
        <option value="USER_GUIDE">User Guide</option>
        <option value="API_DOCS">API Documentation</option>
        <option value="LEGAL">Legal Documents</option>
        <option value="CHANGELOG">Changelog</option>
      </select>

      <Editor
        value={content}
        onEditorChange={setContent}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | help'
        }}
      />

      <button onClick={handleSave} className="save-button">
        Save Document
      </button>
    </div>
  )
}