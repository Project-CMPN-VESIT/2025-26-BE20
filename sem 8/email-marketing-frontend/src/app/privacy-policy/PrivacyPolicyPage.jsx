import Header from "../landing-page/components/Header";
import Footer from "../landing-page/components/Footer";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-32 pb-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: {new Date().toDateString()}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none space-y-8">
            
            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information you provide directly to us, such as when you create an account, 
                subscribe to our newsletter, or contact us for support. This may include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Name and email address</li>
                <li>Company name and job title</li>
                <li>Payment information</li>
                <li>Communication preferences</li>
                <li>Any other information you choose to provide</li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Communicate with you about products, services, and events</li>
                <li>Monitor and analyze trends, usage, and activities</li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to outside parties. 
                This does not include trusted third parties who assist us in operating our website, 
                conducting our business, or servicing you, so long as those parties agree to keep this 
                information confidential.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement a variety of security measures to maintain the safety of your personal 
                information. Your personal information is contained behind secured networks and is only 
                accessible by a limited number of persons who have special access rights and are required 
                to keep the information confidential.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies to understand and save your preferences for future visits, keep track of 
                advertisements, and compile aggregate data about site traffic and site interaction so 
                that we can offer better site experiences and tools in the future.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Request data portability</li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@mailedit.com" className="text-primary hover:underline">
                  privacy@mailedit.com
                </a>
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;