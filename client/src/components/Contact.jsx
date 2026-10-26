import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import axios from "axios";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitting(true);
    setStatus("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/contact`,
        formData,
      );

      if (response.data.success) {
        setStatus("success");

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-white/30">
              Contact
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Let's build something.
            </h2>

            <p className="mt-6 max-w-md leading-7 text-white/40">
              Have a project, opportunity or just want to connect? Send me a
              message and I'll get back to you.
            </p>

            <a
              href="mailto:arvindgupta.webdev@gmail.com"
              className="mt-8 inline-flex items-center gap-3 text-sm text-white/60 transition hover:text-white"
            >
              <Mail size={18} />
              arvindgupta.webdev@gmail.com
            </a>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-9"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm text-white/50"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/30"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm text-white/50"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/30"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Message */}
            <div className="mt-6">
              <label
                htmlFor="message"
                className="mb-2 block text-sm text-white/50"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/30"
                placeholder="Tell me about your project..."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold !text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Send Message"}

              <Send size={16} />
            </button>

            {/* Success */}
            {status === "success" && (
              <p className="mt-4 text-sm text-green-400">
                Message sent successfully! I'll get back to you soon.
              </p>
            )}

            {/* Error */}
            {status !== "success" && status !== "" && !submitting && (
              <p className="mt-4 text-sm text-red-400">{status}</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
