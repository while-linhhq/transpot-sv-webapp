# transport-sv-webapp

Landing page Next.js — app trong `client/`.

```bash
cd client
pnpm install
pnpm dev
```

Mở http://localhost:3000

Ảnh/video: `client/public/images/`, `client/public/videos/`

## Máy bị treo / reset khi `pnpm dev`?

1. **Tắt extension Trunk** trong Cursor (Extensions → Trunk → Disable/Uninstall). Trunk tự quét repo + chạy trufflehog/trivy → ăn RAM.
2. Không tạo lại thư mục `.trunk/` ở root repo.
3. `pnpm dev` đã dùng `--webpack` và giới hạn RAM Node (~3GB).
