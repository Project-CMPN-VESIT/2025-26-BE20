import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { Button } from "../../components/form-elements/Button";
import { CustomInput } from "../../components/form-elements/CustomInput";
import Header from "../landing-page/components/Header";
import Footer from "../landing-page/components/Footer";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Contact = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Message sent!","We'll get back to you within 24 hours.");

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-16 pb-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            We'd love to hear
            <span className="text-primary"> from you</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about EmailFlow? Need help with your account? Our
            team is here to help you succeed with your email marketing.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-6">
                  Contact Information
                </h2>
                <p className="text-muted-foreground mb-8">
                  Reach out to us through any of these channels and we'll
                  respond as quickly as possible.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Email</h3>
                    <Link
                      to="mailto:support@mailedit.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      support@mailedit.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Phone</h3>
                    <Link
                      to="tel:+9197420XXXX"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +91 97420XXXX
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Office</h3>
                    <p className="text-muted-foreground">
                      Gaurav Plaza
                      <br />
                      RRT Road Mulund
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      Business Hours
                    </h3>
                    <p className="text-muted-foreground">
                      Mon - Fri: 9:00 AM - 6:00 PM IST
                      <br />
                      Sat - Sun: Closed
                    </p>
                  </div>
                </div>
              </div>


            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Send us a message
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you shortly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label>Full Name</label>
                      <input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-12 border-2 border-primary px-2 w-full rounded-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <label>Email Address</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-12 border-2 border-primary px-2 w-full rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject">Subject</label>
                    <input
                      label={"Subject"}
                      id="subject"
                      name="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleChange} 
                      required
                      className="h-12 border-2 border-primary px-2 w-full rounded-lg"
                    />
                  </div>

                  <div className="space-y-2 flex flex-col">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="border-2 border-primary px-2 w-full rounded-lg"
                    />
                  </div>

                  <Button
                    type={"submit"}
                    styleClass="w-full !flex px-4 py-2 !justify-center !items-center text-white rounded-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
