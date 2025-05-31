import StoryHero from '@/components/StoryHero'
import MagicalAbout from '@/components/MagicalAbout'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Projects from '@/components/Projects'
import ContactEpilogue from '@/components/ContactEpilogue'
import Footer from '@/components/Footer'
import ToastProvider from '@/components/ToastProvider'

export default function Home() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-black">
        <main className="relative">
          <StoryHero />
          <MagicalAbout />
          <Experience />
          <Education />
          <Projects />
          <ContactEpilogue />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}
