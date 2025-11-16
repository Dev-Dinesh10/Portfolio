import React from "react";
import { FaUserGraduate, FaCode, FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
  const skills = [
    "React",
    "Typescript",
    "Express.js",
    "MongoDB",
    
    "Tailwind CSS",
    "React Native",
  ];

  return (
    <section
      className="py-20 bg-white relative overflow-hidden"
      id="about_section"
    >
      {/* Background gradient similar to home section */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-t from-lime-200/20 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute top-1/4 left-0 w-1/4 h-1/3 bg-gradient-to-r from-lime-200/10 to-transparent rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-black mb-6">About Me</h2>
          <div className="w-16 h-1 bg-black mb-8"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-5/12"
          >
            <div className="relative">
              <div className="overflow-hidden rounded-lg shadow-xl">
                <img
                  src="/about-me.png"
                  alt="Dinesh - Software Developer"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Design element */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-black rounded-lg bg-white -z-10"></div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-7/12"
          >
            <h3 className="text-2xl font-bold mb-4 text-black">
              Hello, I'm{" "}
              <span className="text-gray-700">Dinesh</span>
            </h3>
<p className="text-gray-700 leading-relaxed mb-8">
  I am a <b>MERN Stack Developer</b> and <b>React Native Developer</b> with hands-on experience in building modern, user-centric web and mobile applications. 
  I specialize in creating scalable solutions using <b>React.js</b>, <b>React Native</b>, <b>Node.js</b>, <b>Express.js</b>, and <b>MongoDB</b>, with strong expertise in <b>API development</b>, <b>secure authentication</b>, and <b>database design</b>.
  <br /><br />
  Currently working as a <b>Software Trainee (React Native Developer)</b> at ITPlusPoint, I collaborate with senior engineers to develop Android applications, integrate REST APIs, enhance UI/UX performance, and streamline mobile deployment workflows. 
  I also bring a solid foundation in <b>JavaScript</b>, <b>SQL</b>, <b>Git</b>, and <b>mobile-first design</b>, along with practical experience in analytics dashboards, CI/CD practices, and building modular backend architectures.
  <br /><br />
  With a strong passion for scalable engineering and intuitive interfaces, I strive to deliver impactful digital solutions across both web and mobile ecosystems.
</p>


            {/* Skills section */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-black mb-4">
                Technical Skills
              </h4>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md text-sm font-medium border border-gray-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-gray-200 rounded-lg mr-3">
                    <FaUserGraduate className="text-gray-700" />
                  </div>
                  <h5 className="font-semibold text-gray-800">Education</h5>
                </div>
              <p className="text-gray-600 text-sm">
  B.Tech in <b>Electronics and Communication Engineering (ECE)</b> from <b>Parala Maharaja Engineering College</b>
</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-gray-200 rounded-lg mr-3">
                    <FaCode className="text-gray-700" />
                  </div>
                  <h5 className="font-semibold text-gray-800">Domain</h5>
                </div>
                <p className="text-gray-600 text-sm">
                  Software Development (Web and Application Development)
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-gray-200 rounded-lg mr-3">
                    <FaBriefcase className="text-gray-700" />
                  </div>
                  <h5 className="font-semibold text-gray-800">Experience</h5>
                </div>
                <p className="text-gray-600 text-sm">
                  Worked on 5+ projects in software development
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
                