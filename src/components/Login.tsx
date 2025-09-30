import React from 'react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">DevBlog</h1>
        <button 
          className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
          onClick={onLogin}
        >
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-3" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l8.35 6.48C12.73 13.72 17.89 9.5 24 9.5z"></path>
              <path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.42-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6.02c4.51-4.18 7.09-10.36 7.09-17.67z"></path>
              <path fill="#FBBC05" d="M10.91 28.7A14.88 14.88 0 0 1 9.5 24c0-1.45.22-2.85.61-4.18l-8.35-6.48A24.007 24.007 0 0 0 0 24c0 4.42 1.25 8.44 3.37 11.94l7.54-5.24z"></path>
              <path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.82l-7.73-6.02c-2.15 1.45-4.92 2.3-8.16 2.3-6.11 0-11.27-4.22-13.19-9.92L2.56 34.78C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
            Login with Google
          </div>
        </button>
      </div>
    </div>
  );
};

export default Login;
