import React from "react";
import { Sparkles, Brain, Code2, Rocket, Github, Mail, ChevronRight, BookOpen, BarChart3, Users, Zap, ArrowRight } from "lucide-react";
import PageLayout from "./layout/PageLayout";

const ProjectOutLine = () => {

  return (
    <PageLayout>
        <div className="min-h-screen flex flex-col bg-white text-gray-800">

            {/* Minimal Hero Section */}
            <section className="flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-5 py-12 md:py-16 gap-10">
                <div className="flex-1">
                <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    Powered by Google Gemini AI
                </div>
                <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
                    Transform Learning with <span className="text-blue-500">AI-Powered Quizzes</span>
                </h2>
                <p className="text-gray-600 mb-6 max-w-md">
                    Turn any study material into engaging quizzes and flashcards with our advanced AI technology.
                </p>
                <div className="flex flex-wrap gap-3">
                    <button className="px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-medium flex items-center gap-1.5 text-sm">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="px-5 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium flex items-center gap-1.5 text-sm">
                    <BookOpen className="w-4 h-4" />
                    View Demo
                    </button>
                </div>
                </div>
                <div className="flex-1 flex justify-center">
                <img
                    src="https://img.freepik.com/free-vector/online-test-concept-illustration_114360-8206.jpg?w=826&t=st=1709723209~exp=1709723809~hmac=4b8d3c7a3d3d8b0c9b0c9b0c9b0c9b0c9b0c9b0c9b0c9b0c9b0c9b0c9b0c9b0c9"
                    alt="Quiz Illustration"
                    className="w-full max-w-sm"
                />
                </div>
            </section>

            {/* Minimal Features */}
            <section id="features" className="mt-5 py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-5">
                <div className="text-center max-w-xl mx-auto mb-12">
                    <h3 className="text-2xl font-bold mb-3">Intelligent Quiz Creation</h3>
                    <p className="text-gray-600">Our features help educators and students create effective learning materials.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <FeatureCard
                    icon={<Sparkles className="w-6 h-6 text-blue-500" />}
                    title="AI-Powered Generation"
                    desc="Create quizzes from any text or PDF with precision."
                    />
                    <FeatureCard
                    icon={<Brain className="w-6 h-6 text-blue-500" />}
                    title="Smart Learning"
                    desc="Enhance retention with intelligent questions."
                    />
                    <FeatureCard
                    icon={<Rocket className="w-6 h-6 text-blue-500" />}
                    title="Fast & Scalable"
                    desc="Generate content instantly for all educators."
                    />
                    <FeatureCard
                    icon={<Code2 className="w-6 h-6 text-blue-500" />}
                    title="Easy Integration"
                    desc="Works with your learning management systems."
                    />
                    <FeatureCard
                    icon={<BookOpen className="w-6 h-6 text-blue-500" />}
                    title="Multiple Formats"
                    desc="Create different question types easily."
                    />
                    <FeatureCard
                    icon={<BarChart3 className="w-6 h-6 text-blue-500" />}
                    title="Performance Analytics"
                    desc="Track student performance with insights."
                    />
                </div>
                </div>
            </section>

            {/* Minimal Gemini API Section */}
            <section id="api" className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                    <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium mb-4">
                    <Zap className="w-3.5 h-3.5" />
                    Advanced Technology
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Powered by Google Gemini API</h3>
                    <p className="text-gray-600 mb-6">
                    Leverage the cutting-edge <span className="font-medium text-blue-500">Gemini AI</span> to transform educational content into meaningful assessments.
                    </p>
                    <div className="space-y-2 mb-6">
                    <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        </div>
                        <p className="text-gray-600 text-sm">Context-aware question generation</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        </div>
                        <p className="text-gray-600 text-sm">Adaptive difficulty levels</p>
                    </div>
                    <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        </div>
                        <p className="text-gray-600 text-sm">Multi-language support</p>
                    </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                    <a
                        href="https://ai.google.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-medium flex items-center gap-1.5 text-sm"
                    >
                        Explore Gemini API
                    </a>
                    <a
                        href="#"
                        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm"
                    >
                        View Documentation
                    </a>
                    </div>
                </div>
                <div className="flex-1 flex justify-center">
                    <img
                    src="https://img.freepik.com/free-vector/artificial-intelligence-isometric-icon-ai-brain-with-chip-ai-technology-machine-learning-concept_39422-1024.jpg?w=826&t=st=1709723464~exp=1709724064~hmac=4b8d3c7a3d3d8b0c9b0c9b0c9b0c9b0c9b0c9b0c9b0c9b0c9b0c9b0c9b0c9b0c9"
                    alt="Gemini API"
                    className="w-full max-w-sm rounded-lg"
                    />
                </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-5">
                <div className="text-center max-w-xl mx-auto mb-12">
                    <h3 className="text-2xl font-bold mb-3">What Educators Say</h3>
                    <p className="text-gray-600">Join teachers transforming classrooms with AI-powered quizzes.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-5">
                    <TestimonialCard
                    quote="QuizzGen AI has cut my quiz preparation time by 80%. The questions are relevant and well-structured."
                    name="Sarah Johnson"
                    role="High School Teacher"
                    />
                    <TestimonialCard
                    quote="My students love the flashcards feature. It's helped improve test scores significantly."
                    name="Michael Chen"
                    role="University Professor"
                    />
                    <TestimonialCard
                    quote="The AI understands context remarkably well. It generates good questions from complex materials."
                    name="Dr. Emily Rodriguez"
                    role="Research Director"
                    />
                </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 bg-blue-500 text-white">
                <div className="max-w-3xl mx-auto px-5 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Teaching?</h3>
                <p className="text-blue-100 mb-6">Join educators using QuizzGen AI to create engaging learning experiences.</p>
                <div className="flex flex-wrap justify-center gap-3">
                    <button className="px-5 py-2.5 bg-white text-blue-500 rounded-lg hover:bg-gray-100 transition-all font-medium text-sm">
                    Start Free Trial
                    </button>
                    <button className="px-5 py-2.5 bg-transparent text-white border border-white rounded-lg hover:bg-white/10 transition-all font-medium text-sm">
                    Schedule a Demo
                    </button>
                </div>
                </div>
            </section>

            {/* Minimal Footer */}
            <footer className="bg-gray-900 text-gray-300 py-10">
                <div className="max-w-6xl mx-auto px-5">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 bg-blue-500 rounded-md">
                        <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="text-lg font-semibold text-white">QuizzGen AI</h4>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">Making learning engaging through AI-powered quiz generation.</p>
                    <div className="flex gap-3">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-1.5 bg-gray-800 rounded-md hover:bg-gray-700 transition-all">
                        <Github className="w-4 h-4" />
                        </a>
                        <a href="mailto:hello@quizzgenai.com" className="p-1.5 bg-gray-800 rounded-md hover:bg-gray-700 transition-all">
                        <Mail className="w-4 h-4" />
                        </a>
                    </div>
                    </div>
                    <div>
                    <h5 className="text-sm font-semibold text-white mb-4">Product</h5>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white transition-all">Features</a></li>
                        <li><a href="#" className="hover:text-white transition-all">Pricing</a></li>
                        <li><a href="#" className="hover:text-white transition-all">Use Cases</a></li>
                    </ul>
                    </div>
                    <div>
                    <h5 className="text-sm font-semibold text-white mb-4">Resources</h5>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white transition-all">Documentation</a></li>
                        <li><a href="#" className="hover:text-white transition-all">Blog</a></li>
                        <li><a href="#" className="hover:text-white transition-all">Support</a></li>
                    </ul>
                    </div>
                    <div>
                    <h5 className="text-sm font-semibold text-white mb-4">Company</h5>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white transition-all">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition-all">Careers</a></li>
                        <li><a href="#" className="hover:text-white transition-all">Privacy Policy</a></li>
                    </ul>
                    </div>
                </div>
                <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3">
                    <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} QuizzGen AI. All rights reserved.</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Code2 className="w-3 h-3" />
                    <span>Made with passion for education</span>
                    </div>
                </div>
                </div>
            </footer>
            </div>
    </PageLayout>
  );
};

// Minimal Feature Card
const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white rounded-lg p-5 flex flex-col border border-gray-200 hover:border-blue-200 transition-all">
    <div className="p-2 bg-blue-50 rounded-lg w-fit mb-3">{icon}</div>
    <h4 className="font-medium mb-2">{title}</h4>
    <p className="text-gray-600 text-sm">{desc}</p>
  </div>
);

// Testimonial Card Component
const TestimonialCard = ({ quote, name, role }) => (
  <div className="bg-white rounded-lg p-5 border border-gray-200">
    <div className="flex items-center gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
    <p className="text-gray-600 text-sm mb-4 italic">"{quote}"</p>
    <div>
      <h5 className="font-medium text-sm">{name}</h5>
      <p className="text-gray-500 text-xs">{role}</p>
    </div>
  </div>
);

export default ProjectOutLine;