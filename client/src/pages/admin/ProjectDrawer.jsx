import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Save,
  Sparkles,
  ExternalLink,
  Layers,
  Image as ImageIcon,
  Tag,
  Eye,
  Edit3,
  Check,
  AlertCircle,
  Hash,
} from "lucide-react";
import { GithubIcon } from "../../components/ui/Icons";

const CATEGORIES = ["Full Stack", "Frontend", "Backend", "Other"];

const QUICK_TAGS = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "GSAP",
  "Framer Motion",
  "Three.js",
  "PostgreSQL",
  "Docker",
  "Redis",
  "GraphQL",
];

export default function ProjectDrawer({
  isOpen,
  onClose,
  onSave,
  editingProject,
  saving,
  error,
}) {
  const [activeTab, setActiveTab] = useState("editor"); // 'editor' | 'preview'
  const [formData, setFormData] = useState({
    number: "",
    title: "",
    description: "",
    technologies: "",
    category: "Full Stack",
    github: "",
    demo: "",
    featured: false,
    image: "",
  });

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (editingProject) {
      setFormData({
        number: editingProject.number || "",
        title: editingProject.title || "",
        description: editingProject.description || "",
        technologies: Array.isArray(editingProject.technologies)
          ? editingProject.technologies.join(", ")
          : editingProject.technologies || "",
        category: editingProject.category || "Full Stack",
        github: editingProject.github || "",
        demo: editingProject.demo || "",
        featured: Boolean(editingProject.featured),
        image: editingProject.image || "",
      });
    } else {
      setFormData({
        number: "",
        title: "",
        description: "",
        technologies: "",
        category: "Full Stack",
        github: "",
        demo: "",
        featured: false,
        image: "",
      });
    }
    setActiveTab("editor");
  }, [editingProject, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const parsedTechList = formData.technologies
    ? formData.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const handleAddQuickTag = (tag) => {
    if (!parsedTechList.includes(tag)) {
      const updated = [...parsedTechList, tag].join(", ");
      setFormData((prev) => ({ ...prev, technologies: updated }));
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updated = parsedTechList
      .filter((t) => t !== tagToRemove)
      .join(", ");
    setFormData((prev) => ({ ...prev, technologies: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Slide-in Drawer */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 280 }}
          className="relative z-10 flex h-full w-full max-w-2xl flex-col border-l border-slate-800/90 bg-slate-950/95 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                <Layers size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold font-heading text-white">
                  {editingProject ? "Edit Project Entry" : "Deploy New Project"}
                </h2>
                <p className="text-xs font-mono text-slate-400">
                  {editingProject
                    ? `Updating ID: ${editingProject._id?.slice(-8)}`
                    : "Add project to portfolio showcase"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Tab Switcher: Editor vs Live Preview */}
              <div className="flex rounded-lg border border-slate-800 bg-slate-900 p-0.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab("editor")}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition ${
                    activeTab === "editor"
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Edit3 size={13} />
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition ${
                    activeTab === "preview"
                      ? "bg-violet-500/20 text-violet-300 border border-violet-500/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Eye size={13} />
                  Live Preview
                </button>
              </div>

              <button
                onClick={onClose}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {error && (
              <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-sm text-red-400">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {activeTab === "editor" ? (
              <form id="project-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Number & Category */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-400">
                      <Hash size={13} className="text-cyan-400" />
                      Project Index Number *
                    </label>
                    <input
                      type="number"
                      name="number"
                      required
                      value={formData.number}
                      onChange={handleChange}
                      placeholder="e.g. 1, 2, 3"
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition focus:border-cyan-500/60 focus:bg-slate-900"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-slate-400">
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-sm text-white outline-none transition focus:border-cyan-500/60 focus:bg-slate-900"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="mb-1.5 block text-xs font-mono uppercase tracking-wider text-slate-400">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. AI-Powered Portfolio Orchestrator"
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition focus:border-cyan-500/60 focus:bg-slate-900"
                  />
                </div>

                {/* Description (supports markdown syntax) */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">
                      Description & Architecture *
                    </label>
                    <span className="text-[11px] font-mono text-cyan-400/80">
                      Supports Markdown
                    </span>
                  </div>
                  <textarea
                    name="description"
                    required
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Highlight core engineering achievements, microservices used, caching layer, and impact..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm font-sans text-white placeholder-slate-600 outline-none transition focus:border-cyan-500/60 focus:bg-slate-900"
                  />
                </div>

                {/* Tech Stack Chips & Input */}
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-400">
                    <Tag size={13} className="text-violet-400" />
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleChange}
                    placeholder="React, Node.js, Express, MongoDB..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition focus:border-violet-500/60 focus:bg-slate-900"
                  />

                  {/* Quick tag chips */}
                  <div className="mt-2.5">
                    <p className="mb-1.5 text-[11px] font-mono text-slate-500">
                      QUICK INSERT CHIPS:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_TAGS.map((tag) => {
                        const isAdded = parsedTechList.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() =>
                              isAdded
                                ? handleRemoveTag(tag)
                                : handleAddQuickTag(tag)
                            }
                            className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-all ${
                              isAdded
                                ? "border border-cyan-500/40 bg-cyan-500/20 text-cyan-300"
                                : "border border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-white"
                            }`}
                          >
                            {isAdded ? `✓ ${tag}` : `+ ${tag}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* External Links */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-400">
                      <GithubIcon size={13} className="text-slate-300" />
                      GitHub Repository URL
                    </label>
                    <input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      placeholder="https://github.com/..."
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition focus:border-cyan-500/60 focus:bg-slate-900"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-400">
                      <ExternalLink size={13} className="text-cyan-400" />
                      Live Demo / Deployment URL
                    </label>
                    <input
                      type="url"
                      name="demo"
                      value={formData.demo}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition focus:border-cyan-500/60 focus:bg-slate-900"
                    />
                  </div>
                </div>

                {/* Image URL */}
                <div>
                  <label className="mb-1.5 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-400">
                    <ImageIcon size={13} className="text-emerald-400" />
                    Cover Image URL / Mockup
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition focus:border-emerald-500/60 focus:bg-slate-900"
                  />
                  <p className="mt-1 text-[11px] text-slate-500">
                    Provide a hosted screenshot, Unsplash link, or Cloudinary URL.
                  </p>
                </div>

                {/* Featured Toggle Checkbox */}
                <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 transition hover:border-amber-500/30">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500"
                    />
                    <div>
                      <p className="text-sm font-semibold text-white flex items-center gap-1.5">
                        <Sparkles size={14} className="text-amber-400" />
                        Pin to Featured Showcase
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Featured projects get highlighted with neon borders and premium placement on the portfolio homepage.
                      </p>
                    </div>
                  </label>
                </div>
              </form>
            ) : (
              /* Live Preview Card Simulator */
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-violet-400 mb-2">
                    // REAL-TIME RENDER MOCKUP
                  </p>
                  <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-2xl">
                    {/* Mock Image Header */}
                    <div className="relative h-48 w-full bg-gradient-to-br from-cyan-950 via-slate-900 to-violet-950">
                      {formData.image ? (
                        <img
                          src={formData.image}
                          alt={formData.title}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center text-slate-500">
                          <ImageIcon size={36} className="mb-2 opacity-50" />
                          <span className="font-mono text-xs">
                            No cover image supplied
                          </span>
                        </div>
                      )}

                      {formData.featured && (
                        <div className="absolute top-3 right-3 rounded-full border border-amber-500/40 bg-amber-500/20 px-3 py-1 text-xs font-bold font-mono text-amber-300 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                          ★ FEATURED
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-mono text-cyan-300 backdrop-blur-md">
                        #{formData.number || "01"} • {formData.category}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <h3 className="text-xl font-bold font-heading text-white">
                        {formData.title || "Untitled Project Project"}
                      </h3>

                      <p className="mt-2.5 text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                        {formData.description ||
                          "No project description provided yet. Type in the editor to see it live."}
                      </p>

                      {/* Tech Pills */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {parsedTechList.length > 0 ? (
                          parsedTechList.map((tech, idx) => (
                            <span
                              key={idx}
                              className="rounded-md border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-mono text-cyan-300"
                            >
                              {tech}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs font-mono text-slate-600">
                            No technologies specified
                          </span>
                        )}
                      </div>

                      {/* Links */}
                      <div className="mt-5 flex items-center gap-3 border-t border-slate-800/80 pt-4">
                        {formData.demo && (
                          <a
                            href={formData.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:underline"
                          >
                            <ExternalLink size={14} /> Live Showcase
                          </a>
                        )}
                        {formData.github && (
                          <a
                            href={formData.github}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-white"
                          >
                            <GithubIcon size={14} /> Source Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer Actions */}
          <div className="flex items-center justify-between border-t border-slate-800/80 bg-slate-950 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-slate-800 px-5 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="project-form"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(6,182,212,0.3)] transition hover:from-cyan-400 hover:to-violet-500 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving to Database...
                </>
              ) : (
                <>
                  <Save size={16} />
                  {editingProject ? "Update Project" : "Deploy Project"}
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
