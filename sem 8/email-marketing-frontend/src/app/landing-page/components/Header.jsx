import { Button } from "../../../components/form-elements/Button";
import Logo from "./../../../assets/light-logo.png";
import { Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const homeNavLinks = [
    { label: "Features", href: "/#features" },
    { label: "Testimonials", href: "/#testimonials" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex h-16 items-center justify-between">
          
          <Link to="/" className="flex items-center gap-2 group ">
            <img src={Logo} alt="MailedIT Logo" className="w-32"/> 
          </Link>

        
          <div className="hidden md:flex items-center gap-8">
            {homeNavLinks.map((link) =>
              isHomePage ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full ${
                    location.pathname === link.href
                      ? "text-primary after:w-full"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button styleClass="px-4 border border-primary py-2 text-muted-foreground rounded-lg bg-transparent transition-all ease-in text-foreground">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button styleClass="bg-primary px-4 py-2 rounded-lg hover:bg-primary-900 text-white shadow-md hover:shadow-lg transition-all">
                Sign Up Free
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 " /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in border-t border-border/40">
            <div className="flex flex-col gap-4">
              {homeNavLinks.map((link) =>
                isHomePage ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`text-sm font-medium transition-colors py-2 ${
                      location.pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="flex flex-col gap-2 pt-4 border-t border-border/40">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button styleClass="w-full bg-primary hover:bg-primary-900  py-2 rounded-lg text-secondary">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button styleClass="w-full py-2 bg-primary hover:bg-primary-900 rounded-lg text-secondary">
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;