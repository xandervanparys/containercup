import { StatsComponentProps } from "@/types/props/statProps";
import StatsComponent from "./stats-component";


export default function Stats() {
    return (
        <>
            <StatsComponent Period="Week" Total={1200} Increase={50} />
            <StatsComponent Period="Month" Total={2445} Increase={22} />
        </>
    )
}