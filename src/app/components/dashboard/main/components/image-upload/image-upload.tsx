"use client"

import { useState } from "react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input, InputProps } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle, Upload } from "lucide-react"
import { getSignedUrl, uploadImage } from "@/utils/supabase/storage/storage"

type ImageUploadProps = {
    value: string;
    onChange: (newUrl: string) => void;
};

export function ImageUpload({ value, onChange }: ImageUploadProps) {
    const [file, setFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]
        if (selectedFile) {
            setFile(selectedFile)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string)
            }
            reader.readAsDataURL(selectedFile)
        }
    }

    const handleUpload = async () => {
        if (!file) return

        setUploadStatus('uploading')

        try {
            const path = `images/${file.name}`;
            const bucket = "containercup-pictures";
            await uploadImage(file, path, bucket);
            const url = await getSignedUrl(path, bucket);
            console.log('Image uploaded:', url);
            setUploadStatus('success');
            onChange(url);
        } catch (error) {
            setUploadStatus('error');
            console.error('Error uploading or retrieving image:', error);
        }

    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Image Upload</CardTitle>
                <CardDescription>
                    Choose an image file to upload
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="image">Select Image</Label>
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    {previewUrl && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                            <Image
                                src={previewUrl}
                                alt="Preview"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    )}
                    <Button
                        type="button"
                        className="w-full"
                        onClick={handleUpload}
                        disabled={!file || uploadStatus === 'uploading'}
                    >
                        {uploadStatus === 'uploading' ? (
                            <>
                                <Upload className="mr-2 h-4 w-4 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            'Upload Image'
                        )}
                    </Button>
                    {uploadStatus === 'success' && (
                        <Alert variant="default">
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertTitle>Success</AlertTitle>
                            <AlertDescription>
                                Your image was uploaded successfully.
                            </AlertDescription>
                        </Alert>
                    )}
                    {uploadStatus === 'error' && (
                        <Alert variant="destructive">
                            <XCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                There was a problem uploading your image. Please try again.
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}