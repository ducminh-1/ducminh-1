# Survey: Current Time in Datetime Picker (Odoo 19 Community)

Hiển thị **giờ hiện tại (giờ + phút)** làm giá trị mặc định của datetime picker
khi người tham gia làm khảo sát (Survey) trong Odoo 19 Community.

## Vấn đề

Câu hỏi khảo sát kiểu **Datetime** khi chưa có câu trả lời: mở picker lên,
phần giờ hiển thị giờ hiện tại nhưng **phút luôn bị reset về 0**.
Ví dụ đang là `16:47` thì picker hiển thị `4:00pm`.

Nguyên nhân nằm ở component core của Odoo
`addons/web/static/src/core/datetime/datetime_picker.js`, method `getTimeValues()`:

```js
const timeValues = this.values.map(
    (val, index) =>
        new Time({
            hour: /* ... */ (val || DateTime.local()).hour,
            minute: val?.minute || 0,   // <-- chưa có giá trị => phút = 0
            second: val?.second || 0,
        })
);
```

## Cách hoạt động

Module patch `DateTimePicker.prototype.getTimeValues`: với những ô chưa có
giá trị, giữ nguyên giờ Odoo đã tính và điền thêm **phút hiện tại**, nên picker
mở lên hiển thị đúng giờ hiện tại (ví dụ `4:47pm`). Khi người dùng bấm chọn
ngày, giá trị được gán vào ô input cũng mang giờ:phút hiện tại.

File JS chỉ được khai báo trong bundle `survey.survey_assets` (bundle riêng
của trang làm khảo sát), nên **không ảnh hưởng** datetime picker ở backend
hay các trang website khác.

```
survey_datetime_now/
├── __init__.py
├── __manifest__.py
└── static/src/js/survey_datetime_now.js
```

## Cài đặt

1. Copy thư mục `survey_datetime_now` vào đường dẫn addons của bạn
   (khai báo trong `addons_path` của `odoo.conf`).
2. Restart Odoo server.
3. Bật chế độ developer → Apps → **Update Apps List**.
4. Tìm "Survey: Current Time in Datetime Picker" và bấm **Install**
   (hoặc: `odoo-bin -d <db> -i survey_datetime_now`).
5. Nếu đã cài rồi và sửa file JS, chỉ cần restart + hard-refresh trình duyệt
   (assets frontend sẽ được build lại; có thể cần `-u survey_datetime_now`).

## Tuỳ biến thêm

- **Làm tròn phút** (ví dụ 16:47 → 16:45) thay vì phút chính xác, sửa trong
  `survey_datetime_now.js`:

  ```js
  const rounding = props.rounding || 5;
  minute: Math.round(now.minute / rounding) * rounding,
  ```

- **Áp dụng cho mọi trang frontend** (không chỉ survey): chuyển dòng asset
  trong `__manifest__.py` từ bundle `survey.survey_assets` sang
  `web.assets_frontend`.

## Tương thích

- Odoo 19.0 Community (kiến trúc frontend "interactions", input có
  `data-widget="datetime-picker"` được bind qua service `datetime_picker`).
