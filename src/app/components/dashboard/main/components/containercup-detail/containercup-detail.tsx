import {
    ChevronLeft,
    ChevronRight, CreditCard, Edit, MoreVertical, Trash
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
import { useState } from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function ContainerCupDetail({ selectedCup }: cupDetailProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    if (selectedCup) {
        const updateDate: string = selectedCup.updated_at?.split("T")[0] || "";
        const updateTime: string = selectedCup.updated_at?.split("T")[1].split(".")[0] || "";
        return (
            <>
                <Card className="overflow-hidden h-full flex flex-col justify-between" x-chunk="dashboard-05-chunk-4">
                    <div>
                        <CardHeader className="flex flex-row items-start bg-muted/50">
                            <div className="grid gap-0.5">
                                <CardTitle className="group flex items-center gap-2 text-lg">
                                    {selectedCup.name}
                                </CardTitle>
                                <CardDescription>Last updated: {updateDate} at {updateTime}</CardDescription>
                            </div>
                            <div className="ml-auto flex items-center gap-1">
                                <Button size="sm" variant="outline" className="h-8 gap-1">
                                    <Edit className="h-3.5 w-3.5" />
                                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                                        Edit Cup
                                    </span>
                                </Button>
                                <Button size="sm" variant="outline" className="h-8 gap-1">
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
                                <div className="font-semibold">Order Details</div>
                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            Glimmer Lamps x <span>2</span>
                                        </span>
                                        <span>$250.00</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">
                                            Aqua Filters x <span>1</span>
                                        </span>
                                        <span>$49.00</span>
                                    </li>
                                </ul>
                                <Separator className="my-2" />
                                <ul className="grid gap-3">
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>$299.00</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span>$5.00</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Tax</span>
                                        <span>$25.00</span>
                                    </li>
                                    <li className="flex items-center justify-between font-semibold">
                                        <span className="text-muted-foreground">Total</span>
                                        <span>$329.00</span>
                                    </li>
                                </ul>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                    <div className="font-semibold">Shipping Information</div>
                                    <address className="grid gap-0.5 not-italic text-muted-foreground">
                                        <span>Liam Johnson</span>
                                        <span>1234 Main St.</span>
                                        <span>Anytown, CA 12345</span>
                                    </address>
                                </div>
                                <div className="grid auto-rows-max gap-3">
                                    <div className="font-semibold">Billing Information</div>
                                    <div className="text-muted-foreground">
                                        Same as shipping address
                                    </div>
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid gap-3">
                                <div className="font-semibold">Customer Information</div>
                                <dl className="grid gap-3">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Customer</dt>
                                        <dd>Liam Johnson</dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Email</dt>
                                        <dd>
                                            <a href="mailto:">liam@acme.com</a>
                                        </dd>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <dt className="text-muted-foreground">Phone</dt>
                                        <dd>
                                            <a href="tel:">+1 234 567 890</a>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                            <Separator className="my-4" />
                            <div className="grid gap-3">
                                <div className="font-semibold">Payment Information</div>
                                <dl className="grid gap-3">
                                    <div className="flex items-center justify-between">
                                        <dt className="flex items-center gap-1 text-muted-foreground">
                                            <CreditCard className="h-4 w-4" />
                                            Visa
                                        </dt>
                                        <dd>**** **** **** 4532</dd>
                                    </div>
                                </dl>
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
        )
    }
}