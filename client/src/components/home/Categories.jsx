import {
  Atom,
  Database,
  Server,
  Container,
  Cloud,
  Palette,
} from "lucide-react";

import LayoutContainer from "../layout/Container";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "React",
    count: 24,
    icon: Atom,
    color: "bg-sky-500",
  },
  {
    title: "Node.js",
    count: 18,
    icon: Server,
    color: "bg-green-600",
  },
  {
    title: "MongoDB",
    count: 15,
    icon: Database,
    color: "bg-emerald-600",
  },
  {
    title: "Docker",
    count: 10,
    icon: Container,
    color: "bg-blue-600",
  },
  {
    title: "DevOps",
    count: 12,
    icon: Cloud,
    color: "bg-indigo-600",
  },
  {
    title: "Tailwind CSS",
    count: 20,
    icon: Palette,
    color: "bg-cyan-500",
  },
];

const Categories = () => {
  return (
    <section className="py-24 bg-white">

      <LayoutContainer>

        <div className="max-w-3xl mx-auto text-center">

          <span className="text-blue-600 uppercase tracking-widest font-semibold">
            Categories
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            Browse by Technology
          </h2>

          <p className="mt-5 text-lg text-slate-600">
            Explore tutorials, guides and real-world projects
            across modern web development technologies.
          </p>

        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              {...category}
            />
          ))}

        </div>
<button className="mt-12 mx-auto block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors duration-300 hover:bg-blue-700">View All Categories</button>
      </LayoutContainer>

    </section>
  );
};

export default Categories;