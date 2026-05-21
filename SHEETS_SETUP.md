# Google Sheets Setup — The Setting

## Step 1 — Create Sheet
1. Go to sheets.google.com
2. Create new sheet: "The Setting Registrations"
3. Row 1 headers:
   - A1: Timestamp
   - B1: Name
   - C1: Email
   - D1: Mobile
   - E1: Source

## Step 2 — Apps Script
1. Extensions → Apps Script
2. Delete all existing code
3. Paste this exactly:

```js
function doPost(e) {
  var sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.timestamp,
    data.name,
    data.email,
    data.mobile,
    data.source
  ]);
  return ContentService
    .createTextOutput(
      JSON.stringify({ status: 'success' })
    )
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Step 3 — Deploy
1. Click **Deploy → New Deployment**
2. Select type: **Web App**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Click **Deploy**
6. Copy the Web App URL

## Step 4 — Add to project
In `.env.local` add:
```
NEXT_PUBLIC_SHEETS_URL=YOUR_WEB_APP_URL
```

In Vercel dashboard:
- Settings → Environment Variables
- Name: `NEXT_PUBLIC_SHEETS_URL`
- Value: `YOUR_WEB_APP_URL`

## Step 5 — Redeploy
```bash
git add .
git commit -m "add sheets url"
git push
```
