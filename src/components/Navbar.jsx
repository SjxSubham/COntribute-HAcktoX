import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ThemeBtn from "../Context/ThemeBtn";
import { CircleX, Menu, PanelRightOpen } from "lucide-react";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false)


    const navs = [
        {
            name: "Home",
            link: "#home"
        },
        {
            name: "About",
            link: "#about"
        },
        {
            name: "Features",
            link: "#features"
        },
        {
            name: "Contact",
            link: "#contact"
        }
    ];

    const handleNavClick = () => {
        setIsOpen((prev) => !prev)
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div>
            <header
                className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
                    ? "bg-violet-700 dark:bg-black/80 backdrop-blur-md shadow-lg"
                    : "bg-transparent"
                    }`}
            >
                <nav className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">

                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400">
                            Hacktoberfest Site
                        </h1>

                        <div className="hidden md:flex space-x-8">
                            {
                                navs.length > 0 && (
                                    <>
                                        {
                                            navs.map((nav) => (
                                                <a
                                                    href={nav.link}
                                                    key={nav.link}
                                                    className="font-medium hover:text-pink-400 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-violet-700 dark:focus:ring-offset-black rounded px-2 py-1"
                                                >{nav.name}</a>
                                            ))
                                        }
                                    </>
                                )
                            }
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="md:block hidden">
                                <ThemeBtn />
                            </div>
                            {!isOpen &&
                                <button
                                    className="md:hidden focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-violet-700 dark:focus:ring-offset-black rounded p-1"
                                    onClick={handleNavClick}
                                    aria-label="Open navigation menu"
                                    aria-expanded={isOpen}
                                    aria-controls="mobile-menu"
                                >
                                    <Menu />
                                </button>}
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu */}
            <nav
                className={`fixed top-0 right-0 w-4/5 max-w-sm h-full bg-gradient-to-b from-violet-900/95 to-purple-900/95 backdrop-blur-md z-50 md:hidden transition-all duration-500 ease-in-out ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                    }`}
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile Navigation Menu"
                aria-hidden={!isOpen}
            >
                <div className={`backdrop-blur-md flex flex-col items-center gap-6 py-6 md:hidden bg-neutral-900/80 h-full min-h-screen`}>
                    <div className="w-full flex justify-end items-center px-5">
                        <button
                            aria-label="Close navigation menu"
                            onClick={handleNavClick}
                            className="focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-violet-900 rounded p-1"
                        >
                            <CircleX />
                        </button>
                    </div>
                    <div className="w-full flex flex-col justify-between h-full">
                        <div
                            className="flex flex-col gap-3 w-full px-4"
                            role="menu"
                            aria-label="Main menu"
                        >
                            {
                                navs.length > 0 && (
                                    <>
                                        {
                                            navs.map((nav) => (
                                                <a
                                                    href={nav.link}
                                                    key={nav.link}
                                                    role="menuitem"
                                                    className="hover:text-violet-400 text-2xl font-normal hover:font-bold hover:bg-black/30 px-5 py-2 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:bg-black/30 focus:text-violet-400 transition-all"
                                                    onClick={() => setIsOpen(false)} 
                                                >{nav.name}</a>
                                            ))
                                        }
                                    </>
                                )
                            }
                        </div>

                        <div className="p-4 border-t border-white/10 flex">
                            <ThemeBtn />
                        </div>

                    </div>

                </div>
            </nav>
        </div>
    )
}

export default Navbar
