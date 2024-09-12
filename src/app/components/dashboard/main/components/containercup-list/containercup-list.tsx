import {
    CirclePlus, File,
    ListFilter
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription, CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent, DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { containercupsProps } from "@/types/props/containercupsProps";
import ContainerCup from "@/types/containercup";
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";


export default function ContainerCupList(props: containercupsProps) {
    const [cups, setCups] = useState<ContainerCup[]>([]);

    const openPopup = () => {
        props.setIsPopupOpen(true);
    }

    useEffect(() => {
        setCups(props.containercups);
    }, [props.containercups]);

    return (
        <div>
            <div className="flex items-center">
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-7 gap-1 text-sm"
                            >
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only">Filter</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked>
                                Fulfilled
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Export</span>
                    </Button>
                    <Button onClick={() => openPopup()} size="sm" variant="outline" className="h-7 gap-1 text-sm">
                        <CirclePlus className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Add cup</span>
                    </Button>
                </div>
            </div>
            <Card className="mt-2" x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                    <CardTitle>Container Cups</CardTitle>
                    <CardDescription>An overview of your cups.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Description
                                </TableHead>
                                <TableHead className="hidden sm:table-cell">Id</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    image url
                                </TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cups.map((cup: ContainerCup) => (
                                <TableRow className="bg-accent" key={cup.id}>
                                    <TableCell>
                                        <div className="font-medium">{cup.name}</div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {cup.description}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge className="text-xs" variant="secondary">
                                            {cup.id}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {
                                            cup.image_url.length > 40 ? <Tooltip>
                                                <TooltipTrigger>
                                                    {cup.image_url.slice(0, 40) + '...'}
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    {cup.image_url}
                                                </TooltipContent>
                                            </Tooltip>
                                                : cup.image_url
                                        }
                                    </TableCell>
                                    <TableCell className="text-right">$250.00</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}