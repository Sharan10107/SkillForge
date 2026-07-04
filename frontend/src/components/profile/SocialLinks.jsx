import Input from '../ui/Input';

export default function SocialLinks({ register }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input label="GitHub" placeholder="https://github.com/you" {...register('socialLinks.github')} />
      <Input label="LinkedIn" placeholder="https://linkedin.com/in/you" {...register('socialLinks.linkedin')} />
      <Input label="Portfolio" placeholder="https://yourdomain.com" {...register('socialLinks.portfolio')} />
      <Input label="Twitter / X" placeholder="https://x.com/you" {...register('socialLinks.twitter')} />
    </div>
  );
}
