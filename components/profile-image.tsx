"use client"

import { CldImage } from "next-cloudinary"

interface ProfileImageProps {
  src: string
  alt: string
}

export function ProfileImage({ src, alt }: ProfileImageProps) {
  return (
    <CldImage
      src={src} 
      alt={alt} 
      width={1000}
      height={1000}
      crop="fill"
      gravity="face"
      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
    />
  )
}
