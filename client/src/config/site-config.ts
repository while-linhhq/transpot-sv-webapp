/** Locale-agnostic config (phones, slugs, map, pricing numbers) */

export const SERVICE_SLUGS = [
  'chuyen-nha-tron-goi',
  'chuyen-van-phong',
  'chuyen-hang-hoa',
  'chuyen-phong-tro',
  'di-doi-nha-xuong',
  'chuyen-chung-cu',
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const siteConfig = {
  brand: {
    logoSrc: '/logo.jpg',
    priceFrom: '120.000đ',
    priceTiers: ['120K', '200K', '250K'],
  },
  contact: {
    hotlines: [
      { display: '0905.710.807', href: 'tel:+84905710807' },
      { display: '0707.751.751', href: 'tel:+84707751751' },
    ],
    zaloHref: 'https://zalo.me/0905710807',
    email: 'Quangdat31121995@gmail.com',
    taxCode: '0000000000',
  },
  map: {
    // Query embed — trỏ tới địa chỉ đặt pin (Google tự geocode)
    embedUrl:
      'https://maps.google.com/maps?q=S%E1%BB%91%2010%20Ph%C3%BAc%20%C4%90%C3%A1n%2C%20ph%C6%B0%E1%BB%9Dng%20Thanh%20Kh%C3%AA%2C%20th%C3%A0nh%20ph%E1%BB%91%20%C4%90%C3%A0%20N%E1%BA%B5ng%2C%20Vi%E1%BB%87t%20Nam&hl=vi&z=17&output=embed',
  },
  pricing: {
    updatedAt: '2026-05-10',
    innerCity: [
      {
        vehicleKey: 'vehicle500',
        openPrice: '250.000 VNĐ',
        fromKm5: '18.000 đ/Km',
        interProvince: '15.000 đ/Km',
        loadingTime: '30 phút',
        waitingTime: '70.000 đ/giờ',
      },
      {
        vehicleKey: 'vehicle750',
        openPrice: '300.000 VNĐ',
        fromKm5: '18.000 đ/Km',
        interProvince: '15.000 đ/Km',
        loadingTime: '30 phút',
        waitingTime: '70.000 đ/giờ',
      },
      {
        vehicleKey: 'vehicle15t',
        openPrice: '400.000 VNĐ',
        fromKm5: '18.000 đ/Km',
        interProvince: '15.000 đ/Km',
        loadingTime: '30 phút',
        waitingTime: '70.000 đ/giờ',
      },
    ],
    interProvince: [
      {
        vehicleKey: 'smallTruck',
        km40to100: '15.000 VNĐ/Km',
        km101Plus: '12.000 VNĐ/Km',
        timeSurcharge: '60.000 VNĐ/Giờ',
        overnightFee: '250.000 VNĐ/đêm',
      },
      {
        vehicleKey: 'largeTruck',
        km40to100: '20.000 VNĐ/Km',
        km101Plus: '17.000 VNĐ/Km',
        timeSurcharge: '60.000 VNĐ/Giờ',
        overnightFee: '250.000 VNĐ/đêm',
      },
    ],
  },
} as const;
