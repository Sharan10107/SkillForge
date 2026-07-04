import Card from '../ui/Card';

export default function CertificateGrid({ certificates = [] }) {
  if (!certificates.length) return <p className="text-sm text-ink-muted">No certificates added yet.</p>;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {certificates.map((cert, i) => (
        <Card key={i} hover={false} className="flex flex-col gap-1">
          <p className="font-display text-ink">{cert.title}</p>
          <p className="text-sm text-ink-muted">{cert.issuer}</p>
          {cert.credentialUrl && (
            <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="text-xs text-ember-600 hover:underline">
              View credential
            </a>
          )}
        </Card>
      ))}
    </div>
  );
}
