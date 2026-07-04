const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">About SkillForge</h1>

      <p className="text-lg text-gray-600 mb-6">
        SkillForge is a collaborative platform where students and developers
        showcase projects, build portfolios, learn from others, and connect
        with the community.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">🚀 Build</h2>
          <p>Create and publish amazing projects.</p>
        </div>

        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">🤝 Connect</h2>
          <p>Collaborate with developers and students.</p>
        </div>

        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">🌟 Grow</h2>
          <p>Improve your portfolio and gain experience.</p>
        </div>
      </div>
    </div>
  );
};

export default About;