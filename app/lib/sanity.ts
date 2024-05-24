import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
    projectId: "tvpzjrev",
    dataset: "production",
    apiVersion: "2023-05-03",
    useCdn:false
});

const builder = imageUrlBuilder(client);
export const urlFor = (source:any)=>builder.image(source);