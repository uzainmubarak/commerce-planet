import * as z from "zod";

export const ProductSchema = z.object({
  name: z.string().nonempty("Product name is required"),
  description: z.string(),
  price: z.number(),
  stock: z.optional(z.number()),
  image: z.array(z.object({ url: z.string() })),
  // variants: z.optional(
  //   z.array(
  //     z.object({
  //       name: z.string(),
  //       value: z.string(),
  //     })
  //   )
  // ),
});

export type ProductType = z.infer<typeof ProductSchema>;
