import { Mail, Send } from "lucide-react";
import Container from "../layout/Container";

const Newsletter = () => {
  return (
    <section className="py-24">

      <Container>

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-16 text-center text-white shadow-2xl">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <Mail size={40} />
          </div>

          <h2 className="mt-8 text-4xl font-bold">
            Stay Ahead in Web Development
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
            Receive practical MERN tutorials, real-world project walkthroughs,
            DevOps tips, and modern web development articles directly in your inbox.
          </p>

          <form className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row">

            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl px-6 py-4 text-slate-900 outline-none border bottom-1"
            />

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-blue-600 transition hover:scale-105"
            >
              Subscribe
              <Send size={18} />
            </button>

          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-blue-100">

            <span>✔ Weekly Articles</span>

            <span>✔ No Spam</span>

            <span>✔ Free Forever</span>

          </div>

        </div>

      </Container>

    </section>
  );
};

export default Newsletter;