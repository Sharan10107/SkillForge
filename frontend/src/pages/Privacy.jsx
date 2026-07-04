import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8 prose">
        <h1 className="mb-6 font-display text-3xl text-ink">Privacy policy</h1>
        <div className="flex flex-col gap-4 text-sm leading-relaxed text-ink-muted">
          <p>SkillForge collects the information you provide directly — your name, email, profile details, and any content you publish, like projects and comments.</p>
          <p>We use this information to operate your account, display your public portfolio (if you choose to make it public), and improve the platform.</p>
          <p>We do not sell your personal data to third parties. Uploaded files (avatars, project images, resumes) are stored with Cloudinary under our processing agreement with them.</p>
          <p>You can update or delete your profile information at any time from Settings. Contact us if you'd like your account fully removed.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
