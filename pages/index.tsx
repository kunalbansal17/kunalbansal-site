import Image from "next/image";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";


export default function Home() {
  return (
    <section className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-12 py-16">
      {/* Left: Text */}
      <div className="flex-1">
        <h2 className="text-2xl text-gray-800 font-medium mb-6">
          Product Manager / Tinkerer / Problem Solver
        </h2>

        <p className="mt-4 text-gray-700 leading-relaxed">
          I’m a product manager with over 10 years of experience building
          user-centered products across startups and large enterprises,
          leveraging AI/ML, web, and mobile technologies. I’ve led teams of 2 to
          40+ in delivering both B2B and D2C solutions.
        </p>
        <p className="mt-4 text-gray-700 leading-relaxed">
          My expertise lies in applied AI, ML infrastructure, and agile product
          development — but most of all, I love using creativity to build things
          from scratch, learn new skills, and collaborate with smart people.
        </p>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Feel free to explore my work here, and connect with me on LinkedIn or
          via e-mail if you’d like to chat.
        </p>

        {/* Social Links */}
<div className="mt-8 flex flex-wrap gap-4">
  <a
    href="mailto:kunalbansal17@gmail.com"
    className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm text-gray-700 hover:bg-gray-50"
  >
    <MdEmail size={18} className="text-gray-800" /> Email
  </a>
  <a
    href="https://www.linkedin.com/in/kunalbansal17"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm text-gray-700 hover:bg-gray-50"
  >
    <FaLinkedin size={18} className="text-gray-800" /> LinkedIn
  </a>
  <a
    href="https://x.com/hyper_casual"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm text-gray-700 hover:bg-gray-50"
  >
    <FaXTwitter size={18} className="text-gray-800" /> Twitter
  </a>
  <a
    href="https://github.com/kunalbansal17"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm text-gray-700 hover:bg-gray-50"
  >
    <FaGithub size={18} className="text-gray-800" /> GitHub
  </a>
</div>

      </div>

      {/* Right: Photo */}
      <div className="flex-shrink-0">
        <Image
          src="/images/profile.jpg" // make sure this is in public/images/
          alt="Kunal Bansal"
          width={220}
          height={220}
          className="rounded-full object-cover aspect-square"
        />
      </div>
    </section>
  );
}
