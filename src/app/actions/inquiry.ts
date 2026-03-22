'use server';

import { z } from 'zod';

const inquirySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  interest: z.string().min(1, { message: "Please select an interest." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

interface ActionState {
  message: string;
  errors?: Record<string, string[]>;
  success?: boolean;
}

export async function submitInquiry(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const validatedFields = inquirySchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    interest: formData.get('interest'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors as Record<string, string[]>,
      message: 'Missing Fields. Failed to Send Inquiry.',
      success: false,
    };
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const fs = require('fs');
    const path = require('path');
    const INQUIRIES_PATH = path.join(process.cwd(), 'src/data/admin/inquiries.json');
    
    let inquiries = [];
    try {
      inquiries = JSON.parse(fs.readFileSync(INQUIRIES_PATH, 'utf8'));
    } catch (err) {}
    
    inquiries.unshift({
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...validatedFields.data,
      status: 'New'
    });
    
    fs.writeFileSync(INQUIRIES_PATH, JSON.stringify(inquiries.slice(0, 500), null, 2));
    
    console.log('Inquiry Saved:', validatedFields.data);
  } catch (err) {
    console.error('Failed to save inquiry:', err);
  }

  return {
    message: 'Success! Your inquiry has been received. Our advisors will contact you shortly.',
    success: true,
    errors: {},
  };
}
