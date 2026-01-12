# How to Create and Use a GitHub Personal Access Token

GitHub requires a Personal Access Token instead of your password for Git operations. Here's how to create one:

## Step 1: Create a Personal Access Token

1. **Go to GitHub Settings:**
   - Open [https://github.com](https://github.com) in your browser
   - Make sure you're logged in
   - Click your profile picture in the top right corner
   - Click **"Settings"** from the dropdown menu

2. **Navigate to Developer Settings:**
   - Scroll down the left sidebar
   - At the very bottom, click **"Developer settings"**

3. **Go to Personal Access Tokens:**
   - Click **"Personal access tokens"** in the left sidebar
   - Click **"Tokens (classic)"** (the first option)

4. **Generate New Token:**
   - Click the **"Generate new token"** button
   - Click **"Generate new token (classic)"** from the dropdown

5. **Fill Out the Form:**
   - **Note:** Type something like "Stock Profit Tracker" or "My Projects" (this is just a label for you)
   - **Expiration:** Choose how long you want it to last:
     - `90 days` (good for testing)
     - `No expiration` (easier, but less secure - only use if you're comfortable)
   - **Select scopes:** Check the box next to **"repo"**
     - This gives access to all your repositories
     - When you check "repo", it will automatically check all the sub-options (that's fine)

6. **Scroll Down and Click "Generate token":**
   - The green button at the bottom of the page

7. **IMPORTANT - Copy the Token:**
   - You'll see a page with your token
   - It will look like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **COPY THIS TOKEN NOW** - you won't be able to see it again!
   - Click the copy icon next to it, or select all and copy (Cmd+C on Mac)

⚠️ **WARNING:** If you close this page without copying the token, you'll have to create a new one!

## Step 2: Use the Token Instead of Password

Now go back to Terminal and try pushing again:

1. **Run the push command again:**
   ```bash
   git push -u origin main
   ```

2. **When it asks for credentials:**
   - **Username:** `jacobmiller2000` (your GitHub username)
   - **Password:** Paste your Personal Access Token (the `ghp_...` token you just copied)
     - It won't show anything as you type - that's normal for security
     - Just paste it and press Enter

3. **It should work now!**
   - You'll see messages like "Writing objects" and "Counting objects"
   - When you see "Branch 'main' set up to track remote branch 'main'", you're done!

## Alternative: Save Your Token (Optional)

If you don't want to enter the token every time, you can save it:

### Option A: Use Git Credential Helper (Recommended)

1. **Configure Git to remember your credentials:**
   ```bash
   git config --global credential.helper osxkeychain
   ```

2. **Try pushing again:**
   ```bash
   git push -u origin main
   ```

3. **Enter your credentials once:**
   - Username: `jacobmiller2000`
   - Password: Your Personal Access Token
   - Git will save it in your Mac's keychain

4. **Future pushes won't ask for credentials!**

### Option B: Use SSH Instead (Advanced)

If you want to avoid tokens altogether, you can set up SSH keys, but that's more complex. The token method above is easier.

## Troubleshooting

### "Token not working"
- Make sure you copied the ENTIRE token (it's long, starts with `ghp_`)
- Make sure you selected "repo" scope when creating it
- Try creating a new token

### "Still asking for password"
- Make sure you're pasting the TOKEN, not your GitHub password
- The token starts with `ghp_` and is much longer than a password

### "Permission denied"
- Make sure the token has "repo" scope checked
- Make sure you're using the correct GitHub username

## Quick Reference

**To push code:**
```bash
git push -u origin main
```

**When asked:**
- Username: `jacobmiller2000`
- Password: `ghp_your_token_here` (paste the token, not your password)

---

**Once you've successfully pushed, you can continue with Part 2 of the Vercel deployment guide!**
