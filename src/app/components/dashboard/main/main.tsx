import {
  Card,
  CardContent, CardHeader
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs } from "@/components/ui/tabs";
import { useUser } from "@/hooks/useUser";
import ContainerCup from "@/types/containercup";
import { createContainerCup, getContainerCups } from "@/utils/containerCupAPI";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CreateNew from "./components/create-new/create-new";
import Stats from "./components/stats/main-stats";
import { ImageUpload } from "./components/image-upload/image-upload";
import ContainerCupList from "./components/containercup-list/containercup-list";
import ContainerCupDetail from "./components/containercup-detail/containercup-detail";
import ContainerCupPopup from "./components/containercup-popup/containercup-popup";

export default function Main() {
  const [containerCups, setContainerCups] = useState<ContainerCup[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const userId = useUser()?.id || "";
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handleSave = (containerCup: ContainerCup) => {
    console.log("before post: " + JSON.stringify(containerCup));
    createContainerCup(containerCup).then(cup => console.log("cup returned: " + cup));
    setLoading(true);
  }

  useEffect(() => {
    if (userId) {
      getContainerCups(userId)
        .then((cups) => setContainerCups(cups))
        .finally(() => setLoading(false));
    }
  }, [userId, loading]);


  if (loading)
    return (
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Skeleton className="h-32 sm:col-span-2" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
          <Tabs defaultValue="week">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-full mt-4" />
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
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
                    {[...Array(5)].map((_, index) => (
                      <TableRow className="bg-accent" key={index}>
                        <TableCell>
                          <Skeleton className="h-4 w-24" />
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Skeleton className="h-4 w-48" />
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Skeleton className="h-4 w-16" />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Skeleton className="h-4 w-32" />
                        </TableCell>
                        <TableCell className="text-right">
                          <Skeleton className="h-4 w-16" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Tabs>
        </div>
        <div>
          <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-8" />
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/4" />
            </CardContent>
          </Card>
        </div>
      </main>
    );

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <CreateNew setIsPopupOpen={setIsPopupOpen} />
          <Stats />
        </div>
        <ContainerCupList setIsPopupOpen={setIsPopupOpen} containercups={containerCups} />
      </div>
      <ContainerCupPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSave={handleSave}
      />
      <ContainerCupDetail />
    </main>
  );
}
