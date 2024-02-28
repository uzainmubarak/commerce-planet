"use client";

import { Store } from "@prisma/client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import AlertModal from "@/components/modal/alert-modal";
import ApiAlert from "@/components/ui/api-alert";
import useOrigin from "@/hooks/use-origin";

type Props = {
  initialData: Store;
};

const Schema = z.object({
  name: z.string().min(1),
});

type FormValues = z.infer<typeof Schema>;

const SettingForm: React.FC<Props> = ({ initialData }) => {
  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false);

  const params = useParams();
  const router = useRouter();
  const {origin, loadingOrigin} = useOrigin()

  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setloading(true);
      await axios.patch(`/api/store/${params.storeId}`, data);
      router.refresh();
      toast({ title: `Store name updated to ${data.name}` });
    } catch (error) {
      toast({ title: "Something went wrong" });
    } finally {
      setloading(false);
    }
  };

  const onDelete = async () => {
    try {
      setloading(true);
      await axios.delete(`/api/store/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast({ title: `Store deleted` });
    } catch (error) {
      toast({ title: "Something went wrong" });
    } finally {
      setloading(false);
      setopen(false);
    }
  };

  return (
    <>
      <AlertModal
        open={open}
        onClose={() => setopen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage your store settings" />
        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setopen(true)}>
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Change Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        variant="public"
        description={loadingOrigin ? "Loading Api key..." : `${origin}/api/${params.storeId}`}
      />
    </>
  );
};

export default SettingForm;
