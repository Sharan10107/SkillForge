import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function Terms() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="mb-6 font-display text-3xl text-ink">Terms of service</h1>
        <div className="flex flex-col gap-4 text-sm leading-relaxed text-ink-muted">
          <p>By using SkillForge, you agree to only publish projects and content you have the rights to share.</p>
          <p>Harassment, plagiarized work, and spam are not allowed and may result in content removal or account suspension.</p>
          <p>SkillForge is provided "as is" without warranty. We may update these terms as the platform evolves; continued use means you accept the current version.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
