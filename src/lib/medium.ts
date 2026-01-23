import { Blog } from "@/types/blog";


export async function getMediumBlogs(): Promise<Blog[]> {
    const username = process.env.MEDIUM_USERNAME || "27manavgandhi";
    if (!username) {
        return [];
    }

    try {
        console.log(`Fetching Medium feed for: ${username}`);
        const response = await fetch(`https://medium.com/feed/@${username}`, { next: { revalidate: 3600 } });

        if (!response.ok) {
            console.error(`Failed to fetch Medium feed: ${response.status} ${response.statusText}`);
            return [];
        }

        const xmlText = await response.text();
        console.log("Fetched Medium XML length:", xmlText.length);

        // Simple regex to extract items to avoid xml parser dependency issues
        const items = [];
        const itemRegex = /<item>([\s\S]*?)<\/item>/g;
        let match;

        while ((match = itemRegex.exec(xmlText)) !== null) {
            const itemContent = match[1];
            const titleMatch = itemContent.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || itemContent.match(/<title>(.*?)<\/title>/);
            const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
            const dateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/);
            const contentMatch = itemContent.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/);
            const categoryMatch = itemContent.matchAll(/<category><!\[CDATA\[(.*?)\]\]><\/category>/g);

            const tags = Array.from(categoryMatch).map(m => m[1]);

            // Extract image
            const imageMatch = contentMatch ? contentMatch[1].match(/<img[^>]+src="([^">]+)"/) : null;
            const image = imageMatch ? imageMatch[1] : "/images/blog/blog-1.png";

            items.push({
                title: titleMatch ? titleMatch[1] : "Untitled",
                description: "Click to read on Medium", // Simplified
                date: dateMatch ? new Date(dateMatch[1]).toISOString() : new Date().toISOString(),
                slug: linkMatch ? linkMatch[1] : "",
                image: image,
                tags: tags,
                isExternal: true,
                url: linkMatch ? linkMatch[1] : "",
            });
        }

        console.log(`Parsed ${items.length} Medium items with regex`);
        return items;

    } catch (error) {
        console.error("Error fetching Medium blogs:", error);
        return [];
    }
}
