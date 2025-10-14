import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; 
import ThemeBtn from "../Context/ThemeBtn"; 

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 10);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleMenu = () => setIsMenuOpen((prev) => !prev);
	const closeMenu = () => setIsMenuOpen(false);

	return (
		<header
			className={`fixed w-full z-50 transition-all duration-300 ${
				isScrolled
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
						<a
							href="#home"
							onClick={closeMenu}
							className="font-medium hover:text-pink-400 transition-colors"
						>
							Home
						</a>
						<a
							href="#about"
							onClick={closeMenu}
							className="font-medium hover:text-pink-400 transition-colors"
						>
							About
						</a>
						<a
							href="#features"
							onClick={closeMenu}
							className="font-medium hover:text-pink-400 transition-colors"
						>
							Features
						</a>
					</div>

					<div className="flex items-center space-x-4">
						<ThemeBtn />

						<button
							onClick={toggleMenu}
							className="md:hidden text-white focus:outline-none"
							aria-label="Toggle navigation"
							aria-expanded={isMenuOpen}
						>
							{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>

				<div
					className={`md:hidden mt-4 space-y-4 transition-all duration-300 overflow-hidden ${
						isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
					}`}
				>
					<a
						href="#home"
						onClick={closeMenu}
						className="block font-medium text-white hover:text-pink-400 transition-colors"
					>
						Home
					</a>
					<a
						href="#about"
						onClick={closeMenu}
						className="block font-medium text-white hover:text-pink-400 transition-colors"
					>
						About
					</a>
					<a
						href="#features"
						onClick={closeMenu}
						className="block font-medium text-white hover:text-pink-400 transition-colors"
					>
						Features
					</a>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
