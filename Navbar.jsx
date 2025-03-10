import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Certifique-se de instalar: react-feather
import DiscordIcon from './DiscordIcon';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [discordInvite, setDiscordInvite] = useState(null); // State para o link do Discord
  const location = useLocation();

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/AhmadV99/Main/refs/heads/main/Nebula/JSON.json")
      .then(res => res.json())
      .then(data => {
        setDiscordInvite(data.invite_discord);
      })
      .catch(err => {
        // Trate erros aqui
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCurrent = (path) => location.pathname === path;
  const isHomeDownloadScripts = (location.pathname === '/' || location.pathname === '/download' || location.pathname === '/scripts');

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-3 py-3">
      <nav
        className={`max-w-7xl mx-auto transition-all duration-500 rounded-2xl transform ${
          isHomeDownloadScripts ? 'bg-black border border-zinc-800 shadow-lg'
          : isScrolled ? 'bg-black/60 backdrop-blur-lg border border-zinc-800/50 shadow-lg translate-y-0 scale-100'
          : 'bg-transparent -translate-y-1 scale-[1.01]'
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-1 group">
              <img src="https://files.catbox.moe/gl077v.png" alt="Nebula" className="w-12 h-12 transform transition-all duration-300 group-hover:scale-110" />
              <span className="text-white font-bold text-xl tracking-wider">Nebula</span>
            </Link>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${isCurrent('/') ? 'text-blue-400 bg-blue-500/10' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`}>
                <Menu className="w-4 h-4" /> {/* Substituí HomeIcon por Menu */}
                <span>Home</span>
              </Link>
              <Link to="/scripts" className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${isCurrent('/scripts') ? 'text-blue-400 bg-blue-500/10' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`}>
                {/* Use um ícone apropriado aqui */}
                <span>Scripts</span>
              </Link>
              <Link to="/download" className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${isCurrent('/download') ? 'text-blue-400 bg-blue-500/10' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`}>
                <span>Download</span>
              </Link>
              <div className="h-8 w-px bg-blue-500/20 mx-2"></div>
              <a href={discordInvite} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-6 py-2 rounded-lg bg-[#7289da]/20 hover:bg-[#7289da]/30
                text-[#7289da] border border-[#7289da]/50 transition-all duration-200 hover:scale-105">
                <DiscordIcon className="w-5 h-5" />
                <span>Discord</span>
              </a>
            </div>
            <button className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="py-3 space-y-2 border-t border-zinc-800/50">
              <Link to="/" className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${isCurrent('/') ? 'text-blue-400 bg-blue-500/10' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`} onClick={() => setIsOpen(false)}>
                <Menu className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link to="/download" className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${isCurrent('/download') ? 'text-blue-400 bg-blue-500/10' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`} onClick={() => setIsOpen(false)}>
                <span>Download</span>
              </Link>
              <Link to="/scripts" className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${isCurrent('/scripts') ? 'text-blue-400 bg-blue-500/10' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`} onClick={() => setIsOpen(false)}>
                <span>Scripts</span>
              </Link>
              <a href={discordInvite} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-[#7289da]/20 hover:bg-[#7289da]/30
                text-[#7289da] transition-all duration-200" onClick={() => setIsOpen(false)}>
                <DiscordIcon className="w-5 h-5" />
                <span>Discord</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
