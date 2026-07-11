import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitInquiry } from "@workspace/api-client-react";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  date: z.string().min(1, "Event date is required"),
  servings: z.string().min(1, "Please select guest count"),
  eventType: z.string().min(1, "Please select occasion"),
  details: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const InquiryForm = () => {
  const mutation = useSubmitInquiry();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      date: "",
      servings: "10-15 guests",
      eventType: "Wedding",
      details: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate({ data });
  };

  return (
    <div className="relative max-w-3xl mx-auto mt-24 mb-32 px-6">
      <div className="absolute inset-0 -m-6 bg-accent/20 rounded-[3rem] transform -rotate-1"></div>
      
      <div className="bg-card rounded-3xl p-8 md:p-14 shadow-2xl shadow-primary/5 border border-primary/10 relative z-10">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-3">Inquire for a Custom Creation</h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Let us bring your sweet vision to life. Share your details below, and we'll respond with our availability within 48 hours.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {mutation.isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="flex justify-center mb-6">
                <svg className="w-16 h-16 text-primary animate-pulse" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50,10 C25,10 10,25 10,50 C10,65 20,75 35,78 C30,60 40,40 50,30 C60,40 70,60 65,78 C80,75 90,65 90,50 C90,25 75,10 50,10 Z" />
                  <path d="M50,35 C45,45 35,55 40,70 C45,65 55,65 60,70 C65,55 55,45 50,35 Z" opacity="0.6"/>
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-primary mb-3">Inquiry Sweetly Received</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Thank you for considering Golden Rose Bakes. We look forward to speaking with you soon.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 md:space-y-8"
            >
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-semibold text-secondary/80">Full Name</label>
                  <input
                    {...form.register("name")}
                    className="w-full px-0 py-3 bg-transparent border-b-2 border-primary/10 focus:border-primary focus:outline-none transition-colors rounded-none placeholder:text-muted-foreground/50"
                    placeholder="Your lovely name"
                  />
                  {form.formState.errors.name && (
                    <span className="text-xs text-destructive">{form.formState.errors.name.message}</span>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-semibold text-secondary/80">Email Address</label>
                  <input
                    {...form.register("email")}
                    type="email"
                    className="w-full px-0 py-3 bg-transparent border-b-2 border-primary/10 focus:border-primary focus:outline-none transition-colors rounded-none placeholder:text-muted-foreground/50"
                    placeholder="hello@example.com"
                  />
                  {form.formState.errors.email && (
                    <span className="text-xs text-destructive">{form.formState.errors.email.message}</span>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-semibold text-secondary/80">Event Date</label>
                  <input
                    {...form.register("date")}
                    type="date"
                    className="w-full px-0 py-3 bg-transparent border-b-2 border-primary/10 focus:border-primary focus:outline-none transition-colors rounded-none text-foreground"
                  />
                  {form.formState.errors.date && (
                    <span className="text-xs text-destructive">{form.formState.errors.date.message}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-semibold text-secondary/80">Guest Count</label>
                  <select
                    {...form.register("servings")}
                    className="w-full px-0 py-3 bg-transparent border-b-2 border-primary/10 focus:border-primary focus:outline-none transition-colors rounded-none appearance-none"
                  >
                    <option value="10-15 guests">10-15 guests</option>
                    <option value="15-30 guests">15-30 guests</option>
                    <option value="30-60 guests">30-60 guests</option>
                    <option value="60+ tiers">60+ tiers</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-semibold text-secondary/80">Occasion Type</label>
                  <select
                    {...form.register("eventType")}
                    className="w-full px-0 py-3 bg-transparent border-b-2 border-primary/10 focus:border-primary focus:outline-none transition-colors rounded-none appearance-none"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Birthday Gâteau">Birthday Gâteau</option>
                    <option value="Corporate Gala">Corporate Gala</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold text-secondary/80">Design Notes & Flavours</label>
                <textarea
                  {...form.register("details")}
                  rows={4}
                  className="w-full px-4 py-4 bg-accent/30 border border-primary/10 focus:border-primary focus:bg-transparent rounded-2xl focus:outline-none transition-colors placeholder:text-muted-foreground/50 resize-none"
                  placeholder="Describe your vision, colour palette, or specific botanical elements..."
                />
              </div>

              {mutation.isError && (
                <div className="p-4 bg-destructive/10 text-destructive text-sm rounded-xl">
                  An error occurred submitting your inquiry. Please try again or contact us directly.
                </div>
              )}

              <button
                type="submit"
                disabled={mutation.isPending}
                className="w-full py-4 bg-secondary text-secondary-foreground font-medium rounded-2xl tracking-widest uppercase text-sm shadow-xl hover:bg-primary transition-all duration-300 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {mutation.isPending ? "Sending..." : "Submit Design Inquiry"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};