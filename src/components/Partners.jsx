import { Github, Linkedin, Twitter, Globe } from "lucide-react";

const Partners = () => {

    const ourPartners = [
        {
            name: "DigitalOcean",
            logo: "/partners/digitalOcean.png",
            socials: [
                { name: "website", icon: Globe, link: "https://www.digitalocean.com" },
                { name: "twitter", icon: Twitter, link: "https://twitter.com/digitalocean" },
                { name: "linkedin", icon: Linkedin, link: "https://www.linkedin.com/company/digitalocean/" },
            ],
        },
        {
            name: "GitHub",
            logo: "/partners/github.png",
            socials: [
                { name: "website", icon: Globe, link: "https://github.com" },
                { name: "twitter", icon: Twitter, link: "https://twitter.com/github" },
                { name: "linkedin", icon: Linkedin, link: "https://www.linkedin.com/company/github/" },
            ],
        },
        {
            name: "Holopin",
            logo: "/partners/holopin.png",
            socials: [
                { name: "website", icon: Globe, link: "https://holopin.io" },
                { name: "twitter", icon: Twitter, link: "https://twitter.com/holopin_" },
                { name: "linkedin", icon: Linkedin, link: "https://www.linkedin.com/company/holopin/" },
            ],
        },
        {
            name: "Major League Hacking",
            logo: "/partners/mlh.png",
            socials: [
                { name: "website", icon: Globe, link: "https://mlh.io" },
                { name: "twitter", icon: Twitter, link: "https://twitter.com/MLHacks" },
                { name: "linkedin", icon: Linkedin, link: "https://www.linkedin.com/company/major-league-hacking/" },
            ],
        },
    ];


    return (
        <section
            id="partners"
            className="container mx-auto px-6 py-24 relative"
            aria-labelledby="partners-title"
        >

            <h2 id="partners-title" className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                Our Partners
            </h2>

            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 `}>
                {ourPartners.map((partner) => (
                    <div
                        key={partner.name}
                        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center group hover:border-pink-300/50 hover:-translate-y-2 transition-all duration-300 flex justify-between items-center flex-col"
                        role="article"
                        aria-label={`Partner: ${partner.name}`}
                    >
                        <div>
                            <div className="inline-flex transition-all">
                                <img
                                    src={partner.logo}
                                    alt={`${partner.name} logo`}
                                    className="w-full object-cover h-16 mx-auto mb-3 transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <div className="relative">
                                <h3 className="text-2xl font-bold mb-2 text-sky-300">
                                    {partner.name}
                                </h3>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-center gap-3 dark:bg-black rounded-full p-3">
                            {
                                partner.socials && partner.socials.length > 0 && (
                                    <>
                                        {partner.socials.map((social) => (
                                            <a
                                                href={social.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-white text-neutral-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black rounded p-1"
                                                key={social.name}
                                                aria-label={`${partner.name} ${social.name}`}
                                            >
                                                <social.icon className="w-5 h-5" aria-hidden="true" />
                                            </a>
                                        ))}
                                    </>
                                )
                            }
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Partners
