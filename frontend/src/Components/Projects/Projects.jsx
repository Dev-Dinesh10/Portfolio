import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Project data
const projects = [
  // 1️⃣ Asset Management System (Finance)
  {
    id: "p100",
    title: "Asset Management System",
    description:
      "A complete enterprise-grade system to manage assets, vendors, maintenance, assignments, and real-time dashboard analytics.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Chart.js",
      "Tailwind CSS",
    ],
    category: "Finance",
    images: [
      "/asset-6.png",
      "/asset-1.png",
      "/asset-3.png",
      "/asset-4.png",
      "/asset-5.png",
    ],
    websiteLink: "#", // Add your deployment link
    githubLink: "#", // Add your GitHub link
    featured: true,
    features: [
      "Asset creation & editing",
      "Vendor & department management",
      "Asset assignment & return tracking",
      "Maintenance scheduling & history",
      "Dashboard analytics with Chart.js",
      "Fully responsive UI",
    ],
  },
  // 2️⃣ FC Barcelona Mobile App (React Native)
  {
    id: "p200",
    title: "FC Barcelona Fan Mobile App",
    description:
      "A React Native fan app for FC Barcelona with live score updates, squad details, match history, and modern UI.",
    technologies: [
      "React Native",
      "Expo",
      "Tailwind RN",
      "REST API",
      "Redux Toolkit",
    ],
    category: "Sport",
    images: [
      "/barca-1.jpeg",
      "/barca-2.jpeg",
      "/barca-3.jpeg",
      "/barca-4.jpeg",
      "/barca-5.jpeg",
      "/barca-6.jpeg",
      "/barca-7.jpeg",
      "/barca-8.jpeg",
    ],
    websiteLink: "#",
    githubLink: "#",
    featured: false,
    features: [
      "Live match score updates",
      "Players list & stats",
      "Matches, standings & highlight pages",
      "Official store with merchandise",
      "Ticket booking for Camp Nou matches",
      "Photo memories and camera features",
      "Language translator for Spanish phrases",
      "Modern minimal UI",
      "Smooth animations using Expo",
    ],
  },
];

// Project card component with hover effects
const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-xl overflow-hidden border-2 border-gray-200 hover:border-black transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl group"
      onClick={() => onClick(project)}
      
    >
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100" id="projects">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
        {project.featured && (
          <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Project Details */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-black border border-gray-200">
            {project.category}
          </span>
          <div className="flex space-x-2">
            <a
              href={project.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-black transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-black transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

        <h3 className="text-xl font-bold text-black mb-2 group-hover:text-gray-700 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700 border border-gray-200"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-gray-400 text-xs self-center">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Project detail modal
const ProjectDetailModal = ({ project, onClose }) => {
  const modalRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Auto-advance images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < project.images.length - 1 ? prevIndex + 1 : 0
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [project.images.length]);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        ref={modalRef}
        className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border-2 border-gray-200"
      >
        {/* Modal header */}
        <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-black">{project.title}</h2>
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-black border border-gray-200 mt-2">
              {project.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black transition-colors p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal content */}
        <div className="p-6">
          {/* Image gallery */}
          <div className="mb-8">
            <div className="relative h-96 md:h-[500px] overflow-hidden rounded-xl bg-gray-100">
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <img
                    src={project.images[currentImageIndex]}
                    alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-xl"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Image counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white font-medium">
                {currentImageIndex + 1} / {project.images.length}
              </div>

              {/* Navigation dots */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {project.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "bg-white w-6"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Project info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-black mb-4">
                Project Overview
              </h3>
              <p className="text-gray-700 mb-6">{project.description}</p>

              <h3 className="text-xl font-bold text-black mb-4">
                Key Features
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 bg-black rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-bold text-black mb-4">
                Technical Implementation
              </h3>
              <p className="text-gray-700 mb-4">
                This project showcases modern development practices with clean
                code architecture, responsive design principles, and optimal
                performance across all devices. Built using industry-standard
                technologies and following best practices for scalability and
                maintainability.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="text-lg font-bold text-black mb-4">
                Project Details
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-600">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-white text-black border border-gray-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Filter button component
const FilterButton = ({ active, onClick, children }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border-2 ${
      active
        ? "bg-black text-white border-black shadow-lg"
        : "bg-white text-gray-700 border-gray-200 hover:border-black"
    }`}
  >
    {children}
  </motion.button>
);

// Main Projects component
const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => {
          if (filter === "featured") return project.featured;
          return project.category.toLowerCase() === filter.toLowerCase();
        });

  const categories = ["all", "finance", "sport"];

  return (
    <div
      className="py-20 bg-gradient-to-br from-green-100 via-yellow-50 to-green-200 relative overflow-hidden"
      id="project_section"
    >
      {/* Notebook paper background */}
      <div className="absolute inset-0 bg-white bg-notebook-paper"></div>

      {/* Background decorations matching home page */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-lime-100 rounded-full opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-50 rounded-full opacity-40"></div>
        <div className="absolute top-1/3 right-1/4 w-60 h-60 rounded-full bg-lime-50 opacity-30"></div>

        {/* Paper clips */}
        <div className="absolute top-0 left-1/4 w-12 h-6 bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-lg shadow-md transform -translate-x-1/2"></div>
        <div className="absolute top-0 right-1/4 w-12 h-6 bg-gradient-to-b from-gray-300 to-gray-400 rounded-b-lg shadow-md transform translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section title with same style as home */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            
            <span className="bg-black text-white px-4 py-2 inline-block transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              Projects
            </span>
          </h1>
          <div className="w-16 h-1 bg-black mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore my recent work and projects that showcase my skills and
            expertise in web and application development.
          </p>
        </motion.div>

        {/* Category filters */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <FilterButton
              key={category}
              active={filter === category}
              onClick={() => setFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </FilterButton>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-200 hover:border-black transition-colors text-center">
              <div className="text-4xl font-bold text-black mb-2">2+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-200 hover:border-black transition-colors text-center">
              <div className="text-4xl font-bold text-black mb-2">8+</div>
              <div className="text-gray-600">Technologies Used</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-200 hover:border-black transition-colors text-center">
              <div className="text-4xl font-bold text-black mb-2">100%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Notebook paper styling */}
      <style jsx>{`
        .bg-notebook-paper {
          background-image: linear-gradient(#f1f1f1 1px, transparent 1px),
            linear-gradient(90deg, #f1f1f1 1px, transparent 1px);
          background-size: 20px 20px;
        }

        @media (max-width: 768px) {
          .bg-notebook-paper {
            background-size: 15px 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;