import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import ShaderBackground from "@/components/ui/shader-background";

const Contact = () => {
  useEffect(() => { document.title = "Elevaris AI"; }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <AuroraBackground position="top" />
      <ShaderBackground className="absolute inset-0 w-full h-full z-[1]" yOffset={0.4} />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <ContactSection hero />
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
