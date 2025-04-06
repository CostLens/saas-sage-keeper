import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, ExternalLink, Copy, CheckCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { cn, formatCurrency } from "@/lib/utils";
import { AppDiscoveryData } from "@/hooks/useAppDiscoveryData";
import { UsersTab } from "./details/UsersTab";

interface AppDetailsDialogProps {
  app: AppDiscoveryData | null;
  isOpen: boolean;
  onClose: () => void;
  source: "discovery" | "usage";
}

export function AppDetailsDialog({ app, isOpen, onClose, source }: AppDetailsDialogProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    if (app?.website) {
      navigator.clipboard.writeText(app.website);
      setCopied(true);
      toast({
        title: "Website URL copied!",
        description: "The application website URL has been copied to your clipboard.",
      });

      // Revert back to the copy icon after a short delay
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  if (!app) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between w-full">
            <div>
              <DialogTitle>{app.name}</DialogTitle>
              <DialogDescription>{app.description}</DialogDescription>
            </div>
            <DialogClose asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="md:grid md:grid-cols-2 gap-4 py-4">
          {/* Left Column */}
          <div className="space-y-4">
            <Card>
              <CardContent className="flex flex-col space-y-2">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`https://avatar.vercel.sh/${app.name}.png`} alt={app.name} />
                    <AvatarFallback>{app.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">{app.name}</h4>
                    <p className="text-xs text-muted-foreground">{app.category}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge>{app.status}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" forceMount>
                      <DropdownMenuItem
                        onClick={handleCopyClick}
                        disabled={copied || !app.website}
                      >
                        {copied ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Website
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled={!app.website}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        <a href={app.website} target="_blank" rel="noopener noreferrer">
                          Visit Website
                        </a>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-3">
                <h4 className="text-sm font-semibold">Usage Statistics</h4>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">Average Usage</p>
                    <span className="text-xs font-medium">{app.averageUsage}%</span>
                  </div>
                  <Progress value={app.averageUsage} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Active Users</p>
                    <span className="text-sm font-medium">{app.activeUsers}</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Licenses</p>
                    <span className="text-sm font-medium">{app.totalLicenses}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-3">
                <h4 className="text-sm font-semibold">Cost Overview</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Cost per Year</p>
                    <span className="text-sm font-medium">{formatCurrency(app.costPerYear)}</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Payments</p>
                    <span className="text-sm font-medium">{formatCurrency(app.totalPayments)}</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Cost to Date</p>
                    <span className="text-sm font-medium">{formatCurrency(app.costToDate)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <Card>
              <CardContent className="space-y-3">
                <h4 className="text-sm font-semibold">Application Details</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Publisher</p>
                    <span className="text-sm font-medium">{app.publisher}</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">First Purchased</p>
                    <span className="text-sm font-medium">
                      {new Date(app.firstPurchased).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Last Used</p>
                    <span className="text-sm font-medium">{app.lastUsed}</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Renewal Date</p>
                    <span className="text-sm font-medium">{app.renewalDate}</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Owner</p>
                    <span className="text-sm font-medium">{app.owner}</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Departments</p>
                    <span className="text-sm font-medium">{app.departments.join(", ")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <UsersTab app={app} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
