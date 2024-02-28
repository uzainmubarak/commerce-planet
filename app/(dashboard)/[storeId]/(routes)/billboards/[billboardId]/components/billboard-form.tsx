"use client";

import { Billboard } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import axios from "axios";

import AlertModal from "@/components/modal/alert-modal";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ui/image-upload";
import { useToast } from "@/components/ui/use-toast";

const Schema = z.object({
  label: z.string().nonempty("Label is required"),
  imageUrl: z.string().nonempty(),
});

type FormValues = z.infer<typeof Schema>;

type Props = {
  initialData: Billboard | null;
};

const BillboardForm: React.FC<Props> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const title = initialData ? "Edit Billboard" : "New Billboard";
  const description = initialData
    ? "Edit your billboard"
    : "Create a new billboard";
  const toastMessage = initialData
    ? "Billboard updated successfully"
    : "Billboard created successfully";
  const action = initialData ? "Update" : "Create";

  const onSubmit = async (data: FormValues) => {
    try {
      console.log(data)
      setLoading(true);
      if (!initialData) {
        await axios.post(
          `/api/${params.storeId}/billboards`,
          data
        );
      } else {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      }
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast({
        title: toastMessage,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast({
        title: "Billboard deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        open={open}
        onClose={() => setOpen(false)}
        loading={loading}
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}>
            <Trash size="16" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full">
          <FormField
            name="imageUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              name="label"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit" className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default BillboardForm;
