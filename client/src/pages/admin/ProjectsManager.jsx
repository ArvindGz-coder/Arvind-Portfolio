import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  ExternalLink,
//   Github,
} from "lucide-react";
import adminApi from "../../services/adminApi";

function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    number: "",
    title: "",
    description: "",
    technologies: "",
    github: "",
    demo: "",
    featured: false,
    image: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await adminApi.get("/projects");

      if (response.data.success) {
        setProjects(response.data.data);
      }
    } catch (error) {
      console.error("Fetch projects error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load projects."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle form changes
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Open add form
  const handleAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowForm(true);
    setError("");
  };

  // Open edit form
  const handleEdit = (project) => {
    setEditingId(project._id);

    setFormData({
      number: project.number || "",
      title: project.title || "",
      description: project.description || "",
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : "",
      github: project.github || "",
      demo: project.demo || "",
      featured: project.featured || false,
      image: project.image || "",
    });

    setShowForm(true);
    setError("");
  };

  // Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    const payload = {
      number: formData.number,
      title: formData.title,
      description: formData.description,
      technologies: formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
      github: formData.github,
      demo: formData.demo,
      featured: formData.featured,
      image: formData.image,
    };

    try {
      if (editingId) {
        await adminApi.put(
          `/projects/${editingId}`,
          payload
        );
      } else {
        await adminApi.post("/projects", payload);
      }

      setFormData(emptyForm);
      setEditingId(null);
      setShowForm(false);

      await fetchProjects();
    } catch (error) {
      console.error("Save project error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to save project."
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await adminApi.delete(`/projects/${id}`);

      await fetchProjects();
    } catch (error) {
      console.error("Delete project error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to delete project."
      );
    }
  };

  return (
    <div className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/30">
              Admin
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Projects
            </h1>

            <p className="mt-2 text-sm text-white/40">
              Manage the projects displayed on your portfolio.
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold !text-black transition hover:bg-white/90"
          >
            <Plus size={17} />
            Add Project
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Form */}
        {showForm && (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {editingId ? "Edit Project" : "Add Project"}
                </h2>

                <p className="mt-1 text-sm text-white/40">
                  Fill in the project details below.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData(emptyForm);
                }}
                className="rounded-full p-2 text-white/40 transition hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Number */}
                <div>
                  <label className="mb-2 block text-sm text-white/50">
                    Project Number *
                  </label>

                  <input
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    required
                    placeholder="01"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-white/30"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="mb-2 block text-sm text-white/50">
                    Title *
                  </label>

                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="CareerGenie"
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-white/30"
                  />
                </div>

              </div>

              {/* Description */}
              <div className="mt-5">
                <label className="mb-2 block text-sm text-white/50">
                  Description *
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Describe your project..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-white/30"
                />
              </div>

              {/* Technologies */}
              <div className="mt-5">
                <label className="mb-2 block text-sm text-white/50">
                  Technologies
                </label>

                <input
                  name="technologies"
                  value={formData.technologies}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB, Tailwind CSS"
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-white/30"
                />

                <p className="mt-2 text-xs text-white/25">
                  Separate technologies with commas.
                </p>
              </div>

              {/* URLs */}
              <div className="mt-5 grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-sm text-white/50">
                    GitHub URL
                  </label>

                  <input
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    type="url"
                    placeholder="https://github.com/..."
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/50">
                    Live Demo URL
                  </label>

                  <input
                    name="demo"
                    value={formData.demo}
                    onChange={handleChange}
                    type="url"
                    placeholder="https://..."
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-white/30"
                  />
                </div>

              </div>

              {/* Image */}
              <div className="mt-5">
                <label className="mb-2 block text-sm text-white/50">
                  Image URL
                </label>

                <input
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  type="url"
                  placeholder="https://..."
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none focus:border-white/30"
                />
              </div>

              {/* Featured */}
              <label className="mt-5 flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-4 w-4"
                />

                <span className="text-sm text-white/60">
                  Featured project
                </span>
              </label>

              {/* Buttons */}
              <div className="mt-7 flex gap-3">

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold !text-black disabled:opacity-50"
                >
                  <Save size={16} />

                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Project"
                    : "Create Project"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData(emptyForm);
                  }}
                  className="rounded-full border border-white/10 px-5 py-3 text-sm text-white/60 transition hover:border-white/30 hover:text-white"
                >
                  Cancel
                </button>

              </div>
            </form>
          </div>
        )}

        {/* Projects */}
        <div className="mt-8">

          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center text-white/40">
              Loading projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
              <p className="text-white/40">
                No projects found.
              </p>

              <button
                onClick={handleAdd}
                className="mt-4 text-sm text-white underline underline-offset-4"
              >
                Add your first project
              </button>
            </div>
          ) : (
            <div className="grid gap-5">

              {projects.map((project) => (
                <div
                  key={project._id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                    <div className="flex gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-sm font-semibold text-white/50">
                        {project.number}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-semibold">
                            {project.title}
                          </h3>

                          {project.featured && (
                            <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white/50">
                              Featured
                            </span>
                          )}
                        </div>

                        <p className="mt-2 max-w-3xl text-sm leading-6 text-white/40">
                          {project.description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.technologies?.map(
                            (technology) => (
                              <span
                                key={technology}
                                className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/40"
                              >
                                {technology}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-white/10 p-2.5 text-white/40 transition hover:text-white"
                        >
                          <span className="text-xs font-bold">GH</span>
                        </a>
                      )}

                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-full border border-white/10 p-2.5 text-white/40 transition hover:text-white"
                        >
                          <ExternalLink size={17} />
                        </a>
                      )}

                      <button
                        onClick={() => handleEdit(project)}
                        className="rounded-full border border-white/10 p-2.5 text-white/40 transition hover:text-white"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => handleDelete(project._id)}
                        className="rounded-full border border-red-500/20 p-2.5 text-red-400 transition hover:bg-red-500/10"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>
                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ProjectsManager;