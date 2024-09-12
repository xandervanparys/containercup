"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ContainerCup from "@/types/containercup";
import { ImageUpload } from "../image-upload/image-upload";
import { getSignedUrl, uploadImage } from "@/utils/supabase/storage/storage";
import { useUser } from "@/hooks/useUser";

interface ContainerCupPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (containerCup: ContainerCup) => void;
  initialData?: ContainerCup;
}

export default function ContainerCupPopup({
  isOpen,
  onClose,
  onSave,
  initialData,
}: ContainerCupPopupProps) {
  const [containerCup, setContainerCup] = useState<ContainerCup>({
    id: 1,
    name: "",
    description: "",
    image_url: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Store the selected file
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const user = useUser();

  useEffect(() => {
    if (initialData) {
      setContainerCup(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContainerCup((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file); // Store the selected file
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      console.error("User is not logged in");
      return;
    }

    let imageUrl = containerCup.image_url;

    if (selectedFile) {
      setIsUploading(true);
      try {
        const path = `images/${selectedFile.name}`;
        const bucket = "containercup-pictures";
        await uploadImage(selectedFile, path, bucket);
        // imageUrl = await getSignedUrl(path, bucket);
        imageUrl = path;
        setIsUploading(false);
      } catch (error) {
        setIsUploading(false);
        console.error("Error uploading image:", error);
        return;
      }
    }

    onSave({ ...containerCup, user_id: user.id, image_url: imageUrl });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {initialData ? "Edit Container Cup" : "Add Container Cup"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={containerCup.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={containerCup.description}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="image_url">Image</Label>
            <ImageUpload value={containerCup.image_url} onFileSelect={handleFileSelect} />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
