# transport-sv-webapp

Landing page Next.js — app trong `client/`.

```bash
cd client
pnpm install
pnpm dev
```

Mở http://localhost:3000

Ảnh/video: `client/public/images/`, `client/public/videos/`

## Deploy (GitHub Actions → Vercel)

Push lên GitHub → tự **lint, build, deploy** (nhánh `main` = production, nhánh khác = preview).

Hướng dẫn cấu hình secrets Vercel + GitHub: **[docs/DEPLOY.md](docs/DEPLOY.md)**.

## i18n (tiếng Việt / English)

- **Tiếng Việt (mặc định):** không prefix — `/`, `/dich-vu/...`, `/en` cho English.
- **English:** prefix `/en` — ví dụ `/en`, `/en/dich-vu/chuyen-nha-tron-goi`.
- Chuyển nhanh: nút **VI | EN** trên thanh hotline (header).
- Chuỗi UI: `client/src/i18n/locales/vi/*.json`, `.../en/*.json` (namespace: `common`, `site`, `home`, `pricing`, `services`, `contact`, `projects`, `meta`).
- Next.js 16: locale rewrite dùng `client/src/proxy.ts` (cùng cấp `src/app/`, **không** để ở root `client/`).
- Số điện thoại / bảng giá số: `client/src/config/site-config.ts` (locale-agnostic).


1. **Tắt extension Trunk** trong Cursor (Extensions → Trunk → Disable/Uninstall). Trunk tự quét repo + chạy trufflehog/trivy → ăn RAM.
2. Không tạo lại thư mục `.trunk/` ở root repo.
3. `pnpm dev` đã dùng `--webpack` và giới hạn RAM Node (~3GB).
