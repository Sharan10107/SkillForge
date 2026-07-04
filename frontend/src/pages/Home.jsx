import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCode, FiUsers, FiAward } from 'react-icons/fi';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/ui/Button';
import ProjectCard from '../components/projects/ProjectCard';
import StatCard from '../components/shared/StatCard';
import Skeleton from '../components/ui/Skeleton';
import { useFetch } from '../hooks/useFetch';
import { getFeaturedProjects } from '../api/project.api';

export default function Home() {
  const { data, loading } = useFetch(() => getFeaturedProjects().then((r) => r.data.data));

  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      {/* Hero: the blueprint grid grounds the "draft it, then forge it" thesis */}
      <section className="relative overflow-hidden border-b border-border bg-blueprint bg-grid px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-block rounded-full border border-ember-500/30 bg-ember-500/10 px-4 py-1 font-mono text-xs text-ember-600"
          >
            Built for students who ship, not just study
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="font-display text-4xl font-bold leading-tight text-ink sm:text-6xl"
          >
            Draft your portfolio.<br />
            <span className="bg-ember-gradient bg-clip-text text-transparent">Forge it into a career.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-xl text-ink-muted"
          >
            SkillForge is where students turn coursework and side projects into a portfolio
            recruiters actually remember — real projects, real feedback, real proof of skill.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link to="/signup"><Button size="lg">Start building <FiArrowRight /></Button></Link>
            <Link to="/explore"><Button size="lg" variant="secondary">Explore projects</Button></Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <StatCard label="Projects showcased" value="2,400+" icon={FiCode} accent />
          <StatCard label="Students building" value="1,100+" icon={FiUsers} />
          <StatCard label="Certificates tracked" value="3,600+" icon={FiAward} />
        </div>
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-display text-2xl text-ink">Featured projects</h2>
          <Link to="/explore" className="text-sm font-medium text-ember-600 hover:underline">See all →</Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-72" />)
            : data?.projects?.map((p) => <ProjectCard key={p._id} project={p} />)}
        </div>
      </section>

      <Footer />
    </div>
  );
}
