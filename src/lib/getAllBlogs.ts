import glob from "fast-glob";
import * as path from "path";
import { getMediumBlogs } from "./medium";

async function importBlog(blogFileNames: any) {
    let { meta, default: component } = await import(
        `src/app/blog/${blogFileNames}`
    );
    return {
        slug: blogFileNames.replace(/(\/content)?\.mdx$/, ""),
        ...meta,
        component,
        isExternal: false,
    };
}

export async function getAllBlogs() {
    let blogFileNames = await glob(["*.mdx", "*/content.mdx"], {
        cwd: path.join(process.cwd(), "src/app/blog"),
    });

    let blogs = await Promise.all(blogFileNames.map(importBlog));
    console.log(`Local blogs found: ${blogs.length}`);

    const mediumBlogs = await getMediumBlogs();
    console.log(`Medium blogs found: ${mediumBlogs.length}`);

    const allBlogs = [...blogs, ...mediumBlogs];
    console.log(`Total blogs returned: ${allBlogs.length}`);

    return allBlogs.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
    });
}
