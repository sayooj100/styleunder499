# Style Under 499 ⚡

Premium streetwear for students. Everything under ₹499.

## Hosting on GitHub Pages

Follow these steps to make your site live:

1. **Create a New Repository** on GitHub (e.g., `style-under-499`).
2. **Upload Your Files**: You can drag and drop your files into the repository or use git:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REMOTE_URL
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment**, select the **main** branch and `/ (root)` folder.
   - Click **Save**.
4. **Your Live Site**: Your site will be available at `https://your-username.github.io/style-under-499/`.

## Google Sheets Integration

- Ensure your Google Sheet has exactly these headers in the first row:
  `product`, `size`, `price`, `name`, `phone`, `address`, `timestamp`
- Uses **SheetDB** to sync data in real-time.
