import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { CheckCircle2, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import apiClient from '@/lib/api';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validateForm(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Name is required';
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  if (!data.message.trim()) errors.message = 'Message is required';
  return errors;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: (payload: FormData) =>
      apiClient.post('/v2/items/contact_submissions', {
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        message: payload.message,
        status: 'new',
      }),
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    mutation.mutate(formData);
  };

  return (
    <section id="contact" className="py-20 bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase">Reach out</span>
          <h2
            className="mt-3 font-heading font-black text-foreground"
            style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
          >
            Send Us a Message
          </h2>
          <p className="mt-4 text-muted-foreground text-base max-w-xl mx-auto">
            Fill in the form below and our team will get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="max-w-[640px] mx-auto">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="text-center py-16 px-8 bg-background rounded-[var(--radius)] border border-border/50 shadow-sm"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="font-heading font-bold text-foreground text-2xl mb-3">
                  Message Sent!
                </h3>
                <p className="text-muted-foreground text-base">
                  Thanks! We&apos;ll get back to you shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', message: '' });
                  }}
                  className="mt-8 text-accent text-sm font-semibold hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="bg-background rounded-[var(--radius)] border border-border/50 shadow-sm p-8 flex flex-col gap-5"
                noValidate
              >
                {/* Name */}
                <div>
                  <div className="floating-label-group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder=" "
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      className={errors.name ? 'border-destructive focus:border-destructive focus:shadow-none' : ''}
                    />
                    <label htmlFor="name">Full Name</label>
                  </div>
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-destructive pl-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <div className="floating-label-group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder=" "
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className={errors.email ? 'border-destructive focus:border-destructive focus:shadow-none' : ''}
                    />
                    <label htmlFor="email">Email Address</label>
                  </div>
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-destructive pl-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <div className="floating-label-group">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder=" "
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                    />
                    <label htmlFor="phone">Phone Number (optional)</label>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div className="floating-label-group textarea-group">
                    <textarea
                      id="message"
                      name="message"
                      placeholder=" "
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={errors.message ? 'border-destructive focus:border-destructive focus:shadow-none' : ''}
                    />
                    <label htmlFor="message">Your Message</label>
                  </div>
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-destructive pl-1">{errors.message}</p>
                  )}
                </div>

                {/* Error from API */}
                {mutation.isError && (
                  <p className="text-xs text-destructive bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                    Something went wrong. Please try again.
                  </p>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  variant="accent"
                  className="w-full h-12 text-base gap-2 mt-1"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
