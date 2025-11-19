import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaMedal, FaBookOpen } from "react-icons/fa";

const EducationCard = ({ education, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="w-full"
    >
      <div
        className={`
          bg-white rounded-xl overflow-hidden transition-all duration-300
          border-2 border-gray-200 hover:border-black mb-8 shadow-sm hover:shadow-lg
          ${isExpanded ? "shadow-xl border-black" : ""}
        `}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Card header */}
        <div className="p-6 cursor-pointer">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className="mt-1">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-black border-2 border-gray-200">
                  <FaGraduationCap size={24} />
                </div>
              </div>

              {/* Main info */}
              <div>
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-black text-white mb-2">
                  {education.duration}
                </span>
                <h3 className="text-xl font-bold text-black mb-1">
                  {education.degree}
                </h3>
                <h4 className="text-gray-600 font-medium">
                  {education.institution}
                </h4>
              </div>
            </div>

            {/* Grade */}
            <div className="hidden md:block">
              <div className="flex items-center px-4 py-2 bg-gray-100 rounded-lg border border-gray-200">
                <span className="text-black font-medium">
                  {education.grade}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile view grade */}
          <div className="md:hidden mt-3">
            <div className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-lg border border-gray-200">
              <span className="text-black font-medium text-sm">
                {education.grade}
              </span>
            </div>
          </div>

          {/* Expand indicator */}
          <div className="flex justify-center mt-4">
            <button className="text-gray-400 hover:text-black transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Expandable content */}
        <div
          className={`
            overflow-hidden transition-all duration-500 bg-gray-50 border-t border-gray-200
            ${isExpanded ? "max-h-[500px] p-6" : "max-h-0"}
          `}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-3">
                <FaBookOpen className="text-black mr-2" />
                <h5 className="font-semibold text-black">Coursework</h5>
              </div>
              <ul className="space-y-2 text-gray-700">
                {education.courses.map((course, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 bg-black rounded-full mt-2 mr-2"></span>
                    {course}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <FaMedal className="text-black mr-2" />
                <h5 className="font-semibold text-black">Achievements</h5>
              </div>
              <ul className="space-y-2 text-gray-700">
                {education.achievements.map((achievement, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="inline-block w-1.5 h-1.5 bg-black rounded-full mt-2 mr-2"></span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {education.description && (
            <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-700 italic">"{education.description}"</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Education = () => {
  const educationData = [
    {
  degree: "Bachelor of Technology (B.Tech) in Electronics and Communication Engineering (ECE)",
  institution: "Parala Maharaja Engineering College, Berhampur",
  duration: "2020 - 2024",
  grade: "CGPA: 7.76",
  courses: [
    "Digital Electronics",
    "Communication Systems",
    "Signals & Systems",
    "Embedded Systems",
    "Microprocessors & Microcontrollers",
    "Computer Networks"
  ],
  achievements: [
    "Secured 3rd Rank in College-level Chess Championship",
    "Won Regional Level Kho-Kho Tournament",
    "Participated in NIT Rourkela Chess Competition",
    "Active involvement in technical & sports events"
  ],
  description:
    "Completed a comprehensive engineering program in Electronics and Communication with strong foundations in digital systems, communication technology, embedded systems, and networking. Gained problem-solving and analytical skills through hands-on labs, projects, and technical activities."
}
,
    {
  degree: "Senior Secondary Education (12th Grade - PCM)",
  institution: "Sri Chaitanya Techno School, Visakhapatnam",
  duration: "2017 - 2019",
  grade: "60%",
  courses: ["Physics", "Chemistry", "Mathematics", "English"],
  achievements: [
    "Participated in inter-college sports events",
    "Active involvement in academic and co-curricular activities"
  ],
  description:
    "Completed Senior Secondary education with a focus on the Science stream (Physics, Chemistry, Mathematics). Built strong analytical and problem-solving skills through rigorous coursework."
},

 {
  degree: "Secondary Education (Class X)",
  institution: "Kendriya Vidyalaya No.1, Bolangir Badmal",
  duration: "2016 - 2017",
  grade: "74%",
  courses: ["Mathematics", "Science", "Social Studies", "English", "Hindi"],
  achievements: [
    "Achieved 1st Rank in National Sports Olympiad (NSO)",
    "Won Regional Level Kho-Kho Tournament",
    "Active participation in sports and academic competitions"
  ],
  description:
    "Completed Secondary education with strong performance in core subjects. Demonstrated excellence in both academics and sports, building a foundation for higher education."
},
  ];

  return (
    <div
      className="py-20 bg-white relative overflow-hidden"
      id="education_section"
    >
      {/* Notebook paper background */}
      <div className="absolute inset-0 bg-white bg-notebook-paper"></div>

      {/* Background decorations similar to home */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-lime-100 rounded-full opacity-40"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-50 rounded-full opacity-40"></div>
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
            Academics
            </span>
          </h1>
          <div className="w-16 h-1 bg-black mx-auto rounded-full mb-4"></div>
         
        </motion.div>

        {/* Education Timeline */}
        <div className="max-w-4xl mx-auto">
          {educationData.map((education, index) => (
            <EducationCard key={index} education={education} index={index} />
          ))}
        </div>
      </div>

      {/* Stats/Summary section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="max-w-4xl mx-auto mt-16 px-6 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-200 hover:border-black transition-colors text-center">
            <div className="text-4xl font-bold text-black mb-2">5.0</div>
            <div className="text-gray-600">Years of Academic Excellence</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-200 hover:border-black transition-colors text-center">
            <div className="text-4xl font-bold text-black mb-2">7.3+</div>
            <div className="text-gray-600">CGPA Throughout Graduation</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-gray-200 hover:border-black transition-colors text-center">
            <div className="text-4xl font-bold text-black mb-2">15+</div>
            <div className="text-gray-600">Academic & other Achievements</div>
          </div>
        </div>
      </motion.div>

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

export default Education;
