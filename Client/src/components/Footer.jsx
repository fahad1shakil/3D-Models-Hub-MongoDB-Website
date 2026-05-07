import { Link } from 'react-router';
import { Mail } from 'lucide-react'; // Mail আইকনটি lucide-এ আছে
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa'; // react-icons থেকে ব্র্যান্ড আইকন
import { LuRotate3D } from 'react-icons/lu';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-r from-pink-500 to-red-600 py-8 px-4 rounded-xl mt-20 text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <div className="flex items-center space-x-2 text-white">
            <LuRotate3D size={25}/>
            <span className="text-xl font-bold text-white">3D Model Hub</span>
          </div>
          <ul className="space-y-2 mt-4">
            <li><Link to="/all-models" className="text-white/80 hover:text-white transition-colors">All Models</Link></li>
            <li><Link to="/add-model" className="text-white/80 hover:text-white transition-colors">Add Model</Link></li>
            <li><Link to="/profile" className="text-white/80 hover:text-white transition-colors">Profile</Link></li>
            <li><Link to="/auth/login" className="text-white/80 hover:text-white transition-colors">Login</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 text-white">Resources</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Learning Blog</Link></li>
            <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Guides</Link></li>
            <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Poly Tips</Link></li>
            <li><Link to="/resources" className="text-white/80 hover:text-white transition-colors">Resources</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 text-white">Community</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Discussion Forums</Link></li>
            <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Study Groups</Link></li>
            <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Events & Workshops</Link></li>
            <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Leaderboard</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2 text-white">Connect With Us</h3>
          <p className="text-2xl font-extrabold tracking-wider text-transparent bg-clip-text bg-linear-to-r from-yellow-200 via-yellow-400 to-yellow-500 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)] mb-4 animate-pulse">Fahad Shakil</p>
          
          <div className="flex space-x-4 mb-4">
            {/* এখানে react-icons ব্যবহার করা হয়েছে */}
            <a href="https://www.facebook.com/fahad2shakil" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
              <FaFacebook size={24} />
            </a>
            <a href="https://github.com/fahad1shakil" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/fahad1shakil/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
              <FaLinkedin size={24} />
            </a>
          </div>
          <div>
            <a 
              href="mailto:fahad1shakil@gmail.com" 
              className="flex items-center text-white/80 hover:text-white transition-colors"
            >
              <Mail size={18} className="mr-2" /> fahad1shakil@gmail.com
            </a>
          </div>
        </div>
      </div>

      <div className="border-t lg:mb-0 md:mb-0 mb-20 border-white/20 mt-8 pt-4 text-center">
        <p className="text-sm text-white/80">
          © {currentYear} Developed by Fahad Shakil. All Rights Reserved.
          <span className="ml-4">
            <Link to="/" className="hover:text-white mr-3 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;