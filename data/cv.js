/*
 * CV content, rendered on cv.html.
 *
 * Each section is one of:
 *   { title, entries: [{ title, org, location, dates, summary, highlights }] }
 *   { title, publications: true }   (pulls from data/publications.js)
 *   { title, skills: [{ name, items }] }
 * All text fields accept HTML.
 */
window.CV = {
  pdf: "assets/pdf/Aditya_Vadali_CV.pdf",
  resume: "assets/pdf/AdityaVadaliResume.pdf",

  sections: [
    {
      title: "Education",
      entries: [
        {
          title: "B.Tech + MS by Research, Dual Degree (CSD)",
          org: '<a href="https://www.iiit.ac.in/">International Institute of Information Technology, Hyderabad</a>',
          location: "Hyderabad, India",
          dates: "Aug 2023 – May 2028",
          highlights: [
            "<strong>CGPA: 8.04 / 10</strong>",
            "Currently in the 4th year (semester 7). Expected graduation May 2028.",
          ],
        },
      ],
    },
    {
      title: "Experience",
      entries: [
        {
          title: "Undergraduate Researcher",
          org: '<a href="https://robotics.iiit.ac.in/">Robotics Research Center (RRC), IIIT Hyderabad</a>',
          location: "Hyderabad, India",
          dates: "May 2024 – present",
          summary:
            "Advisor: Prof. K. Madhava Krishna. Collaborator: Prof. Sourav Garg. Robotic perception, 3D vision, and planning &amp; navigation.",
          highlights: [
            "<strong>Plann3r: 3D-grounded planning costs (CoRL 2026, first author).</strong> Fine-tuned VGGT with a new prediction head that outputs goal-conditioned geodesic costmaps for navigation from single-camera RGB input; evaluated on HM3D scenes.",
            "Designed and ran the Plann3r rebuttal experiments, including a loop-closure extension addressing single-traversal assumptions, retrieval-noise sweeps, and bootstrap confidence intervals.",
            "<strong>PixelLoop: pixel-level loop closures (IROS 2026).</strong> Co-developed a loop-detection pipeline that adds pixel-level loop closures to topological navigation methods such as MASt3R-Nav, and ran its benchmark evaluation.",
            "<strong>Ongoing.</strong> Topological navigation, visual place recognition (VPR), and RGB-only last-mile docking for mobile robots.",
            "<strong>Deep-learning-based visual servoing (Summer 2024).</strong> Revived legacy codebases for the lab's RTVS and Imagine2Servo methods and built a benchmark evaluating them across varying viewpoint angles and query-to-goal distances.",
          ],
        },
      ],
    },
    { title: "Publications", publications: true },
    {
      title: "Awards",
      entries: [
        {
          title: "Most Impactful Project, HackIIIT 2026",
          org: "IIIT Hyderabad",
          dates: "Feb 2026",
          summary:
            "Mess crowd-prediction system using live QR-scan data and ARMA forecasting to recommend visit times; integrated into the official MyIIIT app and used daily by 1000+ students.",
        },
        {
          title: "3rd Place, Lloyds Banking Group Hackathon",
          org: "Lloyds Banking Group IP&amp;I",
          dates: "Dec 2025",
          summary:
            "Agentic AI system on Google Cloud that detects and corrects data inconsistencies with a human in the loop.",
        },
        {
          title: "1st Place, Megathon 2025",
          org: "IIIT Hyderabad (Qualcomm-sponsored)",
          dates: "Oct 2025",
          summary:
            "SnapGen: a prompt-driven Stable Diffusion style-transfer editor, deployed fully on-device on the Qualcomm QIDK NPU.",
        },
        {
          title: "2nd Place, Megathon 2024",
          org: "IIIT Hyderabad (Qualcomm-sponsored)",
          dates: "Oct 2024",
          summary:
            "Yoga instructor app: on-device human keypoint detection on the Qualcomm QIDK NPU, with real-time pose-correction feedback derived from joint angles.",
        },
      ],
    },
    {
      title: "Projects",
      entries: [
        {
          title: '<a href="https://github.com/CoderKai9001/PerlinNoiseTerrainGeneration">Perlin Noise Terrain</a>',
          org: "Computer Graphics",
          dates: "2026",
          summary:
            "Procedural terrain in ModernGL and GLSL: multi-octave Perlin noise evaluated in the vertex shader with analytic normals, Blinn-Phong lighting, hemisphere ambient and fake ambient occlusion.",
        },
        {
          title: '<a href="https://github.com/CoderKai9001/Splatt3r-SFM">Splatt3r-SfM</a>',
          org: "3D Vision",
          dates: "2025",
          summary:
            "Combined MASt3R-SfM N-view pose estimation with Splatt3r's 2-view Gaussian head, fusing pairwise splats into a single aligned scene for feed-forward novel view synthesis from unposed images.",
        },
        {
          title: '<a href="https://github.com/CoderKai9001/NoMaD-RPN">NoMaD Deployment on Pioneer P3DX</a>',
          org: "Robot Navigation",
          dates: "2025",
          summary:
            "Deployed an image-goal navigation model on a Pioneer P3DX over ROS for closed-loop control, optimizing inference for real-time onboard operation.",
        },
        {
          title: '<a href="https://github.com/CoderKai9001/ConstructionSiteMonitoringAndroid">Construction Site Safety Hazard Checker</a>',
          org: "Edge Computer Vision",
          summary:
            "Fine-tuned YOLOv11 on an edge device to detect helmet, safety-vest and glove compliance, with an admin dashboard for worker-density monitoring and email hazard alerts.",
        },
        {
          title: "Distributed Network File System",
          org: "Systems (C)",
          summary:
            "Storage servers, a naming server and clients supporting concurrent requests and streaming of text, audio and video over a structured directory system.",
        },
        {
          title: "Ray Tracer in C++",
          org: "Computer Graphics",
          dates: "2024",
          summary:
            "Full ray-tracing pipeline with analytic intersection for five primitive types, plus lighting, shading and shadows, rendered via OpenGL.",
        },
      ],
    },
    {
      title: "Skills",
      skills: [
        { name: "Languages", items: "Python, C, C++, JavaScript, TypeScript, SQL" },
        {
          name: "Frameworks",
          items: "PyTorch, TensorFlow, scikit-learn, React, Next.js, Node.js, Flask, FastAPI",
        },
        { name: "Tools", items: "Docker, ROS, Git, OpenGL, NumPy, Pandas, SSH" },
        {
          name: "Research areas",
          items:
            "Visual navigation, 3D vision, visual place recognition, Gaussian splatting, robot planning",
        },
      ],
    },
  ],
};
