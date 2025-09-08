import React from 'react'

const About = () => {
  return (
    <div className="section-padding-x py-12 max-w-6xl mx-auto">
      {/* Page Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-Primary mb-4">About Clipo.ai</h1>
        <p className="text-gray-400 text-lg">
          Transforming the way you create videos using the power of AI.
        </p>
      </header>

      {/* About Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-Primary mb-4">What is Clipo.ai?</h2>
        <p className="text-gray-300 leading-relaxed">
          Clipo.ai is an AI-powered video generation platform that allows users to create
          professional-quality videos in minutes. By leveraging advanced artificial intelligence,
          you can generate videos for marketing, social media, presentations, or personal projects
          without any technical skills.
        </p>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-Primary mb-4">Features</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li>Generate videos instantly from text input or scripts.</li>
          <li>Customizable templates for social media, marketing, and tutorials.</li>
          <li>AI voices and subtitles for professional-quality narration.</li>
          <li>Easy-to-use interface designed for beginners and professionals alike.</li>
          <li>Export videos in multiple formats and resolutions.</li>
        </ul>
      </section>

      {/* Mission Section */}
      <section>
        <h2 className="text-2xl font-semibold text-Primary mb-4">Our Mission</h2>
        <p className="text-gray-300 leading-relaxed">
          At Clipo.ai, our mission is to democratize video creation, making it accessible to
          everyone. We believe that storytelling should be simple, fast, and innovative. Our
          AI technology empowers creators to focus on ideas, while we handle the production.
        </p>
      </section>
    </div>
  )
}

export default About
