import { Button } from "@/components/ui/button";
import {
    Card, CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

export default function CreateNew() {
    return (
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
                <CardTitle>Your Cups</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Create, update, remove and enjoy your competitions.
                    To the right you have some stats.
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button>Create New Container Cup</Button>
            </CardFooter>
        </Card>
    );
}