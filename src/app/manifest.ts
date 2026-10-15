import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "NoteHub",
        short_name: "NoteHub",
        description: "Seu bloco de notas social.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        icons: [
            { src: "/imgs/favicon192.png", sizes: "192x192", type: "image/png", purpose: "any" },
            { src: "/imgs/favicon512.png", sizes: "512x512", type: "image/png", purpose: "any" },
            { src: "/imgs/maskable192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
            { src: "/imgs/maskable512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
    }
}