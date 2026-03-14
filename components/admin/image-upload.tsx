"use client"

import * as React from "react"
import { CldUploadWidget } from "next-cloudinary"
import { Button } from "@/components/ui/button"
import { ImagePlus, Trash, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove: () => void
  className?: string
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  className
}: ImageUploadProps) {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  return (
    <div className={cn("space-y-4 w-full", className)}>
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative h-40 w-40 overflow-hidden rounded-2xl border bg-muted">
            <img
              src={value}
              alt="Upload"
              className="h-full w-full object-cover"
            />
            <button
              onClick={onRemove}
              type="button"
              className="absolute right-2 top-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm hover:opacity-80 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <CldUploadWidget 
            onSuccess={onUpload} 
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "portfolio_unsigned"}
            options={{
              maxFiles: 1,
              folder: "portfolio_uploads"
            }}
          >
            {({ open }) => {
              const onClick = () => {
                open()
              }

              return (
                <div 
                  onClick={onClick}
                  className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center space-y-2 rounded-2xl border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted/80"
                >
                  <div className="rounded-full bg-background p-3 shadow-sm">
                    <ImagePlus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    Upload Photo
                  </span>
                </div>
              )
            }}
          </CldUploadWidget>
        )}
      </div>
    </div>
  )
}
