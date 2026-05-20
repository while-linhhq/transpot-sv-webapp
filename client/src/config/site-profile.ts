export type PricingRow = {
  vehicleType: string;
  openPrice?: string;
  fromKm5?: string;
  interProvince?: string;
  loadingTime?: string;
  waitingTime?: string;
  km40to100?: string;
  km101Plus?: string;
  timeSurcharge?: string;
  overnightFee?: string;
};

export type ServiceItem = {
  slug: string;
  title: string;
  shortDescription: string;
  icon: string;
};

export type Hotline = {
  display: string;
  href: string;
};

const hotlines: Hotline[] = [
  { display: '0905.710.807', href: 'tel:+84905710807' },
  { display: '0707.751.751', href: 'tel:+84707751751' },
];

export const siteProfile = {
  brand: {
    name: 'Taxi Tải Lê Đạt',
    shortName: 'Lê Đạt',
    logoSrc: '/logo.jpg',
    logoAlt: 'Taxi Tải Lê Đạt — Uy tín · An toàn · Nhanh chóng',
    tagline: 'Vận chuyển giá rẻ · 24/24 tại Đà Nẵng',
    description:
      'Chuyển nhà, chuyển trọ, chuyển văn phòng trọn gói, chuyển chung cư và hàng hóa — đội xe tải chuyên nghiệp, áo đồng phục vàng, phục vụ khắp Đà Nẵng.',
    priceFrom: '120.000đ',
    priceTiers: ['120K', '200K', '250K'],
  },
  contact: {
    hotlines,
    hotline: hotlines[0].display,
    hotlineHref: hotlines[0].href,
    zalo: '0905.710.807',
    zaloHref: 'https://zalo.me/0905710807',
    email: 'contact@vanchuyenledat.vn',
    address: 'Đà Nẵng, Việt Nam (phục vụ 24/7 toàn thành phố)',
    taxCode: '0000000000',
    workingHours: '24/24 — Gọi bất cứ lúc nào',
  },
  social: {
    facebook: '',
    zaloOa: '',
  },
  map: {
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.774989405374!2d108.202166!3d16.054407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDAzJzE1LjkiTiAxMDjCsMTIn' +
      '07LjciRQ!5e0!3m2!1svi!2s!4v1',
  },
  pricing: {
    updatedAt: '2020-02-14',
    updatedAtLabel: '14-02-2020',
    innerCityNote:
      'Giá cước được căn cứ theo đồng hồ tính tiền trên xe ô tô. Phạm vi dưới 30km.',
    interProvinceNote:
      'Áp dụng với các điểm đến cách Đà Nẵng từ 30km/1 chiều trở lên. Quý khách đi 1 chiều được tính 01 chiều; nếu đi chiều về thì được tính bằng 30% của chiều đi.',
    innerCityHeaders: [
      'LOẠI XE',
      'GIÁ MỞ CỬA (4 KM ĐẦU)',
      'TỪ KM THỨ 5',
      'ĐI TỈNH',
      'THỜI GIAN BỐC HÀNG',
      'THỜI GIAN CHỜ',
    ],
    innerCity: [
      {
        vehicleType: 'Xe 500kg',
        openPrice: '250.000 VNĐ',
        fromKm5: '18.000 đ/Km',
        interProvince: '15.000 đ/Km',
        loadingTime: '30 phút',
        waitingTime: '70.000 đ/giờ',
      },
      {
        vehicleType: 'Xe 750kg',
        openPrice: '300.000 VNĐ',
        fromKm5: '18.000 đ/Km',
        interProvince: '15.000 đ/Km',
        loadingTime: '30 phút',
        waitingTime: '70.000 đ/giờ',
      },
      {
        vehicleType: 'Xe 1.5 tấn',
        openPrice: '400.000 VNĐ',
        fromKm5: '18.000 đ/Km',
        interProvince: '15.000 đ/Km',
        loadingTime: '30 phút',
        waitingTime: '70.000 đ/giờ',
      },
    ] satisfies PricingRow[],
    interProvinceHeaders: [
      'LOẠI XE',
      '40Km – 100Km',
      '101Km TRỞ LÊN',
      'PHỤ TRỘI THỜI GIAN',
      'TIỀN LƯU ĐÊM',
    ],
    interProvince: [
      {
        vehicleType: 'XE NHỎ',
        km40to100: '15.000 VNĐ/Km',
        km101Plus: '12.000 VNĐ/Km',
        timeSurcharge: '60.000 VNĐ/Giờ',
        overnightFee: '250.000 VNĐ/đêm',
      },
      {
        vehicleType: 'Xe lớn',
        km40to100: '20.000 VNĐ/Km',
        km101Plus: '17.000 VNĐ/Km',
        timeSurcharge: '60.000 VNĐ/Giờ',
        overnightFee: '250.000 VNĐ/đêm',
      },
    ] satisfies PricingRow[],
  },
  services: [
    {
      slug: 'chuyen-nha-tron-goi',
      title: 'Chuyển nhà trọn gói',
      shortDescription: 'Dịch vụ chuyển nhà giá rẻ, an toàn, trọn gói tại Đà Nẵng.',
      icon: 'home',
    },
    {
      slug: 'chuyen-van-phong',
      title: 'Chuyển văn phòng',
      shortDescription: 'Chuyển văn phòng trọn gói, không gián đoạn công việc.',
      icon: 'building',
    },
    {
      slug: 'chuyen-hang-hoa',
      title: 'Chuyển hàng hóa',
      shortDescription: 'Vận chuyển hàng hóa siêu tốc, an toàn 100%.',
      icon: 'package',
    },
    {
      slug: 'chuyen-phong-tro',
      title: 'Chuyển phòng trọ',
      shortDescription: 'Chuyển phòng trọ sinh viên giá tốt, nhanh gọn.',
      icon: 'bed',
    },
    {
      slug: 'di-doi-nha-xuong',
      title: 'Di dời nhà xưởng',
      shortDescription: 'Di dời nhà xưởng, kho bãi an toàn, chuyên nghiệp.',
      icon: 'factory',
    },
    {
      slug: 'chuyen-chung-cu',
      title: 'Chuyển chung cư',
      shortDescription: 'Chuyển chung cư cao tầng, tháo lắp – vận chuyển trọn gói.',
      icon: 'building2',
    },
  ] satisfies ServiceItem[],
  usp: [
    'Cam kết không có chi phí phát sinh',
    'Đền bù 100% giá trị đồ đạc nếu hư hại, thất thoát',
    'Miễn phí trang bị, thiết bị đóng gói',
    'Tư vấn, tiếp nhận yêu cầu tận tình, chu đáo',
    'Nhân viên đóng gói cẩn trọng, bao lót tỉ mỉ',
    'Nhân viên vận chuyển khỏe, nhanh nhẹn',
    'Tài xế thông thạo đường xá, cẩn trọng',
  ],
  processSteps: [
    {
      step: 1,
      title: 'Tiếp nhận thông tin',
      description:
        'Xác nhận tên, số điện thoại, địa chỉ và yêu cầu chuyển đồ để tiện liên hệ.',
    },
    {
      step: 2,
      title: 'Khảo sát & báo giá',
      description:
        'Nhân viên khảo sát tài sản, tư vấn phương án và báo giá ưu đãi.',
    },
    {
      step: 3,
      title: 'Ký kết hợp đồng',
      description: 'Thống nhất phương án vận chuyển và ký hợp đồng triển khai.',
    },
    {
      step: 4,
      title: 'Thực hiện vận chuyển',
      description:
        'Tháo dỡ, đóng gói, vận chuyển và lắp đặt tại điểm mới theo hợp đồng.',
    },
    {
      step: 5,
      title: 'Nghiệm thu & thanh toán',
      description: 'Kiểm tra tài sản, ký thanh lý hợp đồng và thanh toán.',
    },
  ],
  packingSteps: [
    {
      title: 'Đối với đồ dễ vỡ',
      content:
        'Dùng túi xốp hơi bọc quanh sản phẩm, bọc kín các góc cạnh. Tách riêng vật nhỏ, chèn vải mềm ở góc thùng để tránh va đập khi vận chuyển.',
    },
    {
      title: 'Đối với đồ điện tử',
      content:
        'Sử dụng PE hoặc túi xốp Bubble bọc quanh sản phẩm, cố định bằng băng keo rồi đặt vào thùng carton.',
    },
    {
      title: 'Các đồ khác',
      content:
        'Tranh ảnh, bản đồ cuộn tròn bằng ống bìa cứng, bịt kín hai đầu bằng băng dính hoặc dây nilon.',
    },
  ],
  assets: {
    root: '/assets',
  },
} as const;

export type SiteProfile = typeof siteProfile;
