import React from 'react';
import './App.css'
import { AuthProvider, useAuth } from './context/AuthContext';

const AppContent = () => {
  const { user, loginWithGoogle, logout, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gray-50">
    <header className="relative py-4 md:py-6">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between">
                <div className="flex-shrink-0">
                    <a href="#" title="" className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                        <img className="w-auto h-8" src="https://d33wubrfki0l68.cloudfront.net/682a555ec15382f2c6e7457ca1ef48d8dbb179ac/f8cd3/images/logo.svg" alt="Logo" />
                    </a>
                </div>

                <div className="flex lg:hidden">
                    <button type="button" className="text-gray-900">
                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>

                <div className="hidden lg:absolute lg:inset-y-0 lg:flex lg:items-center lg:justify-center lg:space-x-12 lg:-translate-x-1/2 lg:left-1/2">
                    <a href="#" title="" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Experts </a>

                    <a href="#" title="" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Community Groups </a>

                    <a href="#" title="" className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Support </a>
                </div>

                <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
                    {isAuthenticated ? (
                        <div className="flex items-center space-x-4">
                            {user?.profilePicture && (
                                <img 
                                    src={user.profilePicture} 
                                    alt={user.displayName} 
                                    className="w-8 h-8 rounded-full"
                                />
                            )}
                            <span className="text-base font-medium text-gray-900">{user?.displayName}</span>
                            <button
                                onClick={logout}
                                className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={loginWithGoogle}
                            className="
                                px-5
                                py-2
                                text-base
                                font-semibold
                                leading-7
                                text-gray-900
                                transition-all
                                duration-200
                                bg-transparent
                                border border-gray-900
                                rounded-xl
                                font-pj
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                                hover:bg-gray-900 hover:text-white
                                focus:bg-gray-900 focus:text-white
                            "
                        >
                            Login with Google
                        </button>
                    )}
                </div>
            </div>
        </div>
    </header>

    <section className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0 flex-grow">
        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
                <p className="inline-flex px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-full font-pj">Made by Developers, for Developers</p>
                <h1 className="mt-5 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">Quality resources shared by the community</h1>
                <p className="max-w-md mx-auto mt-6 text-base leading-7 text-gray-600 font-inter">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.</p>

                <div className="relative inline-flex mt-10 group">
                    <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

                    <a href="#" title="" className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" role="button">
                        Get access to 4,958 resources
                    </a>
                </div>
            </div>
        </div>
    </section>

    <footer className="bg-gray-800 text-gray-300 py-10 mt-auto">
        <div className="flex justify-center items-center">
            <nav className="flex space-x-8">
                <a className="text-lg font-medium hover:text-white transition-colors duration-200">Branding</a>
                <a className="text-lg font-medium hover:text-white transition-colors duration-200">Design</a>
                <a className="text-lg font-medium hover:text-white transition-colors duration-200">Marketing</a>
                <a className="text-lg font-medium hover:text-white transition-colors duration-200">Advertisement</a>
            </nav>
        </div>
    </footer>
</div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;