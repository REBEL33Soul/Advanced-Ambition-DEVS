import React from 'react'
import { useAuth } from '../../hooks/useAuth'

export function SocialLogin() {
  const { signInWithProvider } = useAuth()

  return (
    <div className="space-y-3">
      <button
        onClick={() => signInWithProvider('github')}
        className="w-full flex items-center justify-center gap-3 p-2 border rounded hover:bg-gray-50"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
        Continue with GitHub
      </button>

      <button
        onClick={() => signInWithProvider('google')}
        className="w-full flex items-center justify-center gap-3 p-2 border rounded hover:bg-gray-50"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path d="M12.545,12.151L12.545,12.151c0,1.054,0.855,1.909,1.909,1.909h3.536c-0.447,1.722-1.502,3.178-2.945,4.182c-1.445,1.004-3.214,1.591-5.045,1.591c-2.46,0-4.75-1.005-6.383-2.638C1.985,15.563,0.98,13.273,0.98,10.813c0-2.46,1.005-4.75,2.638-6.383C5.25,2.798,7.54,1.793,10,1.793c2.46,0,4.75,1.005,6.383,2.638L18.545,2.27C16.523,0.248,13.385-0.55,10.393,0.337C7.4,1.225,4.936,3.338,3.696,6.139C2.455,8.94,2.611,12.062,4.121,14.702c1.51,2.641,4.079,4.467,7.024,4.993c2.945,0.526,5.98-0.275,8.276-2.185c2.297-1.91,3.613-4.745,3.58-7.725v-1.909H14.455C13.401,7.876,12.545,8.732,12.545,9.786V12.151z" />
        </svg>
        Continue with Google
      </button>

      <button
        onClick={() => signInWithProvider('apple')}
        className="w-full flex items-center justify-center gap-3 p-2 border rounded hover:bg-gray-50"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path d="M17.05,11.97 C17.0382,9.71896 18.8131,8.30138 18.8831,8.24738 C17.6231,6.41938 15.6531,6.15038 14.9731,6.12438 C13.2031,5.94038 11.4931,7.16538 10.5931,7.16538 C9.67311,7.16538 8.27311,6.14838 6.77311,6.17938 C4.83311,6.20938 3.02311,7.30138 2.02311,9.01338 C-0.0468902,12.5334 1.52311,17.7634 3.50311,20.5134 C4.47311,21.8534 5.59311,23.3634 7.07311,23.3134 C8.50311,23.2634 9.05311,22.3934 10.7731,22.3934 C12.4731,22.3934 12.9731,23.3134 14.4731,23.2834 C16.0131,23.2634 16.9931,21.9334 17.9331,20.5834 C19.0331,19.0234 19.4831,17.4934 19.5031,17.4234 C19.4631,17.4134 17.0731,16.5334 17.0531,13.9234" />
          <path d="M14.7131,4.24838 C15.5231,3.27738 16.0731,1.93838 15.9331,0.578376 C14.7731,0.628376 13.3531,1.35838 12.5131,2.30838 C11.7531,3.14838 11.1031,4.52838 11.2631,5.85838 C12.5631,5.95838 13.8831,5.21838 14.7131,4.24838" />
        </svg>
        Continue with Apple
      </button>
    </div>
  )
}