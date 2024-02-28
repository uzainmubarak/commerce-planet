"use client";

import { Product } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import axios from "axios";

import { ProductType, ProductSchema } from "@/schema/product-schema";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

type Props = {
  initialData: Product | null;
};

const ProductForm: React.FC<Props> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isStock, setIsStock] = useState(true);

  const form = useForm<ProductType>({
    resolver: zodResolver(ProductSchema),
    
      defaultValues: initialData ? initialData : {
        name: "",
        description: "",
        price: 0,
        stock: 0,
        image: [],
      },
    });

  const title = initialData ? "Edit Product" : "Add New Product";
  const description = initialData
    ? "Edit your product"
    : "Create a new product";
  const toastMessage = initialData
    ? "Product updated successfully"
    : "Product created successfully";
  const action = initialData ? "Update" : "Create";

  const onSubmit = async (data: ProductType) => {
    console.log(data);
    // try {
    //   setLoading(true);
    //   if (!initialData) {
    //     await axios.post(`/api/${params.storeId}/products`, data);
    //   } else {
    //     await axios.patch(
    //       `/api/${params.storeId}/products/${params.productId}`,
    //       data
    //     );
    //   }
    //   router.refresh();
    //   router.push(`/${params.storeId}/products`);
    //   toast({
    //     title: toastMessage,
    //   });
    // } catch (error: any) {
    //   toast({
    //     title: "Error",
    //     description: error.message,
    //     variant: "destructive",
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast({
        title: "Product deleted successfully",
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
            name="image"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((img) => img.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Products description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              name="stock"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    <span>Stock</span>
                    <Switch
                      checked={isStock}
                      onCheckedChange={(e) => setIsStock(e)}
                    />
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading || !isStock}
                      placeholder="Stock"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button disabled={loading} type="submit" className="ml-auto">
            {action} Product
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
