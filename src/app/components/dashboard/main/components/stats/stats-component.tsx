import {
  Card, CardDescription,
  CardFooter,
  CardHeader,
  CardContent,
  CardTitle
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatsComponentProps } from "@/types/props/statProps";

export default function StatsComponent(props: StatsComponentProps) {
    return (
        <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>{props.Period}</CardDescription>
              <CardTitle className="text-4xl flex items-baseline gap-3">{props.Total} <div className="text-sm">new players</div></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +{props.Increase}% from last {props.Period.toLowerCase()}
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={props.Increase} aria-label="{props.Increase}% increase" />
            </CardFooter>
          </Card>
    );
}