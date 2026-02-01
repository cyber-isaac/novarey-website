
// Simulated DB Adapter
// Uses localStorage to persist data in the browser
import { posts as CONTENT_POSTS } from '../content/posts';

const TAGS = [
    { name: "SaaS", color: "bg-blue-500/20 text-blue-400" },
    { name: "Fintech", color: "bg-purple-500/20 text-purple-400" },
    { name: "CleanTech", color: "bg-emerald-500/20 text-emerald-400" },
    { name: "DeepTech", color: "bg-orange-500/20 text-orange-400" },
    { name: "Consumer", color: "bg-pink-500/20 text-pink-400" }
];

const INITIAL_DATA = {
    leads: [
        { id: 1, name: "Nexus AI", tag: "SaaS", tagColor: "bg-blue-500/20 text-blue-400", val: "$2M" },
        { id: 2, name: "GreenLoop", tag: "CleanTech", tagColor: "bg-emerald-500/20 text-emerald-400", val: "$1.5M" }
    ],
    diligence: [
        { id: 3, name: "Orbit Finance", tag: "Fintech", tagColor: "bg-purple-500/20 text-purple-400", val: "$4M" }
    ],
    portfolio: [
        { id: 4, name: "HyperSpace", tag: "DeepTech", tagColor: "bg-orange-500/20 text-orange-400", val: "$10M" }
    ]
};



export const db = {
    getDeals: () => {
        const stored = localStorage.getItem('novarey_deals');
        if (!stored) {
            localStorage.setItem('novarey_deals', JSON.stringify(INITIAL_DATA));
            return INITIAL_DATA;
        }
        return JSON.parse(stored);
    },

    saveDeal: (column, deal) => {
        const data = db.getDeals();
        if (!data[column]) data[column] = [];
        if (!deal.id) deal.id = Date.now();
        data[column].push(deal);
        localStorage.setItem('novarey_deals', JSON.stringify(data));
        return data;
    },

    getPosts: () => {
        return CONTENT_POSTS;
    },

    getPostById: (id) => {
        const posts = db.getPosts();
        return posts.find(p => p.id === id);
    },

    moveDeal: (dealId, fromCol, toCol) => {
        const data = db.getDeals();
        const dealIndex = data[fromCol].findIndex(d => d.id === dealId);
        if (dealIndex === -1) return data;
        const [deal] = data[fromCol].splice(dealIndex, 1);
        data[toCol].push(deal);
        localStorage.setItem('novarey_deals', JSON.stringify(data));
        return data;
    },

    getRandomTag: () => TAGS[Math.floor(Math.random() * TAGS.length)]
};
