/*
 * Projects, rendered on projects.html, grouped by category.
 *
 *   id:          anchor, so projects.html#<id> links straight to it
 *   category:    one of the keys in PROJECT_CATEGORIES
 *   importance:  sort order within a category (1 first)
 *   description: one-line summary
 *   body:        HTML
 *   img:         optional image path, shown dithered
 *   imgDither:   optional dither.js options for img, e.g. { contrast: 2, brightness: 0.3 },
 *                or false to show the image as-is
 *   links:       optional [{ label, href }]
 */
window.PROJECT_CATEGORIES = {
  hackathons: "Hackathons",
  systems: "Systems & graphics",
};

window.PROJECTS = [
  // ---- hackathons --------------------------------------------------------
  {
    id: "snapgen",
    title: "SnapGen",
    category: "hackathons",
    importance: 1,
    description: "1st place, Megathon 2025: on-device Stable Diffusion style transfer",
    body: `
      <p><strong>1st place at Megathon 2025</strong>, IIIT Hyderabad's Qualcomm-sponsored
      hackathon.</p>
      <p>SnapGen is a prompt-driven <strong>Stable Diffusion style editor</strong>: give it an
      image and a prompt describing an art style, and it returns the same image rendered in
      that style.</p>
      <p>The hard part was not the model, it was the target. Everything had to run
      <strong>fully on-device on the Qualcomm QIDK's NPU</strong>: not a GPU, and not
      something any standard inference stack targets out of the box. Getting a diffusion
      pipeline to fit and run on that neural engine was most of the hackathon.</p>`,
    links: [{ label: "Code", href: "https://github.com/CoderKai9001/SnapGen-Local-AI-image-editor" }],
  },
  {
    id: "yoga-pose-coach",
    title: "Yoga Pose Coach",
    category: "hackathons",
    importance: 2,
    description: "2nd place, Megathon 2024: on-device pose correction from joint angles",
    body: `
      <p><strong>2nd place at Megathon 2024</strong>, also Qualcomm-sponsored.</p>
      <p>We built a human <strong>keypoint detector</strong> and turned it into a yoga
      instructor app. The app estimates body pose, computes the angles along pre-determined
      keypoint-to-keypoint edges, and compares them against the target pose, so it can tell
      you <em>which</em> joint is wrong and in which direction, then guide you through a
      sequence.</p>
      <p>Like SnapGen a year later, it had to be deployed on the <strong>Qualcomm QIDK
      NPU</strong>, which was my first encounter with getting a model onto hardware that
      behaves nothing like a GPU.</p>`,
    links: [{ label: "Code", href: "https://github.com/CoderKai9001/Pose-Detection-android" }],
  },
  {
    id: "agentic-data-repair",
    title: "Agentic Data Repair",
    category: "hackathons",
    importance: 3,
    description: "3rd place, Lloyds Banking Group hackathon: human-in-the-loop data quality",
    body: `
      <p><strong>3rd place at the Lloyds Banking Group internal hackathon</strong> (Dec 2025),
      which opened a few slots to teams from IIIT Hyderabad.</p>
      <p>We built an <strong>agentic AI system</strong> on Google Cloud that detects
      inconsistencies across a data estate and proposes corrections. The design point was the
      <strong>human in the loop</strong>: in a bank, an agent that silently rewrites records is
      a liability, so every proposed repair is surfaced for a person to approve, reject or
      amend before anything is committed.</p>`,
    links: [{ label: "Code", href: "https://github.com/CoderKai9001/lloyds-hackathon" }],
  },
  {
    id: "mess-crowd-predictor",
    title: "Mess Crowd Predictor",
    category: "hackathons",
    importance: 4,
    description: "Most Impactful Project, HackIIIT 2026: live in the MyIIIT app, 1000+ daily users",
    body: `
      <p><strong>Most Impactful Project award at HackIIIT 2026.</strong> We did not place in
      the top three, but this is the project of mine that most people actually use.</p>
      <p>IIIT Hyderabad has three messes, and students entering scan a QR code tagged to them.
      That scan stream is a live crowd sensor nobody was reading. The app:</p>
      <ul>
        <li>counts scans in the <strong>last 10 minutes</strong> to show how long the QR queue
        is right now,</li>
        <li>counts <strong>total scans</strong> to show how full the mess itself is, and</li>
        <li>fits an <strong>ARMA</strong> model over historical scan data to recommend a good
        time to go next.</li>
      </ul>
      <p>It has since been <strong>integrated into the official MyIIIT app</strong> and is used
      daily by <strong>1000+ students</strong>, especially when a special meal has everyone
      arriving at once.</p>`,
  },

  // ---- systems -----------------------------------------------------------
  {
    id: "perlin-terrain",
    title: "Perlin Noise Terrain",
    category: "systems",
    importance: 0,
    description: "Procedural terrain in ModernGL and GLSL, built up one step at a time",
    img: "assets/img/projects/perlin-terrain.png",
    imgDither: false,
    body: `
      <p>A procedurally generated, lit terrain written in Python with <strong>ModernGL</strong>
      and <strong>GLSL</strong>. It is built up as a sequence of small programs, each adding one
      idea to the last: a rotating triangle with hand-written MVP matrices, a point grid, a
      triangulated mesh, and finally terrain.</p>
      <p>Heights come from <strong>Perlin noise</strong> stacked over several octaves (fractal
      Brownian motion), lit with <strong>Blinn-Phong</strong> shading. The last version moves
      everything into the <strong>vertex shader</strong>: gradients come from a hash of the
      lattice coordinates and normals from the analytic derivative of the noise, so the CPU
      uploads a flat grid once and much denser terrain becomes practical.</p>
      <p>Instead of real shadows, two cheap tricks: a sky/ground hemisphere ambient that darkens
      steep slopes, and a fake ambient occlusion that darkens points sitting below a smoothed,
      low-octave copy of the terrain.</p>`,
    links: [{ label: "Code", href: "https://github.com/CoderKai9001/PerlinNoiseTerrainGeneration" }],
  },
  {
    id: "construction-safety",
    title: "Construction Site Safety Checker",
    category: "systems",
    importance: 1,
    description: "Fine-tuned YOLOv11 on an edge device for PPE compliance",
    body: `
      <p>A computer-vision deployment project: fine-tuned <strong>YOLOv11</strong> and ran it
      on an <strong>edge device</strong> to check personal protective equipment compliance on
      a construction site, detecting whether workers are wearing <strong>helmets, safety vests
      and gloves</strong>.</p>
      <p>On top of the detector we built an <strong>admin dashboard</strong> that tracks
      worker density across the site and sends <strong>email notifications</strong> when a
      hazard or a compliance violation is detected.</p>`,
    links: [
      { label: "App & dashboard", href: "https://github.com/CoderKai9001/ConstructionSiteMonitoringAndroid" },
      { label: "Model training", href: "https://github.com/CoderKai9001/ConstructionSiteanalysis" },
    ],
  },
  {
    id: "distributed-nfs",
    title: "Distributed Network File System",
    category: "systems",
    importance: 2,
    description: "Storage servers, a naming server and concurrent clients, in C",
    body: `
      <p>A distributed file system written from scratch in <strong>C</strong>, with three
      components: <strong>storage servers</strong> that hold the data, a <strong>naming
      server</strong> that resolves paths to the server holding them, and
      <strong>clients</strong>.</p>
      <p>It handles <strong>concurrent requests</strong> from multiple clients and supports
      <strong>streaming</strong> of text, audio and video, over a structured directory system
      with the concurrency control to keep it consistent under simultaneous access.</p>`,
  },
  {
    id: "ray-tracer",
    title: "Ray Tracer in C++",
    category: "systems",
    importance: 3,
    description: "Analytic ray–primitive intersection and a full shading pipeline, on OpenGL",
    body: `
      <p>A <strong>ray tracer</strong> built from first principles in <strong>C++</strong>,
      rendered to an OpenGL display.</p>
      <p>It implements analytic ray–primitive intersection for five primitives:
      <strong>spheres, cylinders, cuboids, ellipsoids and cones</strong>, and the full pipeline
      on top: camera ray generation, lighting, shading and shadows.</p>`,
  },
];
