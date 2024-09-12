
import {
  TooltipProvider
} from "@/components/ui/tooltip";
import Navigation from "./navigation/navigation";
import Header from "./header/header";
import Main from "./main/main";

export const description =
  "An orders dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. The main area has a list of recent orders with a filter and export button. The main area also has a detailed view of a single order with order details, shipping information, billing information, customer information, and payment information.";

export function Dashboard() {
  
    return (
      <TooltipProvider>
        <div className="flex min-h-screen w-full h-full flex-col bg-muted/40">
          <Navigation />
          <div className="flex flex-col h-full sm:gap-4 sm:py-4 sm:pl-14">
            <Header />
            <Main />
          </div>
        </div>
      </TooltipProvider>
    );
  }