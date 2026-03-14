"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Loader2, Upload, X } from "lucide-react"
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
  const [isUploading, setIsUploading] = React.useState(false)
  const supabase = createClient()

  const onUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0]
      if (!file) return

      setIsUploading(true)

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}-${Date.now()}.${fileExt}`
      const filePath = `profile/${fileName}`

      const { error: uploadError, data } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath)

      onChange(publicUrl)
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Error uploading image. Please try again.")
    } finally {
      setIsUploading(false)
    }
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
          <div className="flex h-40 w-40 items-center justify-center rounded-2xl border-2 border-dashed border-muted-foreground/25 bg-muted/50 transition-colors hover:bg-muted/80">
            <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center space-y-2">
              <div className="rounded-full bg-background p-3 shadow-sm">
                {isUploading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                ) : (
                  <Upload className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {isUploading ? "Uploading..." : "Upload Photo"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onUpload}
                disabled={isUploading}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  )
}
