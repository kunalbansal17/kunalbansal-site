import Image from "next/image";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";


export default function Home() {
  return (
<section className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-8 py-12">
  {/* Left: Text */}
  <div className="flex-1 order-2 md:order-1">
    <h2 className="text-2xl text-gray-800 font-medium mb-6">
      Product Leader / Tinkerer / Problem Solver
    </h2>


 {/* Place image just below heading in mobile */}
    <div className="md:hidden mb-6 flex justify-center">
      <Image
        src="/images/profile.jpg"
        alt="Kunal Bansal"
        width={220}
        height={220}
        className="rounded-full object-cover aspect-square"
      />
    </div>


    
 <p className="mt-4 text-gray-700 leading-relaxed">
          I’m a hobbyist developer and a tinkerer.
        </p>

<p className="mt-4 text-gray-700 leading-relaxed">
  I studied Computer Science at JECRC, Jaipur (2011) and completed my MBA in Operations at the 
  Indian Institute of Technology, Roorkee (2015). After a brief stint in software development, 
  I found my calling in product management — shaping end-to-end products that blend technology 
  and user needs.
</p>


<p className="mt-4 text-gray-700 leading-relaxed">
  More recently, I’ve been building <a href="https://agrikunba.com" target="_blank" className="text-blue-600 hover:underline">Agrikunba</a>, 
  a SaaS platform that leverages AI to support farmers, warehouse operators, cattle traders, and fishermen 
  through advisory and workflow tools. Alongside, I run <a href="https://dhoorvi.com" target="_blank" className="text-blue-600 hover:underline">Dhoorvi</a>, 
  a sustainable D2C brand offering eco-friendly, plant-based products.
</p>

<p className="mt-4 text-gray-700 leading-relaxed">
  With over 10 years of experience leading teams from 2 to 40+ across startups and enterprises, 
  I specialize in applied AI and agile product development. What excites me most is creating 
  products from scratch, experimenting with new ideas, and collaborating with smart people to solve 
  meaningful problems.
</p>

<p className="mt-4 text-gray-700 leading-relaxed">
  Feel free to explore my work here, and connect with me on LinkedIn or via e-mail if you’d like to chat.
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

    {/* Right: Photo (desktop only) */}
  <div className="flex-shrink-0 hidden md:block order-2">
    <Image
      src="/images/profile.jpg"
      alt="Kunal Bansal"
      width={220}
      height={220}
      className="rounded-full object-cover aspect-square"
    />
  </div>
    </section>
  );
}
