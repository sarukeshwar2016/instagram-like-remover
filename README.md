# Instagram Like Remover

A browser-console JavaScript utility for removing Instagram likes in bulk using Instagram's built-in date filter.

> ⚠️ **Unofficial project:** This tool is not affiliated with, endorsed by, or sponsored by Instagram or Meta.

## Features

- Remove Instagram likes in bulk
- Process up to 50 likes per batch
- Automatically repeat batches
- Uses Instagram's built-in date filter
- Automatically confirms the "Unlike" action
- Waits for Instagram to refresh between batches
- Does not require your Instagram password
- Does not require Instagram API credentials

---

## How to Use

### 1. Open Instagram

Open Instagram in your desktop browser:
[https://www.instagram.com/](https://www.instagram.com/)

Log in to your Instagram account.

### 2. Open Your Activity

Go to:
**Your Activity → Interactions → Likes**

This page contains the posts and reels that you have liked.

### 3. Set the Date Range

Click **Sort & Filter**.
Choose the date range you want to process.

For example:
```text
Start date: December 26, 2017
End date:   January 31, 2023
```

Then apply the filter.

**Important:**
The script works with the likes currently displayed by Instagram. It does not independently verify the date of every post. Therefore, always verify that the correct date range is selected before running the script.

### 4. Choose the Sort Order

You can use either:
- Newest to Oldest
- Oldest to Newest

The sort order does not determine the date range. The Sort & Filter settings determine which likes are displayed.

### 5. Open the Browser Console

The script runs through your browser's Developer Console.

**Google Chrome**
- On Windows/Linux: `Ctrl + Shift + J`
- On macOS: `Cmd + Option + J`

This opens: **Developer Tools → Console**

### 6. Allow Pasting

Chrome may show a security warning such as:
> **Stop!**
> This is a browser feature intended for developers.

This is Chrome's protection against accidentally pasting malicious code into the Developer Console. If you have reviewed and understand the code in this repository, type the following command manually into the Console:

```text
allow pasting
```

Press **Enter**.

⚠️ *Type `allow pasting` manually. Do not copy and paste the command itself.*
After this, Chrome should allow you to paste JavaScript into the Console.

### 7. Get the Script

Open `instagram-like-remover.js` from this repository.
Review the source code before running it.

The script does not require:
- Instagram password
- Session cookies
- Access tokens
- API keys
- External login credentials

### 8. Run the Script

Copy the contents of `instagram-like-remover.js`.
Paste it into the browser Console.
Press **Enter**.

The script will begin processing the filtered likes.

### 9. How It Works

The script processes up to 50 likes per batch.
The process is:

```text
Open Instagram
      ↓
Your Activity
      ↓
Interactions → Likes
      ↓
Set Start/End Date
      ↓
Click Select
      ↓
Select up to 50 likes
      ↓
Click Unlike
      ↓
Confirm Unlike
      ↓
Wait for Instagram to refresh
      ↓
Select the next batch
      ↓
Repeat
```

For example, if Instagram displays 137 likes within your selected date range:
- **Batch 1** → 50 likes
- **Batch 2** → 50 likes
- **Batch 3** → 37 likes

The script continues processing batches until there are no more selectable likes.

### 10. Example Console Output

You may see output similar to:

```text
Selecting likes...
Found 50 selectable likes.
Selected 50 likes.
Clicking Unlike...
Confirming Unlike...
Removing 50 likes...
Removed 50 likes.
Waiting for next batch...
```

Then it continues:

```text
Selecting likes...
Found 50 selectable likes.
Selected 50 likes.
Clicking Unlike...
Confirming Unlike...
Removing 50 likes...
Removed 50 likes.
Waiting for next batch...
```

If fewer than 50 remain:

```text
Found 27 selectable likes.
Selected 27 likes.
Clicking Unlike...
Confirming Unlike...
Removed 27 likes.
```

### 11. Stop the Script

If you want to stop the script, you can refresh or close the Instagram tab. You can also close Developer Tools.

---

## Important Notes

### Date Filtering
The script relies on Instagram's own Sort & Filter functionality.
For example:
```text
Start: December 26, 2017
End:   January 31, 2023
```
Instagram determines which likes appear in the filtered results. The script then interacts with those displayed results. **Always verify the date range before starting.**

### Instagram Interface Changes
This script depends on Instagram's current web interface and DOM structure.
Instagram can change:
- HTML structure
- Button names
- Accessibility labels
- CSS structure
- Date filtering
- Confirmation dialogs
- Loading behavior

If Instagram changes its interface, this script may stop working or require modifications.

### Safety
This project does not require access to your Instagram credentials.
Never enter or share:
- Instagram passwords
- Session cookies
- Access tokens
- API keys
- Authentication tokens

with this project. Only run code that you have reviewed and understand.

### Privacy
The script runs directly inside your browser. It does not intentionally send your Instagram data to an external server. No external API or database is required.

---

## Disclaimer

This is an unofficial community-developed script. It is not affiliated with, endorsed by, or sponsored by Instagram or Meta Platforms, Inc.

**Use this software at your own risk.**
The author is not responsible for:
- Accidental removal of likes
- Changes to your Instagram account
- Instagram interface changes
- Script failures
- Account restrictions
- Any other consequences resulting from using the script

Always verify the selected date range before starting.

---

## Contributing

If Instagram changes its interface and the script stops working, contributions and fixes are welcome.
When reporting an issue, include:
- Browser and version
- What happened
- Relevant Console output
- A screenshot if useful

**Never include passwords, session cookies, access tokens, or other private account information in an issue.**

---

## License

This project is licensed under the MIT License.
See the `LICENSE` file for details.