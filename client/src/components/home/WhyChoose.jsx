import {
  Code2,
  FolderGit2,
  Rocket,
  ShieldCheck,
} from "lucide-react";

import Container from "../layout/Container";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Rocket,
    title: "Real-World Projects",
    description:
      "Build production-ready MERN applications instead of simple tutorial projects.",
  },

  {
    icon: Code2,
    title: "Modern Development",
    description:
      "Learn React, Node.js, Express, MongoDB, Tailwind CSS and today's best practices.",
  },

  {
    icon: FolderGit2,
    title: "Industry Workflow",
    description:
      "Understand Git, GitHub, clean architecture, reusable components and scalable code.",
  },

  {
    icon: ShieldCheck,
    title: "Career Focused",
    description:
      "Gain practical skills that help you build an impressive portfolio and prepare for interviews.",
  },
];

const WhyChoose = () => {
  return (
    <section className="py-24 bg-white">

      <Container>

        <div className="max-w-3xl mx-auto text-center">

          <span className="font-semibold uppercase tracking-widest text-blue-600">
            Why DevBlog
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Learn Development the Right Way
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            DevBlog is designed for developers who want practical knowledge,
            real projects, and modern web development techniques—not just theory.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
            />
          ))}

        </div>

      </Container>

    </section>
  );
};

export default WhyChoose;