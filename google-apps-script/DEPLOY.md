# Resume (CV) intake — Google Apps Script deployment

The careers form sends each applicant's resume **straight from the browser** to a
Google Apps Script Web App. The script (running as YOUR Google account) saves the
file to **your Google Drive** and appends **ФИО + a clickable CV link** to the
recruitment spreadsheet. This one-time setup takes ~3 minutes and must be done by
you (it needs your Google login).

## 1. Pick a shared secret
Generate a long random string, e.g. run in a terminal:
```
openssl rand -hex 24
```
Copy it — you'll paste the SAME value in two places (`SECRET` below and
`NEXT_PUBLIC_RESUME_UPLOAD_TOKEN` in the site env).

## 2. Create the Apps Script
1. Open the spreadsheet:
   https://docs.google.com/spreadsheets/d/13ILX7X1bTbRu7YqH__CF89QgxtAZvnnUpecWaJuB7uA/edit
2. Menu: **Extensions → Apps Script**.
3. Delete any sample code, then paste the entire contents of
   **`resume-intake.gs`** (next to this file).
4. At the top, set `var SECRET = '...'` to the random string from step 1.
   (Leave `SHEET_ID` as-is — it already points at your sheet.)
5. **Save** (💾).

## 3. Deploy as a Web App
1. Click **Deploy → New deployment**.
2. Gear icon → **Web app**.
3. Configure:
   - **Description:** `resume intake`
   - **Execute as:** **Me** (your account)
   - **Who has access:** **Anyone**
4. Click **Deploy**. Google will ask you to **authorize** — approve it
   (you may see "Google hasn't verified this app" → *Advanced → Go to … (unsafe)* →
   Allow; this is your own script, it's safe).
5. Copy the **Web app URL** (ends with `/exec`).

## 4. Put the values in the site
Add to `site/.env` (local) **and** to the Vercel project's Environment Variables
(Production):
```
NEXT_PUBLIC_RESUME_UPLOAD_URL="https://script.google.com/macros/s/XXXX/exec"
NEXT_PUBLIC_RESUME_UPLOAD_TOKEN="<the same random string from step 1>"
```
Redeploy the site (or restart `npm run dev` locally) so the new env is picked up.

## 5. Test
Open `/careers`, fill the intern form, attach a small PDF, submit. A new row should
appear at the bottom of the spreadsheet with the name in **ФИО** and a clickable
**CV** link (opens the file from Drive). Files land in the Drive folder
**"SQB AI — Rezyumelar"**.

## Privacy (resumes are personal data)
- By default uploaded files stay **private** — owned by your Google account. The
  **CV** link in the sheet opens for **you** (and anyone you share the Drive folder
  with). They are **not** world-readable.
- If HR colleagues also need to open resumes, share the **"SQB AI — Rezyumelar"**
  Drive folder with them (Drive → right-click the folder → Share). Don't make it
  "Anyone with the link".
- Only if you truly need link-anyone access, set `MAKE_LINK_PUBLIC = true` at the
  top of `resume-intake.gs` and redeploy.

## Notes
- Allowed files: **.pdf, .doc, .docx** only, up to **15 MB** (validated both in the
  browser and in the script via magic-byte signatures; `.docx` must contain a real
  Word part, so renamed zips are rejected).
- Applicant names are written as **plain text** and formula characters are
  neutralized, so a malicious name can't run a spreadsheet formula.
- A coarse **daily cap** (`MAX_PER_DAY`, default 300) plus a hidden honeypot field
  limit abuse of the browser-visible token. If you ever see spam rows, rotate the
  secret: change `SECRET`, redeploy (**Deploy → Manage deployments → edit → new
  version**), and update `NEXT_PUBLIC_RESUME_UPLOAD_TOKEN`.
- To change the target folder, columns, daily cap, or sharing, edit the `Config`
  block at the top of `resume-intake.gs`.
