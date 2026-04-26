import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 px-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-6 h-6 text-primary" />
              <Link to={'/'} className="text-xl font-bold">Mailed IT</Link>
            </div>
            <p className="text-background/70 text-sm">
              The modern email marketing platform for growing businesses.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/#features" className="hover:text-primary transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-background/70">
              <li><Link to="/privacy_policy" className="hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/70">
          <p>&copy; {new Date().getFullYear()} Mailed IT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;