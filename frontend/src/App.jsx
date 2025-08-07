import React from 'react';
import './App.css'
import { AuthProvider, useAuth } from './context/AuthContext';
import DotGrid from './Additives/DotGrid/DotGrid';
import SpotlightCard from './Additives/SpotlightCard';

const AppContent = () => {
  const { user, loginWithGoogle, logout, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gray-50">
    <header className="relative py-4 md:py-6 mx-4 md:mx-8 lg:mx-12 border-2 border-gray-900 rounded-xl mt-2">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between">
                <div className="flex-shrink-0">
                    <a href="#" title="" className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                     <p className="text-4xl font-bold text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Brigde2BITS </p>
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
                    <a href="#" title="" className="text-2xl font-semibold text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Experts </a>

                    <a href="#" title="" className="text-2xl font-semibold text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Community Groups </a>

                    <a href="#" title="" className="text-2xl font-semibold text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"> Support </a>
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
                            <span className="text-lg font-semibold text-gray-900">{user?.displayName}</span>
                            <button
                                onClick={logout}
                                className="text-lg font-semibold text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-opacity-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={loginWithGoogle}
                            className="
                                px-6
                                py-3
                                text-lg
                                font-semibold
                                leading-7
                                text-gray-900
                                transition-all
                                duration-200
                                bg-transparent
                                border-2 border-gray-900
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
        <div className="absolute inset-0 z-0">
            <DotGrid
            dotSize={2}
            shockRadius={20}
            gap={10}
            baseColor="#000000"
            activeColor="#000000"
            proximity={150}
            speedTrigger={100}
            />
        </div>
        <div className="relative z-10 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex px-4 py-2 mb-10 text-base font-semibold text-gray-900 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full font-pj shadow-lg">
                    Made by Developers, for Developers
                </div>
                
                <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.4)">
                    <h1 className="text-4xl font-bold leading-tight text-gray-400 mb-5 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj drop-shadow-xl">
                        Quality resources shared by the community
                    </h1>
                </SpotlightCard>
                    

                <p className="max-w-xl mx-auto mt-6 text-lg leading-7 text-gray-700 font-inter bg-white/80 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula massa in enim luctus. Rutrum arcu.
                </p>

            </div>
        </div>
    </section>

    <footer className="bg-gray-700 text-gray-300 py-10 mt-auto">
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