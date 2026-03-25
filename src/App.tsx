import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Courses } from "./components/Courses";
import { Instructors } from "./components/Instructors";
import { Reviews } from "./components/Reviews";
import { Footer } from "./components/Footer";
import { EnrollmentForm } from "./components/EnrollmentForm";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { useState } from "react";

function App() {
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);

  return (
    <ErrorBoundary>
      <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans antialiased selection:bg-yellow-500/30">
        <Header />
        <Hero onOpenEnrollment={() => setIsEnrollmentOpen(true)} />
        <Courses />
        <Instructors />
        <Reviews />
        <Footer />
        <EnrollmentForm
          isOpen={isEnrollmentOpen}
          onClose={() => setIsEnrollmentOpen(false)}
        />
      </main>
    </ErrorBoundary>
  );
}

export default App;
