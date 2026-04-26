import { Link } from "react-router-dom";
import { Button } from "../../../components/form-elements/Button";
import { ArrowRight, CheckCircle2, Sparkles, TrendingUp, Users } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden bg-linear-to-br from-background via-custom-green-100 to-secondary">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="max-w-6xl mx-auto">
      
          <div className="text-center space-y-8 animate-fade-in">
      
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/20 rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Rated #1 Email Platform 2024</span>
            </div>
            
      
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight">
              <span className="block text-foreground mb-2">Grow Faster</span>
              <span className="block bg-gradient-to-r from-primary via-accent to-primary-900 bg-clip-text text-transparent">
                With Email
              </span>
            </h1>
            
      
            <p className="text-xl sm:text-2xl text-primary max-w-3xl mx-auto leading-relaxed">
              Launch campaigns in minutes, not hours. The smartest way to connect with your customers and drive revenue.
            </p>
            
      
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to={'/login'}>
                <Button styleClass="!flex ml-18 md:ml-0 items-center bg-primary hover:bg-primary-900 text-primary-foreground shadow-lg hover:shadow-xl transition-all group px-8 py-2 text-lg text-white gap-2 rounded-lg">
                Start Free Trial
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to={'/pricing'}>
                <Button styleClass="border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white rounded-lg transition-all py-2 px-8 text-lg">
                View Pricing
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span className="text-muted-foreground">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span className="text-muted-foreground">Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span className="text-muted-foreground">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;