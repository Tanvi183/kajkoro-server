import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...\n');

  // ─── Categories ────────────────────────────────────────
  console.log('📂 Creating categories...');
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'telegram' },
      update: {},
      create: { name: 'Telegram', slug: 'telegram', color: '#0ea5e9', icon: 'telegram' },
    }),
    prisma.category.upsert({
      where: { slug: 'sign-up' },
      update: {},
      create: { name: 'Sign Up', slug: 'sign-up', color: '#f97316', icon: 'user-plus' },
    }),
    prisma.category.upsert({
      where: { slug: 'survey' },
      update: {},
      create: { name: 'Survey', slug: 'survey', color: '#eab308', icon: 'clipboard' },
    }),
    prisma.category.upsert({
      where: { slug: 'mobile-apps' },
      update: {},
      create: { name: 'Mobile Apps', slug: 'mobile-apps', color: '#e11d48', icon: 'smartphone' },
    }),
    prisma.category.upsert({
      where: { slug: 'youtube' },
      update: {},
      create: { name: 'YouTube', slug: 'youtube', color: '#dc2626', icon: 'youtube' },
    }),
    prisma.category.upsert({
      where: { slug: 'facebook' },
      update: {},
      create: { name: 'Facebook', slug: 'facebook', color: '#2563eb', icon: 'facebook' },
    }),
  ]);
  console.log(`   ✅ ${categories.length} categories created\n`);

  // ─── Users ─────────────────────────────────────────────
  console.log('👤 Creating users...');

  const worker = await prisma.user.upsert({
    where: { email: 'worker@gmail.com' },
    update: {},
    create: {
      name: 'Test Worker',
      email: 'worker@gmail.com',
      phone: '01700000001',
      password: '$2b$10$placeholder_hashed_password_worker', // Replace with bcrypt hash of "12345678"
      role: 'WORKER',
      balance: 150.00,
      isVerified: true,
    },
  });

  const employer = await prisma.user.upsert({
    where: { email: 'employer@gmail.com' },
    update: {},
    create: {
      name: 'Test Employer',
      email: 'employer@gmail.com',
      phone: '01700000002',
      password: '$2b$10$placeholder_hashed_password_employer',
      role: 'EMPLOYER',
      balance: 5000.00,
      isVerified: true,
    },
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      name: 'Test Admin',
      email: 'admin@gmail.com',
      phone: '01700000003',
      password: '$2b$10$placeholder_hashed_password_admin',
      role: 'ADMIN',
      balance: 0,
      isVerified: true,
    },
  });

  console.log(`   ✅ Worker:   ${worker.email} (balance: ৳${worker.balance})`);
  console.log(`   ✅ Employer: ${employer.email} (balance: ৳${employer.balance})`);
  console.log(`   ✅ Admin:    ${admin.email}\n`);

  // ─── Jobs ──────────────────────────────────────────────
  console.log('💼 Creating jobs...');
  const [catTelegram, catSignUp, catSurvey, catMobileApps, catYouTube, catFacebook] = categories;

  const jobs = await Promise.all([
    prisma.job.create({
      data: {
        title: 'টেলিগ্রাম গ্রুপে জয়েন করা ✅',
        description: 'আমাদের টেলিগ্রাম গ্রুপে জয়েন করুন এবং স্ক্রিনশট জমা দিন।',
        reward: 3,
        totalSlots: 60000,
        slotsLeft: 1675,
        categoryId: catTelegram.id,
        employerId: employer.id,
        status: 'ACTIVE',
      },
    }),
    prisma.job.create({
      data: {
        title: 'টেলিগ্রাম গ্রুপে জয়েন করা 💰',
        description: 'নতুন টেলিগ্রাম গ্রুপে জয়েন করে প্রমাণ জমা দিন।',
        reward: 3,
        totalSlots: 100000,
        slotsLeft: 41865,
        categoryId: catTelegram.id,
        employerId: employer.id,
        status: 'ACTIVE',
      },
    }),
    prisma.job.create({
      data: {
        title: 'রেজিস্ট্রেশন করে ইনকাম 🎁',
        description: 'একটি সার্ভে ফর্ম পূরণ করুন এবং স্ক্রিনশট দিন।',
        reward: 10,
        totalSlots: 9000,
        slotsLeft: 747,
        categoryId: catSurvey.id,
        employerId: employer.id,
        status: 'ACTIVE',
      },
    }),
    prisma.job.create({
      data: {
        title: 'সঠিক কাজে জমা দিলে ২০ টাকা 💥',
        description: 'সাইন আপ করুন এবং প্রোফাইল সম্পূর্ণ করুন।',
        reward: 20,
        totalSlots: 12,
        slotsLeft: 3,
        categoryId: catSignUp.id,
        employerId: employer.id,
        status: 'ACTIVE',
      },
    }),
    prisma.job.create({
      data: {
        title: 'Easy earn অ্যাপ এর কাজ 🤑💸',
        description: 'অ্যাপটি ডাউনলোড করুন এবং রেজিস্টার করুন।',
        reward: 20,
        totalSlots: 26,
        slotsLeft: 3,
        categoryId: catSignUp.id,
        employerId: employer.id,
        status: 'ACTIVE',
      },
    }),
    prisma.job.create({
      data: {
        title: 'YouTube ভিডিও লাইক ও সাবস্ক্রাইব',
        description: 'ভিডিও দেখুন, লাইক করুন এবং চ্যানেল সাবস্ক্রাইব করুন।',
        reward: 5,
        totalSlots: 5000,
        slotsLeft: 4200,
        categoryId: catYouTube.id,
        employerId: employer.id,
        status: 'ACTIVE',
      },
    }),
    prisma.job.create({
      data: {
        title: 'Facebook পেজে লাইক দিন',
        description: 'আমাদের ফেসবুক পেজে লাইক দিন এবং স্ক্রিনশট জমা দিন।',
        reward: 2,
        totalSlots: 10000,
        slotsLeft: 8500,
        categoryId: catFacebook.id,
        employerId: employer.id,
        status: 'ACTIVE',
      },
    }),
    prisma.job.create({
      data: {
        title: 'নতুন পুরাতন সবার জন্য কাজ',
        description: 'মোবাইল অ্যাপ ইনস্টল করুন এবং একটি অ্যাকাউন্ট তৈরি করুন।',
        reward: 10,
        totalSlots: 10,
        slotsLeft: 2,
        categoryId: catMobileApps.id,
        employerId: employer.id,
        status: 'ACTIVE',
      },
    }),
  ]);
  console.log(`   ✅ ${jobs.length} jobs created\n`);

  // ─── Transactions (Employer deposit) ───────────────────
  console.log('💳 Creating transactions...');
  const transactions = await Promise.all([
    prisma.transaction.create({
      data: {
        amount: 5000,
        type: 'DEPOSIT',
        description: 'Initial deposit via bKash',
        userId: employer.id,
      },
    }),
    prisma.transaction.create({
      data: {
        amount: 100,
        type: 'EARNING',
        description: 'Earned from completing 10 tasks',
        userId: worker.id,
      },
    }),
    prisma.transaction.create({
      data: {
        amount: 50,
        type: 'EARNING',
        description: 'Earned from completing 5 tasks',
        userId: worker.id,
      },
    }),
  ]);
  console.log(`   ✅ ${transactions.length} transactions created\n`);

  // ─── Notifications ─────────────────────────────────────
  console.log('🔔 Creating notifications...');
  const notifications = await Promise.all([
    prisma.notification.create({
      data: {
        title: 'স্বাগতম!',
        message: 'Ajkerkaj এ আপনাকে স্বাগতম। এখনই কাজ শুরু করুন!',
        userId: worker.id,
        link: '/worker/dashboard',
      },
    }),
    prisma.notification.create({
      data: {
        title: 'কাজ অনুমোদিত হয়েছে',
        message: 'আপনার "টেলিগ্রাম গ্রুপে জয়েন" কাজটি অনুমোদিত হয়েছে। ৳3 আপনার ব্যালেন্সে যোগ হয়েছে।',
        userId: worker.id,
        link: '/worker/dashboard/completed',
      },
    }),
    prisma.notification.create({
      data: {
        title: 'নতুন সাবমিশন',
        message: '5টি নতুন সাবমিশন পর্যালোচনার অপেক্ষায় আছে।',
        userId: employer.id,
        link: '/employer/dashboard/campaigns',
      },
    }),
  ]);
  console.log(`   ✅ ${notifications.length} notifications created\n`);

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
