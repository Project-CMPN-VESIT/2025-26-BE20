import { useEffect, useState } from "react"
import { Cookie } from "lucide-react";

const COOKIE_CONSENT_KEY = "cookie-consent";

const Cookies = () =>{

  const [isVisible,setIsVisbile] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);

    if(!consent){
      setIsVisbile(true);
    }
  },[]);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY,"accepted");
    setIsVisbile(false);
  }

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY,"rejected");
    setIsVisbile(false);
  }

  if(!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 py-4 px-14 bg-white backdrop-blur-md border-t  border border-border shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Cookie className="h-5 w-5 text-primary" />
          </div>
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button className="p-3 bg-transparent border border-border rounded-lg" onClick={handleReject}>
            Reject
          </button>
          <button className="bg-primary-900/90 hover:bg-primary-900 rounded-lg text-white p-3" onClick={handleAccept}>
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cookies;