import Image from "next/image";
import { client, urlFor } from "./lib/sanity";
import { simpleBlogCard } from "./lib/interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const revalidate = 30;

const getData=async()=>{
  const querry = `
  *[_type=='blog'] | order(_createdAt desc){
    title, smallDescription,
      titleImage,
      "currentSlug":slug.current
  }`
  const data:simpleBlogCard[] = await client.fetch(querry);
  return data;
}
export default async function Home() {
  const data = await getData();
  console.log(data);
  return (
   <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-2">
    {
      data.map((item, idx) => {
        return (
          <Card key={idx}>
            <CardHeader>
              <Image
                src={urlFor(item.titleImage).url() as string}
                alt="title"
                width={200}
                height={200}
                className="object-cover rounded-t-lg h-[200px] w-full"
              />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg line-clamp-2 font-bold">{item.title}</CardTitle>
              <CardDescription className="line-clamp-3 text-gray-600 text-sm dark:text-gray-300">
                {item.smallDescription}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
              <Link href={`/blog/${item.currentSlug}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        );
      })
    }
   </div>
  );
}
