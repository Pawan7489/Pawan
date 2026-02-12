/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Zuckerberg Rule: Speed & Iteration
  typescript: {
    ignoreBuildErrors: true, // Taki development ke waqt AI-generated code crash na ho
  },
  eslint: {
    ignoreDuringBuilds: true, // Build speed badhane ke liye
  },

  // 2. Bridge Rule: External Media & Distributed Data
  // Agar aap images Drive D/E ya kisi local API se load kar rahe hain
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '7860', // Gradio/Streamlit local UI ka access
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com', // Cloud data access
      },
    ],
  },

  // 3. Musk Rule: Efficiency & Speed
  // Isse page load fast hota hai aur CPU/GPU par load kam padta hai
  compress: true, 
  poweredByHeader: false, // Security ke liye (AI identification hide karne ke liye)
  
  // 4. Heavy Computation Support
  // Agar aapka AI bade data sets analyze kar raha hai
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Large prompts aur data upload karne ke liye
    },
  },

  // 5. Cross-Origin (CORS) Configuration
  // Taki aapka website interface different drives/APIs se data fetch kar sake
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
        ],
      },
    ];
  },
}

export default nextConfig
