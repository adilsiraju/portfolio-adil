import StoryHero from '@/components/StoryHero'
import MagicalAbout from '@/components/MagicalAbout'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Projects from '@/components/Projects'
import ContactEpilogue from '@/components/ContactEpilogue'
import Footer from '@/components/Footer'
import VerticalNavigation from '@/components/VerticalNavigation'
import ScrollProgress from '@/components/ScrollProgress'
import ToastProvider from '@/components/ToastProvider'

export default function Home() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-black">
        <ScrollProgress />
        <VerticalNavigation />
        <main className="relative">
          {/* <section id="story-hero">
            <StoryHero />
          </section> */}
          <section id="magical-about">
            <MagicalAbout />
          </section>
          <section id="experience">
            <Experience />
          </section>
          <section id="education">
            <Education />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="contact">
            <ContactEpilogue />
          </section>
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}
