function Footer(){
    return(
        <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-white/30">
          © {new Date().getFullYear()} Arvind Gupta. All rights reserved.
        </p>

        <p className="text-sm text-white/20">
          Built with React & Node.js
        </p>
      </div>
    </footer>
    );
}

export default Footer;