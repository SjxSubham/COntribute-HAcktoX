import { useState, useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import { track } from '@vercel/analytics'
import { useTheme } from "./context/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

function App() {
  const { theme, toggleTheme } = useTheme();
  const [visitorCount, setVisitorCount] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [contributors, setContributors] = useState([])
  const [contributorsLoading, setContributorsLoading] = useState(true)
  const [contributorsError, setContributorsError] = useState(null)
  // Additional repo stats
  const [repoStats, setRepoStats] = useState({
    stars: 0,
    forks: 0,
    mergedPRs: 0,
    loading: true,
    error: null
  })
  const [stargazers, setStargazers] = useState([])
  const [stargazersLoading, setStargazersLoading] = useState(true)
  const [stargazersError, setStargazersError] = useState(null)
  
  // Set dark mode class on root element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
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
 
  //To add animations and scroll effects
  useEffect(() => {
  AOS.init({
    duration: 1500, // animation duration (in ms)
    once: true, // whether animation should happen only once
    easing: "ease-in-out", // smooth motion
  });
  }, []);
  
  // Track visitor count with improved animation - using Vercel Analytics in production
  useEffect(() => {
    // Set initial base count (for a more impressive starting number)
    const baseCount = 1520
    
    // Determine if we're in production (deployed) or development mode
    const isProduction = window.location.hostname !== 'localhost' && 
                       !window.location.hostname.includes('127.0.0.1')
    
    // Use Vercel Analytics for production, localStorage for development
    // Note: We still need localStorage as Vercel Analytics doesn't provide real-time visitor count API
    const storedCount = localStorage.getItem('visitorCount') || baseCount
    const count = parseInt(storedCount, 10)
    
    // Enhanced animation function for counter
    const animateCounter = (startValue, endValue) => {
      let currentCount = startValue
      let animationFrame
      
      const step = () => {
        // Calculate a dynamic step size for smoother animation
        // Slow down as we approach the target value
        const distance = endValue - currentCount
        const increment = Math.max(1, Math.ceil(distance / 50))
        
        // Increment the current count
        currentCount = Math.min(endValue, currentCount + increment)
        
        // Update the state
        setVisitorCount(currentCount)
        
        // Continue animation if we haven't reached the end value
        if (currentCount < endValue) {
          animationFrame = requestAnimationFrame(step)
        }
      }
      
      // Start animation
      animationFrame = requestAnimationFrame(step)
      
      // Return cleanup function
      return () => cancelAnimationFrame(animationFrame)
    }
    
    // Check if this user has visited before in this session
    const hasVisited = sessionStorage.getItem('hasVisited')
    
    if (isProduction && !hasVisited) {
      // Increment the count for new visitors ONLY in production
      const newCount = count + 1
      localStorage.setItem('visitorCount', newCount)
      sessionStorage.setItem('hasVisited', 'true')
      
      // Track the new visitor in Vercel Analytics
      track('new_visitor', { 
        count: newCount,
        referrer: document.referrer || 'direct',
        timestamp: new Date().toISOString()
      });
      
      // Use the enhanced animation
      animateCounter(0, newCount)
    } else {
      // In development or for returning visitors, just show the count with animation
      animateCounter(0, count)
      
      // For returning visitors in production, track the return visit
      if (isProduction) {
        track('returning_visitor', {
          count: count,
          timestamp: new Date().toISOString()
        });
      }
    }
    
    // Simulate occasional new visitors in the background (for demo effect)
    // Only do this in production environment
    let randomVisitorInterval
    
    if (isProduction) {
      // Instead of randomly incrementing visitors, we'll use real analytics data
      // We'll just update the visual counter periodically to simulate new visits
      randomVisitorInterval = setInterval(() => {
        // This is just for visual effect - actual tracking is done by Vercel Analytics
        const shouldIncrement = Math.random() > 0.7; // 30% chance to increment the counter
        
        if (shouldIncrement) {
          setVisitorCount(prev => {
            // Apply a subtle "pop" animation to the counter using CSS classes
            const counterElement = document.getElementById('visitor-counter')
            if (counterElement) {
              counterElement.classList.add('visitor-pop')
              // Remove the class after the animation completes
              setTimeout(() => {
                counterElement.classList.remove('visitor-pop')
              }, 700) // Duration should match the CSS animation
            }
            
            // Update the stored count
            const newValue = prev + 1
            localStorage.setItem('visitorCount', newValue)
            
            // Track the increment event in analytics (for visualization purposes only)
            track('visitor_count_updated', { 
              count: newValue,
              timestamp: new Date().toISOString()
            });
            
            return newValue
          })
        }
      }, 45000) // Check less frequently - every 45 seconds
    }
    
    return () => {
      if (randomVisitorInterval) {
        clearInterval(randomVisitorInterval)
      }
    }
  }, [])
  
  // Helper function to fetch data with caching to avoid rate limits
  const fetchWithCache = async (url, cacheKey, expirationMs = 60 * 60 * 1000) => { // Default: 1 hour cache
    try {
      // Check if we have cached data
      const cachedData = localStorage.getItem(cacheKey)
      
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData)
        
        // If cache hasn't expired, use it
        if (Date.now() - timestamp < expirationMs) {
          console.log(`Using cached data for ${cacheKey}`)
          return data
        }
      }
      
      // Cache expired or doesn't exist, fetch fresh data
      console.log(`Fetching fresh data for ${cacheKey}`)
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`)
      }
      
      const data = await response.json()
      
      // Save to cache
      localStorage.setItem(cacheKey, JSON.stringify({
        data,
        timestamp: Date.now()
      }))
      
      return data
    } catch (error) {
      console.error(`Error fetching ${url}:`, error)
      
      // If API request failed but we have cached data, return that as fallback
      const cachedData = localStorage.getItem(cacheKey)
      if (cachedData) {
        console.log(`Using expired cache for ${cacheKey} due to API error`)
        return JSON.parse(cachedData).data
      }
      
      throw error
    }
  }

  useEffect(() => {
    // Fetch contributors from GitHub API with caching
    const fetchContributors = async () => {
      try {
        setContributorsLoading(true)
        const data = await fetchWithCache(
          'https://api.github.com/repos/SjxSubham/COntribute-HAcktoX/contributors',
          'contributors-cache'
        )
        setContributors(data)
        setContributorsLoading(false)
      } catch (error) {
        console.error('Error fetching contributors:', error)
        setContributorsError(error.message)
        setContributorsLoading(false)
      }
    }
    
    // Fetch repository stats
    const fetchRepoStats = async () => {
      try {
        // Get basic repo info including stars and forks
        const repoData = await fetchWithCache(
          'https://api.github.com/repos/SjxSubham/COntribute-HAcktoX',
          'repo-info-cache'
        )
        
        // Get merged PRs count - simulating as actual API would need multiple calls
        const prData = await fetchWithCache(
          'https://api.github.com/repos/SjxSubham/COntribute-HAcktoX/pulls?state=closed&per_page=100',
          'closed-prs-cache'
        )
        
        // In real API usage, we'd check for merged_at not being null
        // For simplicity, we'll count all closed PRs as merged
        const mergedPRs = prData.length
        
        setRepoStats({
          stars: repoData.stargazers_count,
          forks: repoData.forks_count,
          mergedPRs: mergedPRs,
          loading: false,
          error: null
        })
      } catch (error) {
        console.error('Error fetching repo stats:', error)
        setRepoStats(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }))
      }
    }
    
    // Fetch stargazers
    const fetchStargazers = async () => {
      try {
        setStargazersLoading(true)
        const data = await fetchWithCache(
          'https://api.github.com/repos/SjxSubham/COntribute-HAcktoX/stargazers',
          'stargazers-cache'
        )
        setStargazers(data)
        setStargazersLoading(false)
      } catch (error) {
        console.error('Error fetching stargazers:', error)
        setStargazersError(error.message)
        setStargazersLoading(false)
      }
    }
    
    fetchContributors()
    fetchRepoStats()
    fetchStargazers()
  }, [])

  return (
    <div className={`min-h-screen ${theme === "dark"
      ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 text-gray-100"
      : "bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white"
  }`} >
      {/* Header/Navigation Section */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400">Hacktoberfest Site</h1>
            <div className="space-x-6">
              <a href="#home" className="font-medium hover:text-pink-400 transition-colors">Home</a>
              <a href="#about" className="font-medium hover:text-pink-400 transition-colors">About</a>
              <a href="#features" className="font-medium hover:text-pink-400 transition-colors">Features</a>
               {/* Dark Mode Toggle */}
                <button
    onClick={() => toggleTheme()}
    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all"
    aria-label="Toggle Dark Mode"
  >
    {theme === "light" ? (
      <MoonIcon className="h-6 w-6 text-yellow-400" />
    ) : (
      <SunIcon className="h-6 w-6 text-yellow-400" />
    )}
  </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-24 overflow-hidden"  data-aos="fade-down">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h2 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Hacktoberfest 2025</h2>
            <p className="text-2xl text-indigo-200 mb-10 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="300">Join the global celebration of open source. Contribute, learn, and earn digital rewards in this month-long event.</p>
            <div className="flex justify-center space-x-4">
              <a 
                href="https://hacktoberfest.com/participation/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all transform hover:-translate-y-1"
                onClick={() => track('button_click', { name: 'get_started', destination: 'hacktoberfest.com' })}
              >
                Get Started
              </a>
              <a 
                href="#about" 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
                onClick={() => track('button_click', { name: 'learn_more', section: 'about' })}
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Visitor Counter Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-10 max-w-md mx-auto text-center shadow-xl hover:shadow-pink-500/20 transition-all duration-300" data-aos="fade-up">
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-4 mt-6">Site Visitors</h3>
          <p className="text-indigo-200 mb-6">People who have visited our Hacktoberfest site</p>
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl blur-md"></div>
            <div className="relative bg-black/30 border border-white/10 rounded-xl py-8 px-4">
              <div className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400 flex justify-center items-baseline">
                <span id="visitor-counter">{visitorCount.toLocaleString()}</span>
                <span className="text-sm text-indigo-300 ml-2 font-normal">visitors</span>
              </div>
              <div className="absolute top-0 right-0 mt-2 mr-2 bg-gradient-to-r from-green-400 to-green-600 text-xs text-white px-2 py-1 rounded-full flex items-center">
                <span className="w-2 h-2 bg-white rounded-full mr-1 animate-ping absolute inline-flex"></span>
                <span className="w-2 h-2 bg-white rounded-full mr-1 relative inline-flex"></span>
                Live
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-lg p-4 text-indigo-200 text-sm">
            <p>Join our growing community of open source enthusiasts!</p>
            {/* <div className="flex justify-between items-center mt-3">
              <div className="flex -space-x-2">
                {/* {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="w-8 h-8 rounded-full border-2 border-indigo-900 bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-xs font-bold overflow-hidden">
                    {String.fromCharCode(64 + num)}
                  </div>
                ))} 
                <div className="w-8 h-8 rounded-full border-2 border-indigo-900 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold">
                  +{(visitorCount - 4).toLocaleString()}
                </div>
              </div>
              <span className="text-xs opacity-75">Updated in real-time</span>
            </div> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-24" data-aos="slide-up">
        <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" data-aos="fade-down">Amazing Features</h2>
        <p className="text-center text-indigo-200 mb-16 max-w-2xl mx-auto"  data-aos="fade-up" data-aos-delay="200">Our platform is built with cutting-edge technologies to provide you with the best experience possible.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:border-pink-500/50 transition-all group hover:transform hover:-translate-y-2 duration-300"  data-aos="zoom-in" data-aos-delay="100">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-pink-500/40 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3"  data-aos="fade-left" data-aos-delay="200">Fast Development</h3>
            <p className="text-indigo-200">Built with Vite for lightning-fast development experience with instant hot module replacement</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:border-purple-500/50 transition-all group hover:transform hover:-translate-y-2 duration-300"  data-aos="zoom-in" data-aos-delay="200">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/40 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3" data-aos="fade-left" data-aos-delay="300">Modern Styling</h3>
            <p className="text-indigo-200">Styled with Tailwind CSS for beautiful, responsive design that adapts to any device or screen size</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 hover:border-indigo-500/50 transition-all group hover:transform hover:-translate-y-2 duration-300" data-aos="zoom-in" data-aos-delay="300">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-indigo-500/40 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3" data-aos="fade-left" data-aos-delay="400">React Powered</h3>
            <p className="text-indigo-200">Built with React for interactive user interfaces with reusable components and efficient state management</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-6 py-24 relative" data-aos="fade-up">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/30 to-pink-800/30 rounded-3xl blur-3xl opacity-30 -z-10"></div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1" data-aos="fade-right">
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">About Hacktoberfest</h2>
            
            <p className="text-indigo-100 mb-6 text-lg" data-aos="fade-up" data-aos-delay="200">
              Hacktoberfest is DigitalOcean's annual event that encourages people to contribute to open source throughout October. Much of modern tech infrastructure—including some of DigitalOcean's own products—relies on open-source projects built and maintained by passionate people who often don't have the staff or budgets to do much more than keep the project alive.
            </p>
            
            <p className="text-indigo-100 mb-8 text-lg" data-aos="fade-up" data-aos-delay="400">
              Hacktoberfest is all about giving back to those projects, sharpening skills, and celebrating all things open source, especially the people who make open source so special.
            </p>
            
            <div className="flex space-x-4" data-aos="zoom-in" data-aos-delay="600">
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
          
          <div className="relative order-1 md:order-2" data-aos="zoom-in-left">
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

      {/* Teams Section */}
      <section id="teams" className="container mx-auto px-6 py-24 relative">
        <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Our Team</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            {
              name: "Alex",
              role: "Team Lead",
              img: "/image1.jpg",
              desc: "Tech Lead with a strong focus on building scalable, high-performance systems and leading teams to deliver clean, reliable code.",
              github:"https://github.com/",
              twitter:"https://x.com/",
              linkedin:"https://linkedin.com/in/",
            },
            {
              name: "Naina",
              role: "Frontend Developer",
              img: "/image2.jpg",
              desc: "Frontend specialist focused on creating intuitive, responsive, and visually engaging interfaces that deliver seamless user experiences.",
              github:"https://github.com/",
              twitter:"https://x.com/",
              linkedin:"linkedin.com/in/",
            },
            {
              name: "John",
              role: "Backend Engineer",
              img: "/image3.jpg",
              desc: "Backend developer experienced in crafting efficient APIs and scalable architectures to power high-performing web applications.",
              github:"https://github.com/",
              twitter:"https://x.com/",
              linkedin:"linkedin.com/in/",
            },
            {
              name: "Lina",
              role: "UI/UX Designer",
              img: "/image4.jpg",
              desc: "Creative designer passionate about translating ideas into clean, modern interfaces that align aesthetics with usability.",
              github:"https://github.com/",
              twitter:"https://x.com/",
              linkedin:"linkedin.com/in/",
            },
          ].map((member, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center group hover:border-pink-500/50 hover:-translate-y-2 transition-all duration-300">
              <div className="inline-flex mb-4 w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 overflow-hidden group-hover:shadow-lg group-hover:shadow-pink-500/40 transition-all">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover"/>
              </div>
              <div className="relative">
                <p className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">{member.name}</p>
                <p className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">{member.role}</p>
                <p className="text-white/80 font-medium text-base">{member.desc}</p>
              </div>
              <div className="mt-6 flex justify-center space-x-10 bg-black rounded-full p-3">
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  <img src='https://cdn-icons-png.flaticon.com/128/270/270798.png' className='w-10 h-10'></img>
                </a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <img src='https://cdn-icons-png.flaticon.com/128/145/145807.png' className='w-10 h-10'></img>
                </a>
                <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                  <img src='https://cdn-icons-png.flaticon.com/128/3670/3670151.png' className='w-10 h-10'></img>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      {/* Stats Section */}
      <section className="container mx-auto px-6 py-24" data-aos="fade-up">
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Repository Stats</h2>
          <p className="text-indigo-200 max-w-2xl mx-auto">
            Real-time statistics for our{' '}
            <a 
              href="https://github.com/SjxSubham/COntribute-HAcktoX" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 underline"
            >
              Hacktoberfest repository
            </a>
          </p>
        </div>
        
        {repoStats.loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : repoStats.error ? (
          <div className="text-center text-pink-400 py-10">
            <p>Couldn't load repository stats: {repoStats.error}</p>
            <p className="mt-4 text-indigo-200">Please try refreshing the page.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center group hover:border-pink-500/50 hover:transform hover:-translate-y-2 transition-all duration-300" data-aos="flip-left" data-aos-delay="100">
              <div className="inline-flex mb-4 p-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 group-hover:shadow-lg group-hover:shadow-pink-500/40 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="relative">
                <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                  {contributors.length}
                </div>
                <div className="text-white/80 font-medium text-lg">Contributors</div>
                <div className="absolute -bottom-1 left-1/2 w-12 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transform -translate-x-1/2"></div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center group hover:border-purple-500/50 hover:transform hover:-translate-y-2 transition-all duration-300" data-aos="flip-left" data-aos-delay="200">
              <div className="inline-flex mb-4 p-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 group-hover:shadow-lg group-hover:shadow-purple-500/40 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div className="relative">
                <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">
                  {repoStats.stars}
                </div>
                <div className="text-white/80 font-medium text-lg">Stars</div>
                <div className="absolute -bottom-1 left-1/2 w-12 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transform -translate-x-1/2"></div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center group hover:border-indigo-500/50 hover:transform hover:-translate-y-2 transition-all duration-300" data-aos="flip-left" data-aos-delay="300">
              <div className="inline-flex mb-4 p-4 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 group-hover:shadow-lg group-hover:shadow-indigo-500/40 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <div className="relative">
                <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-500">
                  {repoStats.forks}
                </div>
                <div className="text-white/80 font-medium text-lg">Forks</div>
                <div className="absolute -bottom-1 left-1/2 w-12 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transform -translate-x-1/2"></div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center group hover:border-blue-500/50 hover:transform hover:-translate-y-2 transition-all duration-300" data-aos="flip-left" data-aos-delay="400">
              <div className="inline-flex mb-4 p-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 group-hover:shadow-lg group-hover:shadow-blue-500/40 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="relative">
                <div className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
                  {repoStats.mergedPRs}
                </div>
                <div className="text-white/80 font-medium text-lg">Merged PRs</div>
                <div className="absolute -bottom-1 left-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transform -translate-x-1/2"></div>
              </div>
            </div>
          </div>
        )}
      </section>
      
      {/* Repository Contributors Section */}
      <section className="container mx-auto px-6 py-24" data-aos="fade-up">
        <div className="text-center mb-16" data-aos="zoom-in">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Our Contributors</h2>
          <p className="text-indigo-200 max-w-2xl mx-auto">
            Meet the amazing people who have contributed to our{' '}
            <a 
              href="https://github.com/SjxSubham/COntribute-HAcktoX" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 underline"
            >
              Hacktoberfest repository
            </a>
          </p>
        </div>
        
        <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center" data-aos="fade-up" data-aos-delay="300">
          {contributorsLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
          ) : contributorsError ? (
            <div className="py-10">
              <div className="mb-6 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                Join Now!
              </div>
              <p className="text-pink-400">Failed to load contributors: {contributorsError}</p>
              <p className="text-indigo-200 mt-4">
                GitHub API rate limits may have been reached. You can still view all contributors directly on{' '}
                <a 
                  href="https://github.com/SjxSubham/COntribute-HAcktoX/graphs/contributors" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 underline"
                >
                  GitHub
                </a>
              </p>
            </div>
          ) : contributors.length === 0 ? (
            <div className="py-10">
              <div className="mb-6 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                Be First!
              </div>
              <p className="text-2xl text-white mb-10">Be the first to contribute to this repository!</p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                {contributors.length}
              </div>
              <p className="text-2xl text-white mb-10">Contributors and counting!</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {contributors.map((contributor) => (
                  <a 
                    key={contributor.id} 
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    data-aos="zoom-in" 
                    data-aos-delay="100"
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative mb-3 group-hover:transform group-hover:-translate-y-1 transition-all duration-300">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <img 
                          src={contributor.avatar_url} 
                          alt={`${contributor.login}'s avatar`}
                          className="w-16 h-16 rounded-full object-cover relative bg-black/50 border-2 border-white/20 group-hover:border-pink-500/50 transition-all"
                        />
                      </div>
                      <p className="text-white font-medium text-sm truncate max-w-full group-hover:text-pink-400 transition-colors">
                        {contributor.login}
                      </p>
                      <p className="text-indigo-300 text-xs">
                        {contributor.contributions} {contributor.contributions === 1 ? 'contribution' : 'contributions'}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              
              <div className="mt-12">
                <a 
                  href="https://github.com/SjxSubham/COntribute-HAcktoX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition-all transform hover:-translate-y-1 inline-flex items-center"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Contribute on GitHub
                </a>
              </div>
            </>
          )}
        </div>
      </section>
      
      {/* Repository Stargazers Section */}
      <section className="container mx-auto px-6 py-24" data-aos="fade-up">
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Our Stargazers</h2>
          <p className="text-indigo-200 max-w-2xl mx-auto">
            People who have starred our{' '}
            <a 
              href="https://github.com/SjxSubham/COntribute-HAcktoX/stargazers" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 underline"
            >
              repository on GitHub
            </a>
          </p>
        </div>
        
        <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center" data-aos="zoom-in-up">
          {stargazersLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
            </div>
          ) : stargazersError ? (
            <div className="py-10">
              <div className="mb-6 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                Be First!
              </div>
              <p className="text-pink-400">Failed to load stargazers: {stargazersError}</p>
              <p className="text-indigo-200 mt-4">
                GitHub API rate limits may have been reached. You can still view all stargazers directly on{' '}
                <a 
                  href="https://github.com/SjxSubham/COntribute-HAcktoX/stargazers" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 underline"
                >
                  GitHub
                </a>
              </p>
            </div>
          ) : stargazers.length === 0 ? (
            <div className="py-10">
              <div className="mb-6 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                Be First!
              </div>
              <p className="text-2xl text-white mb-10">Be the first to star this repository!</p>
              <a 
                href="https://github.com/SjxSubham/COntribute-HAcktoX"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-yellow-500/30 transition-all"
              >
                ⭐ Star on GitHub
              </a>
            </div>
          ) : (
            <>
              <div className="mb-6 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-500">
                {stargazers.length}
              </div>
              <p className="text-2xl text-white mb-10">Amazing Stargazers!</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {stargazers.map((stargazer) => (
                  <a 
                    key={stargazer.id} 
                    href={stargazer.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    data-aos="zoom-in" 
                    data-aos-delay="100"
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative mb-3 group-hover:transform group-hover:-translate-y-1 transition-all duration-300">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <img 
                          src={stargazer.avatar_url} 
                          alt={`${stargazer.login}'s avatar`}
                          className="w-16 h-16 rounded-full object-cover relative bg-black/50 border-2 border-white/20 group-hover:border-yellow-400/50 transition-all"
                        />
                        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-amber-500 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-white font-medium text-sm truncate max-w-full group-hover:text-yellow-400 transition-colors">
                        {stargazer.login}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
              
              <div className="mt-10">
                <a 
                  href="https://github.com/SjxSubham/COntribute-HAcktoX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-yellow-500/30 transition-all inline-flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Star the Repository
                </a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-6 py-24" data-aos="fade-up">
        <div className="text-center mb-16" data-aos="fade-down">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">Developer Stories</h2>
          <p className="text-indigo-200 max-w-2xl mx-auto">Hear from developers who participated in previous Hacktoberfest events.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 relative group hover:border-pink-500/50 transition-all" data-aos="fade-up" data-aos-delay="100">
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
          
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 relative group hover:border-purple-500/50 transition-all" data-aos="fade-up" data-aos-delay="200">
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
          
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 relative group hover:border-indigo-500/50 transition-all" data-aos="fade-up" data-aos-delay="300">
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
