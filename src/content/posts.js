export const posts = [
    {
        id: "post-1",
        title: "Lion's Mane Cultivation Protocols",
        category: "mycology",
        date: "2024-10-12",
        clearance: "UNCLASSIFIED",
        size: "4.2 MB",
        excerpt: "Standard operating procedures for substrate sterilization and spawn inoculation of Hericium erinaceus.",
        tags: ["Mycology", "Bio Lab", "Protocols"],
        coverImage: "/homepage_info.png",
        contentHtml: `
            <h3>Objective</h3>
            <p>Establish a reliable protocol for home cultivation of Lion's Mane mushrooms.</p>
            <h3>Materials</h3>
            <ul>
                <li>Hardwood pellets</li>
                <li>Wheat bran</li>
                <li>5lb Myco bags</li>
                <li>Liquid culture (Lion's Mane)</li>
            </ul>
            <h3>Procedure</h3>
            <ol>
                <li><strong>Substrate Prep:</strong> Mix 5 cups pellets, 1 cup bran, 6 cups water.</li>
                <li><strong>Sterilization:</strong> Pressure cook at 15 PSI for 120 minutes.</li>
                <li><strong>Inoculation:</strong> In front of a flow hood, inject 5cc of liquid culture.</li>
                <li><strong>Incubation:</strong> Store at 75°F in darkness for 14-21 days.</li>
            </ol>
            <figure>
                <img src="/homepage_whatido.png" alt="Lab station" />
                <figcaption>Field notes archive snapshot.</figcaption>
            </figure>
        `
    },
    {
        id: "post-2",
        title: "Agentic Workflows in LLM Architectures",
        category: "ai",
        date: "2024-11-01",
        clearance: "RESTRICTED",
        size: "12.8 MB",
        excerpt: "Analyzing the shift from linear prompting to recursive agent loops and tool-use capabilities.",
        tags: ["AI", "Agents", "Research"],
        coverImage: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1600&auto=format&fit=crop",
        contentHtml: `
            <h3>Executive Summary</h3>
            <p>The next frontier of AI isn't larger models, but smarter loops.</p>
            <h3>Key Concepts</h3>
            <ul>
                <li><strong>ReAct Pattern:</strong> Synergizing reasoning and acting.</li>
                <li><strong>Tool Use:</strong> Giving models access to APIs and calculators.</li>
                <li><strong>Memory:</strong> Implementing long-term vector storage for context persistence.</li>
            </ul>
            <figure>
                <video controls poster="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop">
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-in-light-4841-large.mp4" type="video/mp4" />
                </video>
                <figcaption>Agent loop simulation clip.</figcaption>
            </figure>
        `
    },
    {
        id: "post-3",
        title: "Custom Silent Server Array",
        category: "diy",
        date: "2024-09-15",
        clearance: "UNCLASSIFIED",
        size: "1.5 MB",
        excerpt: "Declassified specs for the home server rack built into a sound-dampened mahogany cabinet.",
        tags: ["DIY", "Hardware", "Build Log"],
        coverImage: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?q=80&w=1600&auto=format&fit=crop",
        contentHtml: `
            <h3>Overview</h3>
            <p>Building a server rack that doesn't sound like a jet engine.</p>
            <h3>Components</h3>
            <ul>
                <li>4x Raspberry Pi 5</li>
                <li>1x 8-port PoE Switch</li>
                <li>Acoustic foam padding (1-inch)</li>
                <li>Noctua 120mm fans for exhaust</li>
            </ul>
        `
    }
];
