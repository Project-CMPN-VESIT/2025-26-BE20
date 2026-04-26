import Header from "../landing-page/components/Header";
import Footer from "../landing-page/components/Footer";
import { Button } from "../../components/form-elements/Button";
import { Link } from "react-router-dom";
import {
  Target,
  Heart,
  Zap,
  Users,
  Mail,
  TrendingUp,
  Globe,
  Award,
} from "lucide-react";

const AboutUsPage = () => {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description:
        "We're committed to democratizing email marketing, making powerful tools accessible to businesses of all sizes.",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Every feature we build starts with understanding our customers' needs and challenges.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "We continuously push boundaries to deliver cutting-edge email marketing solutions.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "We believe in building lasting relationships and fostering a supportive community.",
    },
  ];

  const story = [
    { year: "2020", event: "Mailed IT founded with a vision" },
    { year: "2021", event: "Reached 10,000 active users" },
    { year: "2022", event: "Launched automation builder" },
    { year: "2023", event: "Expanded to 120+ countries" },
    { year: "2024", event: "50,000+ businesses trust us" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-16 pb-24 px-4 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto max-w-4xl text-center relative">
          <div className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-primary/10">
            <Award className="w-4 h-4 text-primary" />
            Our Story
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-[1.1] tracking-tight">
            Empowering businesses to connect through
            <span className="text-primary block mt-2"> meaningful emails</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Founded in 2020, Mailed IT has grown from a simple idea to a
            platform trusted by over 50,000 businesses worldwide. Our mission is
            to make professional email marketing accessible to everyone.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-28 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">
                Our Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">
                Built by marketers, for marketers
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Mailed IT was born out of frustration. As digital marketers
                  ourselves, we struggled with clunky, overpriced email
                  platforms that made simple tasks unnecessarily complex.
                </p>
                <p>
                  We believed there had to be a better way. So in 2020, we set
                  out to build the email marketing platform we always wished
                  existed—one that's powerful yet intuitive, feature-rich yet
                  affordable.
                </p>
                <p>
                  Today, Mailed IT helps businesses of all sizes send billions
                  of emails every month. But we're just getting started. Our
                  team continues to innovate, driven by the same passion that
                  sparked our journey.
                </p>
              </div>
            </div>
            <div className="bg-secondary rounded-3xl p-8 md:p-10 border border-primary/5">
              <div className="space-y-0">
                {story.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-5 relative pb-8 last:pb-0"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-primary rounded-full ring-4 ring-secondary z-10"></div>
                      {index < 4 && (
                        <div className="w-0.5 h-full bg-primary/20 absolute top-3 left-[5px]"></div>
                      )}
                    </div>
                    <div className="pt-0">
                      <div className="font-bold text-foreground text-lg">
                        {item.year}
                      </div>
                      <div className="text-muted-foreground">{item.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from product development
              to customer support.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-background rounded-2xl p-7 border border-border hover:border-primary/30 transition-colors duration-200 group"
              >
                <div className="w-14 h-14 bg-secondary text-primary rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                  <value.icon className="w-6 h-6 group-hover:text-secondary transition-colors duration-200" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-5">
            Ready to join our journey?
          </h2>
          <p className="text-secondary mb-10 max-w-2xl mx-auto text-lg">
            Start your free trial today and see why thousands of businesses
            trust Mailed IT.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              styleClass="px-4 rounded-lg bg-secondary py-2.5 text-primary-900"
            >
              <Link to="/login">Get Started Free</Link>
            </Button>
            <Button
              styleClass="px-4 py-2 border border-secondary rounded-lg text-secondary"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUsPage;
