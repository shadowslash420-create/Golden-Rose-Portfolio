import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitInquiry } from "@workspace/api-client-react";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(8, "رقم الهاتف مطلوب"),
  date: z.string().min(1, "تاريخ المناسبة مطلوب"),
  quantity: z.string().min(1, "الكمية مطلوبة"),
  orderType: z.string().min(1, "نوع الطلبية مطلوب"),
  details: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const inputClass =
  "w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white transition text-stone-800 placeholder:text-stone-400";

const labelClass = "block text-xs font-bold text-stone-500 mb-2 tracking-wide";

export const InquiryForm = () => {
  const mutation = useSubmitInquiry();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      date: "",
      quantity: "أقل من 50 حبة",
      orderType: "حلويات الأعراس والمهيبة",
      details: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate({ data });
  };

  return (
    <div className="relative max-w-3xl mx-auto px-6" dir="rtl">
      <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl shadow-rose-100/50 border border-rose-100 relative z-10">

        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-amber-950 mb-3">حجز طلبية جديدة</h2>
          <p className="text-stone-500 text-sm max-w-md mx-auto leading-relaxed">
            يسعدنا مشاركتكم مناسباتكم السعيدة. سيتواصل معكم الـ Admin عبر الهاتف لتأكيد التفاصيل.
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
              <svg className="w-16 h-16 text-rose-400 mx-auto mb-6 animate-pulse" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50,10 C25,10 10,25 10,50 C10,65 20,75 35,78 C30,60 40,40 50,30 C60,40 70,60 65,78 C80,75 90,65 90,50 C90,25 75,10 50,10 Z" />
                <path d="M50,35 C45,45 35,55 40,70 C45,65 55,65 60,70 C65,55 55,45 50,35 Z" opacity="0.6"/>
              </svg>
              <h3 className="font-serif text-2xl text-rose-800 mb-3">تم إرسال طلبكم بنجاح!</h3>
              <p className="text-stone-500 max-w-sm mx-auto text-sm leading-relaxed">
                سنتحقق من جدول الحجوزات ونتصل بكم في أقرب وقت ممكن لتأكيد تفاصيل الحلوى والسعر.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>الاسم الكامل</label>
                  <input
                    {...form.register("name")}
                    data-testid="input-name"
                    className={inputClass}
                    placeholder="اسمك الكريم"
                  />
                  {form.formState.errors.name && (
                    <span className="text-xs text-rose-600 mt-1 block">{form.formState.errors.name.message}</span>
                  )}
                </div>
                <div>
                  <label className={labelClass}>رقم الهاتف (للتواصل السريع)</label>
                  <input
                    {...form.register("phone")}
                    data-testid="input-phone"
                    type="tel"
                    className={inputClass}
                    placeholder="05xxxxxxxx"
                  />
                  {form.formState.errors.phone && (
                    <span className="text-xs text-rose-600 mt-1 block">{form.formState.errors.phone.message}</span>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className={labelClass}>تاريخ المناسبة</label>
                  <input
                    {...form.register("date")}
                    data-testid="input-date"
                    type="date"
                    className={inputClass}
                  />
                  {form.formState.errors.date && (
                    <span className="text-xs text-rose-600 mt-1 block">{form.formState.errors.date.message}</span>
                  )}
                </div>
                <div>
                  <label className={labelClass}>الكمية التقريبية</label>
                  <select
                    {...form.register("quantity")}
                    data-testid="select-quantity"
                    className={inputClass}
                  >
                    <option value="أقل من 50 حبة">أقل من 50 حبة</option>
                    <option value="50 - 100 حبة">50 - 100 حبة</option>
                    <option value="100 - 200 حبة">100 - 200 حبة</option>
                    <option value="أكثر من 200 حبة">أكثر من 200 حبة (عرس/حفلة كبيرة)</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>نوع الطلبية</label>
                  <select
                    {...form.register("orderType")}
                    data-testid="select-orderType"
                    className={inputClass}
                  >
                    <option value="حلويات الأعراس والمهيبة">حلويات الأعراس والمهيبة</option>
                    <option value="حلويات جافة (أعياد ومناسبات)">حلويات جافة (أعياد ومناسبات)</option>
                    <option value="طلبية خاصة (قاطو، كيك مخصص)">طلبية خاصة (قاطو، كيك مخصص)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>تفاصيل الموديلات والنكهات المطلوبة</label>
                <textarea
                  {...form.register("details")}
                  data-testid="textarea-details"
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder="يرجى كتابة أنواع الحلويات المفضلة (مثال: عرايش، مخبز، صابلي بريستيج...) أو أي تفاصيل خاصة بالتزيين..."
                />
              </div>

              {mutation.isError && (
                <div className="p-4 bg-rose-50 text-rose-700 text-sm rounded-xl border border-rose-100 text-center">
                  حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.
                </div>
              )}

              <button
                type="submit"
                data-testid="button-submit"
                disabled={mutation.isPending}
                className="w-full py-4 bg-gradient-to-l from-amber-950 to-stone-900 text-white font-bold rounded-xl tracking-wide shadow-lg hover:from-rose-950 hover:to-amber-950 active:scale-[0.99] transition disabled:opacity-50 text-base"
              >
                {mutation.isPending ? "جاري إرسال طلبكِ للمطبخ..." : "إرسال طلب الحجز"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
