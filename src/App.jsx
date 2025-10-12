import { useState, useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white">
      {/* Header/Navigation Section */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400">Hacktoberfest Site</h1>
            <div className="space-x-6">
              <a href="#home" className="font-medium hover:text-pink-400 transition-colors">Home</a>
              <a href="#about" className="font-medium hover:text-pink-400 transition-colors">About</a>
              <a href="#features" className="font-medium hover:text-pink-400 transition-colors">Features</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Hacktoberfest 2025</h2>
            <p className="text-2xl text-indigo-200 mb-10 max-w-3xl mx-auto">Join the global celebration of open source. Contribute, learn, and earn digital rewards in this month-long event.</p>
            <div className="flex justify-center space-x-4">
              <a href="https://hacktoberfest.com/participation/" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all transform hover:-translate-y-1">
                Get Started
              </a>
              <a href="#about" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Counter Demo Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-10 max-w-md mx-auto text-center shadow-xl hover:shadow-pink-500/20 transition-all duration-300">
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4 mt-6">Interactive Counter</h3>
          <p className="text-indigo-200 mb-6">Click the button to increment the counter</p>
          <div className="mb-8 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400">{count}</div>
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-pink-500/50 transition-all transform hover:-translate-y-1"
          >
            Increment
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Amazing Features</h2>
        <p className="text-center text-indigo-200 mb-16 max-w-2xl mx-auto">Our platform is built with cutting-edge technologies to provide you with the best experience possible.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:border-pink-500/50 transition-all group hover:transform hover:-translate-y-2 duration-300">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-pink-500/40 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Fast Development</h3>
            <p className="text-indigo-200">Built with Vite for lightning-fast development experience with instant hot module replacement</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:border-purple-500/50 transition-all group hover:transform hover:-translate-y-2 duration-300">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/40 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Modern Styling</h3>
            <p className="text-indigo-200">Styled with Tailwind CSS for beautiful, responsive design that adapts to any device or screen size</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:border-indigo-500/50 transition-all group hover:transform hover:-translate-y-2 duration-300">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-indigo-500/40 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">React Powered</h3>
            <p className="text-indigo-200">Built with React for interactive user interfaces with reusable components and efficient state management</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-6 py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/30 to-pink-800/30 rounded-3xl blur-3xl opacity-30 -z-10"></div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">About Hacktoberfest</h2>
            
            <p className="text-indigo-100 mb-6 text-lg">
              Hacktoberfest is DigitalOcean's annual event that encourages people to contribute to open source throughout October. Much of modern tech infrastructure—including some of DigitalOcean's own products—relies on open-source projects built and maintained by passionate people who often don't have the staff or budgets to do much more than keep the project alive.
            </p>
            
            <p className="text-indigo-100 mb-8 text-lg">
              Hacktoberfest is all about giving back to those projects, sharpening skills, and celebrating all things open source, especially the people who make open source so special.
            </p>
            
            <div className="flex space-x-4">
              <a href="https://hacktoberfest.com" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
                Official Site
              </a>
              <a href="https://github.com/topics/hacktoberfest" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub Topics
              </a>
            </div>
          </div>
          
          <div className="relative order-1 md:order-2">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg blur opacity-75"></div>
            <div className="relative bg-black rounded-lg overflow-hidden border border-white/10">
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-indigo-900 to-purple-900 p-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180" className="mx-auto">
                  <path fill="#FFFFFF" d="M40,120 L20,120 L20,40 L60,40 L60,60 L40,60 L40,120 Z M140,60 L120,60 L120,40 L160,40 L160,120 L140,120 L140,60 Z M60,80 L120,80 L120,100 L60,100 L60,80 Z" />
                  <path fill="#FF73FA" d="M80,140 L60,140 L60,120 L80,120 L80,140 Z M100,140 L120,140 L120,120 L100,120 L100,140 Z M60,60 L80,60 L80,40 L60,40 L60,60 Z M100,60 L120,60 L120,40 L100,40 L100,60 Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Hacktoberfest Impact</h2>
          <p className="text-indigo-200 max-w-2xl mx-auto">The collective achievement of our global community creating meaningful change through open source.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center group hover:border-pink-500/50 hover:transform hover:-translate-y-2 transition-all duration-300">
            <div className="inline-flex mb-4 p-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 group-hover:shadow-lg group-hover:shadow-pink-500/40 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="relative">
              <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">100K+</div>
              <div className="text-white/80 font-medium text-lg">Contributors</div>
              <div className="absolute -bottom-1 left-1/2 w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transform -translate-x-1/2"></div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center group hover:border-purple-500/50 hover:transform hover:-translate-y-2 transition-all duration-300">
            <div className="inline-flex mb-4 p-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 group-hover:shadow-lg group-hover:shadow-purple-500/40 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div className="relative">
              <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">50K+</div>
              <div className="text-white/80 font-medium text-lg">Projects</div>
              <div className="absolute -bottom-1 left-1/2 w-12 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transform -translate-x-1/2"></div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center group hover:border-indigo-500/50 hover:transform hover:-translate-y-2 transition-all duration-300">
            <div className="inline-flex mb-4 p-4 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 group-hover:shadow-lg group-hover:shadow-indigo-500/40 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            <div className="relative">
              <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-500">1M+</div>
              <div className="text-white/80 font-medium text-lg">Commits</div>
              <div className="absolute -bottom-1 left-1/2 w-12 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transform -translate-x-1/2"></div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center group hover:border-blue-500/50 hover:transform hover:-translate-y-2 transition-all duration-300">
            <div className="inline-flex mb-4 p-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 group-hover:shadow-lg group-hover:shadow-blue-500/40 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="relative">
              <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">24/7</div>
              <div className="text-white/80 font-medium text-lg">Global Activity</div>
              <div className="absolute -bottom-1 left-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Developer Stories</h2>
          <p className="text-indigo-200 max-w-2xl mx-auto">Hear from developers who participated in previous Hacktoberfest events.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 relative group hover:border-pink-500/50 transition-all">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-pink-500/40 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div className="text-indigo-200 mb-6 italic">
              "Hacktoberfest was my gateway into open source. I went from being intimidated by GitHub to submitting multiple PRs. The community was incredibly welcoming and helpful!"
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-600 to-purple-700 flex items-center justify-center text-xl font-bold text-white">
                AS
              </div>
              <div className="ml-4">
                <div className="text-white font-medium">Alex Sandoval</div>
                <div className="text-indigo-300 text-sm">Frontend Developer</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 relative group hover:border-purple-500/50 transition-all">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-purple-500/40 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div className="text-indigo-200 mb-6 italic">
              "Participating in Hacktoberfest helped me land my first developer job. The skills I gained by contributing to real projects were exactly what employers were looking for!"
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-xl font-bold text-white">
                MP
              </div>
              <div className="ml-4">
                <div className="text-white font-medium">Maya Patterson</div>
                <div className="text-indigo-300 text-sm">Full Stack Developer</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 relative group hover:border-indigo-500/50 transition-all">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-indigo-500/40 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div className="text-indigo-200 mb-6 italic">
              "As a project maintainer, Hacktoberfest brought in valuable contributions we wouldn't have received otherwise. Some contributors even became regular team members!"
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center text-xl font-bold text-white">
                JL
              </div>
              <div className="ml-4">
                <div className="text-white font-medium">Jamie Liu</div>
                <div className="text-indigo-300 text-sm">Open Source Maintainer</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-10">
          <a href="https://hacktoberfest.com/community/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/40 transition-all">
            Share Your Story
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-md p-12 rounded-3xl border border-white/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4 text-white">Ready to Start Contributing?</h2>
            <p className="text-indigo-200 mb-8 max-w-2xl mx-auto text-lg">
              Join thousands of developers around the world in supporting open source during Hacktoberfest. Your contributions matter!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://github.com/topics/hacktoberfest" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all transform hover:-translate-y-1 flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                Find Projects
              </a>
              <a href="https://hacktoberfest.com/participation/#beginners" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all">
                Learn How to Contribute
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-lg text-white py-16 mt-12 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400">Hacktoberfest</h3>
              <p className="text-indigo-200 mb-4">A month-long celebration of open source software run by DigitalOcean.</p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/hacktoberfest/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://twitter.com/hacktoberfest" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://github.com/topics/hacktoberfest" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
              <ul className="space-y-2 text-indigo-200">
                <li><a href="https://hacktoberfest.com/participation/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">Getting Started</a></li>
                <li><a href="https://hacktoberfest.com/resources/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">Documentation</a></li>
                <li><a href="https://hacktoberfest.com/faq/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">FAQs</a></li>
                <li><a href="https://hacktoberfest.com/community/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Participate</h4>
              <ul className="space-y-2 text-indigo-200">
                <li><a href="https://github.com/topics/hacktoberfest" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">Find Projects</a></li>
                <li><a href="https://hacktoberfest.com/profile/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">Register Event</a></li>
                <li><a href="https://hacktoberfest.com/participation/#rules" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">Event Rules</a></li>
                <li><a href="https://hacktoberfest.com/participation/#pr-mr-details" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">Submit PR</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
              <ul className="space-y-2 text-indigo-200">
                <li><a href="https://hacktoberfest.com/contact/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">Support</a></li>
                <li><a href="https://hacktoberfest.com/about/#sponsors" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">Sponsors</a></li>
                <li><a href="https://hacktoberfest.com/about/#partners" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">Partners</a></li>
                <li><a href="https://hacktoberfest.com/brand-guidelines/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">Press Kit</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-indigo-200 mb-4 md:mb-0">
              <p>© 2025 Hacktoberfest Contribution Site. Built with ❤️ for open source.</p>
            </div>
            <div className="flex space-x-6 text-sm text-indigo-300">
              <a href="https://hacktoberfest.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">Privacy Policy</a>
              <a href="https://hacktoberfest.com/terms-of-service/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">Terms of Service</a>
              <a href="https://hacktoberfest.com/participation/#values" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">Code of Conduct</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
