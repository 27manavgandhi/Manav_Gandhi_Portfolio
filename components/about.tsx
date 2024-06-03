"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      
      <p className="mb-3">
        
        
        
        After graduating with a degree in Bachelors of Technology in Computer Science Enginerring, I decided to pursue my passion for {" "}<span className="font-medium">programming</span>. I enrolled in a {" "}<span className="font-medium">coding bootcamp</span> and learned {" "}<span className="font-medium">full-stack web development</span>, focusing on building dynamic and user-friendly web applications. My core stack includes {" "}<span className="font-medium">MERN, PERN, MEAN, and LAMP,</span>  and I am skilled in developing scalable solutions and implementing {" "}<span className="font-medium">RESTful APIs</span>.

I enjoy the problem-solving aspect of programming, especially the satisfaction of finding solutions to complex challenges. I am adept at integrating third-party services such as {" "}<span className="font-medium">Stripe, Twilio, PayPal, Google Maps, and Algolia</span> to enhance functionality and user experience. Additionally, I optimize application performance through techniques like code splitting, lazy loading, caching, and efficient database querying.

I have experience implementing robust authentication and authorization mechanisms, server-side rendering, and real-time notification systems. I am proficient with tools like JWT, bcrypt, Angular Universal, WebSockets, CircleCI, Docker, and AWS ECS for continuous integration and deployment.

Committed to ensuring code quality, I am familiar with automated testing frameworks such as Jest, Enzyme, Jasmine, Karma, PHPUnit, and Selenium. I excel at working collaboratively with cross-functional teams, including designers and product managers, to deliver high-quality features aligned with business objectives and user requirements.

Eager to learn and grow, I am passionate about knowledge sharing, mentorship, and promoting best practices in software development. In my free time, I enjoy playing video games, watching movies, and playing with my dog. I also love learning new things, currently focusing on history, philosophy, and learning to play the guitar. I am excited to bring a fresh perspective and contribute to dynamic projects as I seek a full-time position as a software developer.
      </p>

      <p>
        
      </p>
    </motion.section>
  );
}
