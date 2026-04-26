import { Card } from "../../../../components/Card";
import { Star, Quote, TrendingUp} from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechFlow Inc",
    content: "This platform transformed our email marketing. We've seen a 150% increase in engagement rates and our campaigns have never looked better.",
    rating: 5,
    avatar: "SJ",
    highlight: "150% increase",
    metric: "engagement",
    size: "large"
  },
  {
    name: "Michael Chen",
    role: "Founder",
    company: "GrowthLab",
    content: "The automation features save us hours every week. Highly recommend for any growing business.",
    rating: 5,
    avatar: "MC",
    highlight: "10+ hours",
    metric: "saved weekly",
    size: "small"
  },
  {
    name: "Emily Rodriguez",
    role: "E-commerce Manager",
    company: "StyleHub",
    content: "Easy to use, powerful features, and excellent support. Our email revenue doubled.",
    rating: 5,
    avatar: "ER",
    highlight: "2x revenue",
    metric: "growth",
    size: "small"
  },
  {
    name: "David Park",
    role: "Head of Growth",
    company: "ScaleUp",
    content: "The analytics dashboard gives us insights we never had before. We can now make data-driven decisions that actually move the needle. Best investment we've made this year.",
    rating: 5,
    avatar: "DP",
    highlight: "40% ROI",
    metric: "improvement",
    size: "medium"
  },
  {
    name: "Lisa Thompson",
    role: "Digital Strategist",
    company: "BrandForge",
    content: "Seamless integration with our existing tools. The team loves it.",
    rating: 5,
    avatar: "LT",
    highlight: "5 min",
    metric: "setup time",
    size: "small"
  }
];

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "10M+", label: "Emails Monthly" },
  { value: "98%", label: "Satisfaction" },
  { value: "24/7", label: "Support" }
];

const TestimonialSection = () => {
  return (
    <section className="py-24 lg:px-8 lg:py-32 relative overflow-hidden bg-secondary/30" id="testimonials">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 animate-fade-in">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <Star className="w-3.5 h-3.5 text-primary fill-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Testimonials</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                thousands
              </span>
            </h2>
          </div>
          
          
          <div className="flex flex-wrap gap-6 lg:gap-10">
            {stats.map((stat, index) => (
              <div key={index} className="text-center lg:text-right">
                <div className="text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        
          <Card className="md:col-span-2 lg:row-span-2 group relative p-8 lg:p-10 bg-gradient-to-br from-primary to-primary-dark border-0 text-white overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 animate-fade-in">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4"></div>
            
            <div className="relative z-10 h-full flex flex-col">
              <Quote className="w-12 h-12 text-white/20 mb-6" fill="currentColor" />
              
              <p className="text-xl lg:text-2xl font-medium leading-relaxed mb-8 flex-grow">
                "{testimonials[0].content}"
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center font-bold text-lg">
                    <p className="text-white">{testimonials[0].avatar}</p>
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-white">{testimonials[0].name}</div>
                    <div className="text-white/70 text-sm">{testimonials[0].role}, {testimonials[0].company}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary-900">{testimonials[0].highlight}</div>
                  <div className="text-primary-900 text-sm">{testimonials[0].metric}</div>
                </div>
              </div>
            </div>
          </Card>

      
          {testimonials.slice(1, 3).map((testimonial, i) => (
            <Card
              key={i} 
              className="group relative p-6 bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-500 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${(i + 1) * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((element, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                
                <p className="text-foreground/80 text-sm leading-relaxed mb-6">"{testimonial.content}"</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 bg-accent/10 rounded-lg">
                    <span className="text-xs font-bold text-accent">{testimonial.highlight}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          <Card 
            className="md:col-span-2 group relative p-8 bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-500 overflow-hidden animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 text-primary" />
                </div>
              </div>
              
              <div className="flex-grow">
                <p className="text-foreground/80 leading-relaxed mb-4">"{testimonials[3].content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
                    {testimonials[3].avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonials[3].name}</div>
                    <div className="text-xs text-muted-foreground">{testimonials[3].role}, {testimonials[3].company}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 text-center md:text-right">
                <div className="text-4xl font-bold text-primary">{testimonials[3].highlight}</div>
                <div className="text-sm text-muted-foreground">{testimonials[3].metric}</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
