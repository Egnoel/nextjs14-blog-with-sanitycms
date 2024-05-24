import { fullBlog, simpleBlogCard } from '@/app/lib/interface';
import { client, urlFor } from '@/app/lib/sanity';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import React from 'react'

export const revalidate = 30;

const getData=async(slug:string)=>{
    const querry = `
    *[_type=='blog' && slug.current =='${slug}']{
        "currentSlug":slug.current,
          title,
          content,
          titleImage
      }[0]`
    const data:fullBlog = await client.fetch(querry);
    return data;
  }

const page = async({params}:{params:{slug:string}}) => {
    const data:fullBlog = await getData(params.slug);
    console.log(data);
  return (
    <div className='mt-8'>
        <h1>
            <span className='block text-base text-center text-primary font-semibold tracking-wide uppercase'>Egnoel Blog</span>
            <span className='mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl'>
                {data.title}
            </span>
        </h1>
        <Image src={urlFor(data.titleImage).url() as string} alt='blog image' width={600} height={600} priority className='object-cover rounded-lg border' />
        <div className='mt-16 prose prose-blue prose-xl dark:prose-invert prose-li:marker:text-primary mb-8'>
            <PortableText value={data.content} />
        </div>
    </div>
  )
}

export default page