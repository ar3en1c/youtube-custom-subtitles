# Custom Subtitles for YouTube

A browser extension (Chrome **and** Firefox) that lets you load your own subtitle file (`.srt` or `.vtt`) on any YouTube video — perfect for watching videos with subtitles you translated yourself.

---

## 🇬🇧 English

### Features
- Load your own `.srt` or `.vtt` subtitle file on any YouTube video
- Subtitles stay in sync while seeking, and work in fullscreen
- Style editor (extension popup):
  - Text color
  - Outline on/off, outline color, outline size
  - Background color and background opacity
- Style settings are saved automatically on your computer
- No account, no network requests — everything stays on your computer

### Install

**Chrome**
1. Download / copy the `youtube-custom-subtitles` folder.
2. Open Chrome and go to `chrome://extensions`.
3. Turn on **Developer mode** (top-right switch).
4. Click **Load unpacked** and select the `youtube-custom-subtitles` folder.

**Firefox**
1. Download / copy the `youtube-custom-subtitles` folder.
2. Open Firefox and go to `about:debugging#/runtime/this-firefox`.
3. Click **Load Temporary Add-on…**.
4. Select the `manifest.json` file inside the `youtube-custom-subtitles` folder.

> Temporary add-ons are removed when Firefox restarts. To install it permanently, submit it to [addons.mozilla.org](https://addons.mozilla.org) or use Firefox Developer Edition / Nightly with `xpinstall.signatures.required` set to `false`.

### Usage
1. Open any YouTube video.
2. Click the **📄 Subtitle** button at the top-right corner of the video player.
3. Pick your `.srt` or `.vtt` file — the subtitles appear immediately.
4. Click **✕** (next to the button) to remove the subtitles.
5. Turn off YouTube's own captions (CC button) so they don't overlap.

### Changing the style
Click the extension icon in the Chrome toolbar (puzzle piece → pin it if needed).
A popup opens where you can change text color, outline, and background.
Changes apply **live** on the video while the popup is open and are saved automatically.

### Supported formats
**SRT:**
```
1
00:00:01,000 --> 00:00:02,500
Hello world

2
00:01:02,500 --> 00:02:03,000
Second subtitle
can have multiple lines
```
**VTT:**
```
WEBVTT

00:01.000 --> 00:02.500
Hello world
```

### Good to know
- After a page reload you need to pick the subtitle file again (the file is not stored).
- When you navigate to another video, the loaded subtitles are cleared automatically.
- After updating the extension files, click **↻ reload** in `chrome://extensions` and refresh the YouTube tab.

### Files
| File | Purpose |
|---|---|
| `manifest.json` | Extension configuration (Manifest V3) |
| `content.js` | Injected into YouTube: player button, subtitle parser & overlay |
| `popup.html` / `popup.js` | Style settings popup |
| `test.html` | Self-check for the subtitle parser (open in any browser) |

---

## 🇮🇷 فارسی

### این افزونه چیست؟
یک افزونه‌ی مرورگر (کروم **و** فایرفاکس) که به شما اجازه می‌دهد فایل زیرنویس خودتان (`.srt` یا `.vtt`) را روی هر ویدیوی یوتیوب بارگذاری کنید — مناسب برای تماشای ویدیوها با زیرنویسی که خودتان ترجمه کرده‌اید.

### امکانات
- بارگذاری فایل زیرنویس `.srt` یا `.vtt` روی هر ویدیوی یوتیوب
- هماهنگی زیرنویس هنگام جلو/عقب بردن ویدیو و کار کردن در حالت تمام‌صفحه
- ویرایشگر ظاهر زیرنویس (پنجره‌ی افزونه):
  - رنگ متن
  - خط دور (خاموش/روشن)، رنگ خط دور، ضخامت خط دور
  - رنگ پس‌زمینه و میزان شفافیت پس‌زمینه
- تنظیمات ظاهر به‌صورت خودکار روی رایانه‌ی شما ذخیره می‌شود
- بدون حساب کاربری و بدون اتصال به اینترنت — همه‌چیز روی کامپیوتر خودتان می‌ماند

### نصب

**کروم**
1. پوشه‌ی `youtube-custom-subtitles` را دانلود یا کپی کنید.
2. در کروم به آدرس `chrome://extensions` بروید.
3. گزینه‌ی **Developer mode** را (بالا سمت راست) روشن کنید.
4. روی **Load unpacked** کلیک کنید و پوشه‌ی `youtube-custom-subtitles` را انتخاب کنید.

**فایرفاکس**
1. پوشه‌ی `youtube-custom-subtitles` را دانلود یا کپی کنید.
2. در فایرفاکس به آدرس `about:debugging#/runtime/this-firefox` بروید.
3. روی **Load Temporary Add-on…** کلیک کنید.
4. فایل `manifest.json` را داخل پوشه‌ی `youtube-custom-subtitles` انتخاب کنید.

> افزونه‌های موقت بعد از بستن فایرفاکس حذف می‌شوند. برای نصب دائمی، آن را در [addons.mozilla.org](https://addons.mozilla.org) منتشر کنید یا از Firefox Developer Edition / Nightly با `xpinstall.signatures.required = false` استفاده کنید.

### استفاده
1. هر ویدیویی را در یوتیوب باز کنید.
2. روی دکمه‌ی **📄 Subtitle** در گوشه‌ی بالا-راست پخش‌کننده کلیک کنید.
3. فایل `.srt` یا `.vtt` خود را انتخاب کنید — زیرنویس فوراً نمایش داده می‌شود.
4. برای حذف زیرنویس روی **✕** (کنار دکمه) کلیک کنید.
5. زیرنویس خود یوتیوب (دکمه‌ی CC) را خاموش کنید تا روی هم نیفتند.

### تغییر ظاهر زیرنویس
روی آیکون افزونه در نوار ابزار کروم کلیک کنید (آیکون پازل → در صورت نیاز آن را سنجاق کنید).
پنجره‌ای باز می‌شود که می‌توانید رنگ متن، خط دور و پس‌زمینه را تغییر دهید.
تغییرات همان لحظه روی ویدیو اعمال می‌شوند و به‌صورت خودکار ذخیره می‌شوند.

### فرمت‌های پشتیبانی‌شده
**SRT:**
```
1
00:00:01,000 --> 00:00:02,500
سلام دنیا

2
00:01:02,500 --> 00:02:03,000
زیرنویس دوم
می‌تواند چند خط داشته باشد
```
**VTT:**
```
WEBVTT

00:01.000 --> 00:02.500
سلام دنیا
```

### نکات مهم
- بعد از بارگذاری مجدد صفحه، باید دوباره فایل زیرنویس را انتخاب کنید (فایل ذخیره نمی‌شود).
- وقتی به ویدیوی دیگری می‌روید، زیرنویس قبلی به‌صورت خودکار پاک می‌شود.
- بعد از به‌روزرسانی فایل‌های افزونه، در `chrome://extensions` روی **↻ reload** کلیک کنید و صفحه‌ی یوتیوب را هم رفرش کنید.

### فایل‌ها
| فایل | کاربرد |
|---|---|
| `manifest.json` | پیکربندی افزونه (Manifest V3) |
| `content.js` | تزریق به یوتیوب: دکمه‌ی پخش‌کننده، خواندن زیرنویس و نمایش آن |
| `popup.html` / `popup.js` | پنجره‌ی تنظیمات ظاهر |
| `test.html` | تست خودکار خواننده‌ی زیرنویس (در هر مرورگری باز کنید) |
