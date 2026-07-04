import { useAuth } from '../hooks/useAuth';
import ProfileHeader from '../components/profile/ProfileHeader';
import EducationList from '../components/profile/EducationList';
import ExperienceList from '../components/profile/ExperienceList';
import CertificateGrid from '../components/profile/CertificateGrid';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

// Dashboard-side view of the logged-in user's own profile, with a
// shortcut into Settings for editing.
export default function Profile() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="flex flex-col gap-8">
      <ProfileHeader user={user} />
      <div className="flex justify-end">
        <Link to="/settings"><Button size="sm" variant="secondary">Edit profile</Button></Link>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <div>
          <h2 className="mb-4 font-display text-lg text-ink">Education</h2>
          <EducationList education={user.education} />
        </div>
        <div>
          <h2 className="mb-4 font-display text-lg text-ink">Experience</h2>
          <ExperienceList experience={user.experience} />
        </div>
      </div>
      <div>
        <h2 className="mb-4 font-display text-lg text-ink">Certificates</h2>
        <CertificateGrid certificates={user.certificates} />
      </div>
    </div>
  );
}
