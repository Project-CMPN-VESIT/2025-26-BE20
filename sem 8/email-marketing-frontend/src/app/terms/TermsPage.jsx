import Header from "../landing-page/components/Header";
import Footer from "../landing-page/components/Footer";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      

      <section className="pt-32 pb-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Terms of Service
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
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using Mailed IT's services, you accept and agree to be bound by the 
                terms and provision of this agreement. If you do not agree to abide by these terms, 
                please do not use our services.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                Mailed IT provides email marketing automation services including but not limited to 
                email campaign creation, subscriber management, analytics, and automation workflows. 
                We reserve the right to modify, suspend, or discontinue any aspect of the service at 
                any time.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">3. User Accounts</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you create an account with us, you must provide accurate and complete information. 
                You are responsible for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Maintaining the security of your account</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Ensuring your contact information is up to date</li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Acceptable Use</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree not to use our services to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Send spam or unsolicited emails</li>
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit malware or harmful content</li>
                <li>Harass, abuse, or harm others</li>
                <li>Collect user data without consent</li>
              </ul>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Payment Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                Paid services are billed in advance on a monthly or annual basis. All fees are 
                non-refundable except as expressly stated otherwise. We reserve the right to change 
                our pricing with 30 days notice. Continued use of the service after price changes 
                constitutes acceptance of new pricing.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                The service and its original content, features, and functionality are owned by 
                Mailed IT and are protected by international copyright, trademark, patent, trade 
                secret, and other intellectual property laws. You retain ownership of content you 
                create using our services.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall Mailed IT be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including without limitation, loss of profits, 
                data, use, goodwill, or other intangible losses, resulting from your access to or 
                use of our services.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice, for 
                conduct that we believe violates these Terms or is harmful to other users, us, or 
                third parties, or for any other reason at our sole discretion.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">9. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any 
                material changes via email or through our service. Your continued use of the service 
                after such modifications constitutes acceptance of the updated terms.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For any questions about these Terms of Service, please contact us at{" "}
                <a href="mailto:legal@mailedit.com" className="text-primary hover:underline">
                  legal@mailedit.com
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

export default TermsPage;
