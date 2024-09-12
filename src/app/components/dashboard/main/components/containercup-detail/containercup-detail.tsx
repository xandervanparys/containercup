'use client';
import {
    Ban,
    ChevronLeft,
    ChevronRight,
    CupSoda,
    Edit,
    MoreVertical,
    Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import { cupDetailProps } from "@/types/props/containercupsProps";
import { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContainerCup from "@/types/containercup";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getSignedUrl, uploadImage } from "@/utils/supabase/storage/storage";
import { Skeleton } from "@/components/ui/skeleton";
import { deleteContainerCup, updateContainerCup } from "@/utils/supabase/db";
import { ImageUpload } from "../image-upload/image-upload";
import { useUser } from "@/hooks/useUser";

export default function ContainerCupDetail({ selectedCup }: cupDetailProps) {
    if (selectedCup) {
        const [isEditing, setIsEditing] = useState<boolean>(false);
        const [signedUrl, setSignedUrl] = useState<string | null>(null);
        const [editedCup, setEditedCup] = useState<ContainerCup>(selectedCup);
        const [selectedFile, setSelectedFile] = useState<File | null>(null);

        const user = useUser();

        const updateDate: string = selectedCup?.updated_at?.split("T")[0] || "";
        const updateTime: string = selectedCup?.updated_at?.split("T")[1]?.split(".")[0] || "";

        useEffect(() => {
            if (selectedCup?.image_url) {
                getSignedUrl(selectedCup.image_url, "containercup-pictures")
                    .then((url) => setSignedUrl(url));
            }
        }, [selectedCup]);

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setEditedCup((prev) => ({ ...prev, [name]: value }));
        };

        const handleUpdate = async (e: React.FormEvent) => {
            e.preventDefault();
            if (!user) {
                console.error("User is not logged in");
                return;
            }

            let imageUrl = editedCup.image_url;

            if (selectedFile) {
                try {
                    const path = `images/${selectedFile.name}`;
                    const bucket = "containercup-pictures";
                    await uploadImage(selectedFile, path, bucket);
                    imageUrl = path;
                } catch (error) {
                    console.error("Error uploading image:", error);
                    return;
                }
            }

            try {
                await updateContainerCup(selectedCup.id, {
                    name: editedCup.name,
                    description: editedCup.description,
                    image_url: imageUrl,
                });
                console.log("Successfully edited:", selectedCup.name);
                setIsEditing(false);
            } catch (error) {
                console.error("Error updating container cup:", error);
            }
        };

        const handleFileSelect = (file: File | null) => setSelectedFile(file);

        const removeCup = async () => {
            deleteContainerCup(selectedCup.id).then(cup => console.log("removed cup: " + cup?.name));
        }


        return (
            <>
                <Card className="overflow-hidden h-full flex flex-col justify-between" x-chunk="dashboard-05-chunk-4">
                    <div>
                        <CardHeader className="flex flex-row items-start bg-muted/50">
                            <div className="grid gap-0.5">
                                <CardTitle className="group flex items-center gap-2 text-lg">
                                    {isEditing && 'Editing: '}{selectedCup.name}
                                </CardTitle>
                                <CardDescription>Last updated: {updateDate} at {updateTime}</CardDescription>
                            </div>
                            <div className="ml-auto flex items-center gap-1">
                                {isEditing && <Button size="sm" className="h-8 gap-1" onClick={handleUpdate}>Save Changes</Button>}
                                <Button onClick={() => setIsEditing(!isEditing)} size="sm" variant="outline" className="h-8 gap-1">
                                    {isEditing && <Ban className="h-3.5 w-3.5" />}
                                    {!isEditing && <Edit className="h-3.5 w-3.5" />}
                                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                        {isEditing ? 'Cancel' : 'Edit Cup'}
                                    </span>
                                </Button>
                                <Button onClick={() => removeCup()} size="sm" variant="outline" className="h-8 gap-1">
                                    <Trash className="h-3.5 w-3.5" />
                                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                        Remove
                                    </span>
                                </Button>
                                {/* <Button size="icon" variant="outline" className="h-8 w-8">
                                <Trash className="h-3.5 w-3.5" />
                            </Button> */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button size="icon" variant="outline" className="h-8 w-8">
                                            <MoreVertical className="h-3.5 w-3.5" />
                                            <span className="sr-only">More</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuItem>Export</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Trash</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 text-sm flex flex-col">
                            <div className="grid gap-3">
                                <div className="font-semibold">Cup Details</div>
                                {isEditing ? (
                                    <form onSubmit={handleUpdate} className="grid gap-3">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                            <Input
                                                id="name"
                                                name="name"
                                                value={editedCup.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                            <Textarea
                                                id="description"
                                                name="description"
                                                value={editedCup.description}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                    </form>
                                ) : (
                                    <ul className="grid gap-3">
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Name</span>
                                            <span>{editedCup.name}</span>
                                        </li>
                                        <li className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Description</span>
                                            <span>{editedCup.description}</span>
                                        </li>
                                    </ul>
                                )}
                            </div>
                            <Separator className="my-4" />
                            <div className="grid gap-3">
                                <div className="font-semibold">Cup Image</div>
                                <div className="flex justify-center">
                                    {isEditing ? (
                                        <div>
                                            <ImageUpload value={selectedCup.image_url} onFileSelect={handleFileSelect} />
                                        </div>
                                    ) :
                                        <>
                                            {signedUrl ?
                                                <Image
                                                    src={signedUrl}
                                                    alt={editedCup.name
                                                    }
                                                    width={200}
                                                    height={200}
                                                    className="rounded-md"
                                                /> :
                                                <Skeleton className="h-80 w-80" />
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid gap-3">
                                <div className="font-semibold">Additional Information</div>
                                <dl className="grid gap-3">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">ID</dt>
                                        <dd>{editedCup.id}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">User ID</dt>
                                        <dd>{editedCup.user_id || 'N/A'}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Created At</dt>
                                        <dd>{editedCup.created_at || 'N/A'}</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Updated At</dt>
                                        <dd>{editedCup.updated_at || 'N/A'}</dd>
                                    </div>
                                </dl>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid gap-3">
                                <div className="font-semibold">Cup Type</div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <CupSoda className="h-4 w-4" />
                                    Container Cup
                                </div>
                            </div>
                        </CardContent>
                    </div>
                    <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                        <div className="text-xs text-muted-foreground">
                            Updated <time dateTime="2023-11-23">{updateDate}</time>
                        </div>
                        <Pagination className="ml-auto mr-0 w-auto">
                            <PaginationContent>
                                <PaginationItem>
                                    <Button size="icon" variant="outline" className="h-6 w-6">
                                        <ChevronLeft className="h-3.5 w-3.5" />
                                        <span className="sr-only">Previous Order</span>
                                    </Button>
                                </PaginationItem>
                                <PaginationItem>
                                    <Button size="icon" variant="outline" className="h-6 w-6">
                                        <ChevronRight className="h-3.5 w-3.5" />
                                        <span className="sr-only">Next Order</span>
                                    </Button>
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </CardFooter>
                </Card>
            </>
        )
    } else {
        return (
            <div className="h-full">
                <Card className="overflow-hidden h-full flex items-center justify-center" x-chunk="dashboard-05-chunk-4">
                    <CardHeader className="flex flex-row items-center justify-center h-full w-full bg-muted/50">
                        <CardTitle className="text-lg">No cup selected</CardTitle>
                    </CardHeader>
                </Card>
            </div>
        );
    }
}
