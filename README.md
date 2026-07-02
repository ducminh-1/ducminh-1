# ⚡ FlashLearn — App học tiếng Anh bằng Flashcard

Ứng dụng học từ vựng tiếng Anh theo kiểu **Quizlet**: tạo bộ thẻ, nhập flashcard và ôn tập với nhiều chế độ học. Toàn bộ app nằm trong một file `index.html` duy nhất — không cần cài đặt, không cần server, dữ liệu lưu trực tiếp trên trình duyệt (localStorage).

## Cách chạy

Mở file `index.html` bằng trình duyệt là xong. Hoặc deploy lên GitHub Pages:

1. Vào **Settings → Pages** của repo
2. Chọn **Source: Deploy from a branch**, branch `main`, thư mục `/ (root)`
3. Truy cập `https://<username>.github.io/<repo>/`

## Tính năng

### 🗂 Quản lý bộ thẻ
- Tạo / đổi tên / xoá bộ thẻ
- Theo dõi tiến độ (số thẻ đã thuộc) trên từng bộ

### ✏️ Nhập flashcard
- Thêm thẻ thủ công (có nút "Lưu & thêm tiếp" để nhập nhanh)
- **Nhập hàng loạt**: dán danh sách từ Excel/Google Sheets hoặc file text, mỗi dòng một thẻ, ngăn cách bằng Tab, ` - `, `,` hoặc `;`

### 📖 Tạo bộ thẻ từ tài liệu (PDF/TXT)
Upload sách từ vựng (VD: *600 Essential Words for the TOEIC*) — app sẽ:
1. Đọc file PDF (bằng pdf.js, ngay trên trình duyệt) hoặc TXT
2. **Tách theo chương**: nhận diện tiêu đề `Chapter / Unit / Lesson / Week / Part / Day / Chương / Bài` + số
3. **Lọc từ vựng** trong mỗi chương theo 2 chế độ:
   - *Dòng từ vựng có nghĩa*: nhận diện các dòng dạng `từ — nghĩa`, `từ: nghĩa`, `từ (n.) nghĩa`...
   - *Tự động*: lọc từ tiếng Anh theo tần suất (bỏ từ phổ thông), nghĩa tự điền sau
4. Xem trước từng chương, bỏ tick chương không cần → **tạo mỗi chương một bộ thẻ riêng**

### 📚 Ba chế độ học
| Chế độ | Mô tả |
|---|---|
| 🃏 **Lật thẻ** | Xem từ → lật xem nghĩa, đánh dấu "Đã thuộc / Chưa thuộc". Thẻ chưa thuộc tự động lặp lại. Hỗ trợ phím tắt: `Space` lật thẻ, `←` chưa thuộc, `→` đã thuộc |
| ❓ **Trắc nghiệm** | Chọn nghĩa đúng trong 4 đáp án |
| ✍️ **Gõ đáp án** | Nhìn nghĩa tiếng Việt, gõ từ tiếng Anh |

### 🔊 Phát âm
Bấm nút loa trên bất kỳ thẻ nào để nghe phát âm tiếng Anh (Web Speech API).

### 💾 Sao lưu / khôi phục
Xuất toàn bộ dữ liệu ra file JSON và nhập lại trên máy khác.

## Công nghệ
HTML + CSS + JavaScript thuần, không dependency. Dữ liệu lưu bằng `localStorage`.
