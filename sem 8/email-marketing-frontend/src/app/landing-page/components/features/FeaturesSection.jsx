import { Card } from "../../../../components/Card";
import { Mail, BarChart3, Users, Zap, Shield, Palette } from "lucide-react";

const features = [
  {
    icon: Mail,
    title: "Beautiful Templates",
    description: "Choose from hundreds of professionally designed email templates or create your own with our drag-and-drop editor.",
    gradient: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/10",
    iconColor: "text-primary"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track opens, clicks, and conversions with real-time analytics. Make data-driven decisions to improve your campaigns.",
    gradient: "from-accent/20 to-accent/5",
    iconBg: "bg-accent/10",
    iconColor: "text-accent"
  },
  {
    icon: Users,
    title: "Smart Segmentation",
    description: "Target the right audience with powerful segmentation tools. Send personalized messages that resonate.",
    gradient: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/10",
    iconColor: "text-primary"
  },
  {
    icon: Zap,
    title: "Marketing Automation",
    description: "Set up automated workflows that nurture leads and engage customers at the perfect moment.",
    gradient: "from-accent/20 to-accent/5",
    iconBg: "bg-accent/10",
    iconColor: "text-accent"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Your data is protected with enterprise-grade security, compliance, and regular backups.",
    gradient: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/10",
    iconColor: "text-primary"
  },
  {
    icon: Palette,
    title: "Brand Customization",
    description: "Maintain brand consistency across all your campaigns with custom colors, fonts, and logos.",
    gradient: "from-accent/20 to-accent/5",
    iconBg: "bg-accent/10",
    iconColor: "text-accent"
  }
];

const Features = () => {
  return (
    <section className="py-24 px-8 bg-background relative overflow-hidden" id="features">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Powerful Features</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features that help you create, send, and track email campaigns that drive results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`group relative p-8 border border-border/50 bg-gradient-to-br ${feature.gradient} backdrop-blur-sm hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 overflow-hidden animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-500"></div>
              
              
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                
                <div className={`w-14 h-14 rounded-2xl ${feature.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ring-1 ring-border/50`}>
                  <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                </div>
                
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                
                
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span>Learn more</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <p className="text-muted-foreground mb-4">
            And many more features to explore...
          </p>
          <div className="inline-flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>99.9% Uptime</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="w-px h-4 bg-border"></div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
