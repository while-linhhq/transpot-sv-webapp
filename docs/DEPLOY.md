# Deploy — GitHub Actions + Vercel

App Next.js nằm trong **`client/`**. Mỗi lần **push** lên GitHub, workflow [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml) sẽ:

1. **CI:** `pnpm lint` + `pnpm build`
2. **Deploy:** đẩy lên Vercel
   - nhánh **`main`** → **Production**
   - nhánh khác → **Preview**

PR chỉ chạy CI (không deploy), tránh tốn quota và lộ secret trên fork.

---

## 1. Tạo project trên Vercel

1. Đăng nhập [vercel.com](https://vercel.com) → **Add New… → Project**.
2. **Import** repository GitHub `transport-sv-webapp`.
3. Cấu hình build (quan trọng vì app không ở root repo):

| Mục | Giá trị |
|-----|---------|
| **Root Directory** | `client` |
| **Framework Preset** | Next.js |
| **Install Command** | `pnpm install` |
| **Build Command** | `pnpm build` |
| **Output Directory** | *(để mặc định — Next.js)* |
| **Node.js Version** | `22` (khớp `client/.nvmrc`) |

4. **Environment Variables** (Production + Preview nếu khác nhau):

| Biến | Production | Preview (gợi ý) |
|------|------------|------------------|
| `NEXT_PUBLIC_SITE_URL` | `https://taxitaithanhdat.com` (domain thật) | `https://$VERCEL_URL` hoặc URL preview cố định |

   Các biến khác (nếu bật CMS sau): xem `client/.env.example`.

5. **Tắt auto-deploy từ Git** (tránh deploy 2 lần — một từ Vercel, một từ Actions):

   **Project → Settings → Git →**
   - Tắt **Production Branch** auto deploy *hoặc*
   - **Ignored Build Step** / disconnect Git integration và chỉ deploy qua GitHub Actions.

   Khuyến nghị: **Settings → Git → Deploy Hooks** không cần; chỉ dùng Actions làm nguồn deploy.

6. Chưa cần bấm Deploy — lấy ID project trước (bước 2).

---

## 2. Lấy `VERCEL_ORG_ID` và `VERCEL_PROJECT_ID`

Trên máy local (một lần):

```bash
cd client
pnpm dlx vercel@latest login
pnpm dlx vercel@latest link
```

Chọn đúng team và project vừa tạo. File `client/.vercel/project.json` (đã gitignore) có dạng:

```json
{
  "orgId": "team_xxxxxxxx",
  "projectId": "prj_xxxxxxxx"
}
```

Ghi lại **`orgId`** → `VERCEL_ORG_ID`, **`projectId`** → `VERCEL_PROJECT_ID`.

---

## 3. Tạo Vercel token

1. Vercel → **Account Settings → Tokens** (hoặc Team Settings nếu dùng team).
2. **Create** token, scope đủ deploy project.
3. Copy token (chỉ hiện một lần).

---

## 4. Cấu hình GitHub repository

**GitHub → repo → Settings → Secrets and variables → Actions**

### Secrets (bắt buộc)

| Name | Value |
|------|--------|
| `VERCEL_TOKEN` | Token bước 3 |
| `VERCEL_ORG_ID` | `orgId` từ `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | `projectId` từ `.vercel/project.json` |

### Variables (tùy chọn, cho bước CI build)

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SITE_URL` | URL production (dùng khi `pnpm build` trong job CI) |

Deploy job dùng `vercel pull` nên env **Production/Preview** trên Vercel Dashboard vẫn là nguồn chính khi deploy.

### Environments (tùy chọn)

Workflow gán `environment: production` (nhánh `main`) và `preview` (nhánh khác). Có thể thêm **protection rules** cho `production` (required reviewers) trong **Settings → Environments**.

---

## 5. Push và kiểm tra

```bash
git add .github/workflows/deploy.yml client/vercel.json docs/DEPLOY.md
git commit -m "ci: add GitHub Actions deploy to Vercel"
git push origin main
```

**GitHub → Actions** → run **CI and Deploy**:

- Job **Lint and build** phải xanh.
- Job **Deploy to Vercel** in URL trong **Summary**.

Mở Vercel Dashboard → **Deployments** để xem log chi tiết.

---

## 6. Domain tùy chỉnh (production)

1. Vercel project → **Settings → Domains**.
2. Thêm domain (vd. `taxitaithanhdat.com`).
3. DNS theo hướng dẫn Vercel (A/CNAME).
4. Cập nhật `NEXT_PUBLIC_SITE_URL` trên Vercel (Production) = URL domain chính thức.
5. Redeploy `main` (push empty commit hoặc re-run workflow).

---

## 7. Luồng theo nhánh

```text
push → main     → CI → Deploy Production (--prod)
push → feature  → CI → Deploy Preview
pull_request    → CI only (no deploy)
```

---

## 8. Xử lý lỗi thường gặp

| Triệu chứng | Cách xử lý |
|-------------|------------|
| `VERCEL_ORG_ID` / `PROJECT_ID` missing | Thêm đủ 3 secrets; chạy `vercel link` trong `client/`. |
| Build fail: `NEXT_PUBLIC_SITE_URL` | Thêm variable trên GitHub hoặc env trên Vercel. |
| Deploy 2 bản giống nhau | Tắt Vercel Git auto-deploy (mục 1.5). |
| `pnpm install` fail | Đảm bảo `client/pnpm-lock.yaml` đã commit; Root Directory = `client`. |
| Repo quá nặng (video trong `public/`) | Vercel giới hạn kích thước deployment; cân nhắc CDN/R2 cho file lớn. |

---

## 9. Rollback

- **Vercel Dashboard → Deployments →** chọn bản cũ → **Promote to Production**.
- Hoặc `git revert` trên `main` rồi push (Actions deploy lại bản revert).

---

## 10. Chạy deploy thủ công (local)

```bash
cd client
pnpm dlx vercel@latest pull --environment=production
pnpm dlx vercel@latest build --prod
pnpm dlx vercel@latest deploy --prebuilt --prod
```

Không bắt buộc nếu đã dùng GitHub Actions cho mọi push.
