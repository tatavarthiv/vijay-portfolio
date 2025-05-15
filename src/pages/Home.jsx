import { ThemeToggle } from "@/components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { NavBar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Theme Toggle */}
      <ThemeToggle />
      {/* Background Effects */}
      <StarBackground />
      {/* NavBar */}
      <NavBar />
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />
        {/* About Me Section */}
        <About />
        {/* Skills section */}
        <Skills />
        {/* Projects section */}
        <Projects />
        {/* Contact section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
