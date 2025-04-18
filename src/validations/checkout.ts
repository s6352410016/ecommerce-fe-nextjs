import { z } from "zod";

export const CheckOutFields = z.object({
    shippingAddress: z.string().trim().min(1, "Shipping address is required"),
    phone: z.string().trim().min(1, "Phone is required"),
    email: z.string().trim().min(1, "Email is required").email("Invalid email address"),
});