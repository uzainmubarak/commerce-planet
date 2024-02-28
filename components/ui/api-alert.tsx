"use client";

import { Copy, Server } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type Variant = "public" | "admin";
type Props = {
  title: string;
  description: string;
  variant: Variant;
};

const textMap: Record<Variant, string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<Variant, BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert: React.FC<Props> = ({
  title,
  description,
  variant = "public",
}) => {
  const { toast } = useToast();

  const onCopy = (description: string) => {
    navigator.clipboard?.writeText(description);
    toast({ title: "API copied to clipboard" });
  };

  return (
    <Alert>
      <Server size={16} />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="w-full sm:w-auto break-words relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button
          className="hidden sm:flex"
          variant="outline"
          size="icon"
          onClick={() => onCopy(description)}>
          <Copy size={16} />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
