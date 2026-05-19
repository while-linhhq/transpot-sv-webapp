import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const db = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL ?? 'admin@vanchuyenledat.vn';
  const password = process.env.ADMIN_PASSWORD ?? 'Admin@123456';

  const passwordHash = await bcrypt.hash(password, 12);

  await db.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, name: 'Admin' },
  });

  const sampleCount = await db.project.count();
  if (sampleCount === 0) {
    await db.project.createMany({
      data: [
        {
          title: 'Chuyển nhà trọn gói quận Hải Châu',
          slug: 'chuyen-nha-hai-chau',
          excerpt: 'Hoàn thành chuyển nhà 3 phòng ngủ trong 1 ngày.',
          contentHtml:
            '<p>Dự án chuyển nhà trọn gói tại quận Hải Châu, Đà Nẵng với đội ngũ chuyên nghiệp.</p>',
          tags: ['chuyen-nha', 'da-nang'],
          status: 'PUBLISHED',
          publishedAt: new Date(),
        },
        {
          title: 'Chuyển văn phòng 50 nhân viên',
          slug: 'chuyen-van-phong-50-nhan-vien',
          excerpt: 'Di dời văn phòng cuối tuần, không gián đoạn công việc.',
          contentHtml:
            '<p>Chuyển văn phòng trọn gói cuối tuần cho công ty 50 nhân viên.</p>',
          tags: ['chuyen-van-phong'],
          status: 'PUBLISHED',
          publishedAt: new Date(),
        },
        {
          title: 'Vận chuyển hàng hóa đi Quảng Nam',
          slug: 'van-chuyen-quang-nam',
          excerpt: 'Vận chuyển hàng hóa xe tải 1.5 tấn an toàn.',
          contentHtml: '<p>Vận chuyển hàng hóa từ Đà Nẵng đi Quảng Nam.</p>',
          tags: ['hang-hoa'],
          status: 'PUBLISHED',
          publishedAt: new Date(),
        },
      ],
    });
  }

  console.log(`Seeded admin: ${email}`);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
