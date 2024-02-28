"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

import Modal from "@/components/ui/modal/modal";
import { useStoreModel } from "@/hooks/use-store-model";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Schema = z.object({
  name: z.string().min(1, "Store name is required"),
});

type FormData = z.infer<typeof Schema>;

const StoreModal = () => {
  const storeModal = useStoreModel();
  const [loading, setLoading] = React.useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      setLoading(true);
      const res = await axios.post("/api/store", data);
      const storeId = res.data.id;

      window.location.assign(`/${storeId}`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create your store"
      description="Name your store and start selling!"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={loading}
                      placeholder="E-Commerce"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button
                disabled={loading}
                variant="outline"
                onClick={storeModal.onClose}>
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default StoreModal;
