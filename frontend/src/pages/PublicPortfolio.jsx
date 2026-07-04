import { useParams } from 'react-router-dom';
import { getPublicProfile } from '../api/user.api';
import { getProjects } from '../api/project.api';
import { useFetch } from '../hooks/useFetch';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProfileHeader from '../components/profile/ProfileHeader';
import EducationList from '../components/profile/EducationList';
import ExperienceList from '../components/profile/ExperienceList';
import CertificateGrid from '../components/profile/CertificateGrid';
import ProjectCard from '../components/projects/ProjectCard';
import Skeleton from '../components/ui/Skeleton';

export default function PublicPortfolio() {
  const { slug } = useParams();
  const { data: user, loading } = useFetch(() => getPublicProfile(slug).then((r) => r.data.data.user), [slug]);
  const { data: projectData } = useFetch(() => getProjects({ owner: user?._id }).then((r) => r.data.data), [user?._id]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-bg">
        <Navbar />
        <div className="mx-auto max-w-5xl px-4 py-10"><Skeleton className="h-64" /></div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <ProfileHeader user={user} />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-4 font-display text-xl text-ink">Projects</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {projectData?.projects?.map((p) => <ProjectCard key={p._id} project={{ ...p, owner: user }} />)}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="mb-4 font-display text-xl text-ink">Education</h2>
              <EducationList education={user.education} />
            </div>
            <div>
              <h2 className="mb-4 font-display text-xl text-ink">Experience</h2>
              <ExperienceList experience={user.experience} />
            </div>
            <div>
              <h2 className="mb-4 font-display text-xl text-ink">Certificates</h2>
              <CertificateGrid certificates={user.certificates} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
