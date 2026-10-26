import {motion} from 'framer-motion';
import {Award, ExternalLink} from 'lucide-react';
const certifications = [
    {
        title:"Google Cloud Foundations",
        issuer: "Google Cloud",
        year:"2026",
        link:"#",
    },
];

function Certifications() {
    return (
        <section id="certifications" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-white/30">
            Certifications
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Learning beyond projects.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {certifications.map((certificate, index) => (
            <motion.div
              key={certificate.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:bg-white/[0.05]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <Award size={20} className="text-white/60" />
                </div>

                <a
                  href={certificate.link}
                  className="rounded-full border border-white/10 p-2 text-white/40 transition hover:text-white"
                  aria-label={`View ${certificate.title}`}
                >
                  <ExternalLink size={16} />
                </a>
              </div>

              <h3 className="mt-7 text-lg font-semibold">
                {certificate.title}
              </h3>

              <p className="mt-2 text-sm text-white/40">
                {certificate.issuer} · {certificate.year}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    );
}

export default Certifications;