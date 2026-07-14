import { DateTimePicker } from "@web/core/datetime/datetime_picker";
import { Time } from "@web/core/l10n/time";
import { patch } from "@web/core/utils/patch";

const { DateTime } = luxon;

/**
 * Khi datetime picker chưa có giá trị, bản gốc của Odoo
 * (addons/web/static/src/core/datetime/datetime_picker.js -> getTimeValues)
 * chỉ lấy GIỜ hiện tại còn PHÚT luôn là 0:
 *
 *     new Time({ hour: (val || DateTime.local()).hour, minute: val?.minute || 0, ... })
 *
 * nên 16:47 hiển thị thành "4:00pm". Patch dưới đây giữ nguyên giờ mà Odoo
 * đã tính (kể cả trường hợp range end được +1 giờ) và điền thêm phút hiện
 * tại cho những ô chưa có giá trị.
 *
 * File này chỉ được nạp trong bundle `survey.survey_assets` nên chỉ các
 * datetime picker trên trang làm khảo sát bị ảnh hưởng.
 */
patch(DateTimePicker.prototype, {
    getTimeValues(props) {
        const timeValues = super.getTimeValues(props);
        if (props.type !== "datetime") {
            return timeValues;
        }
        const now = DateTime.local();
        // timeValues có thể là mảng thưa (chỉ có phần tử tại focusedDateIndex)
        for (const index in timeValues) {
            if (!this.values[index] && timeValues[index]) {
                timeValues[index] = new Time({
                    hour: timeValues[index].hour,
                    minute: now.minute,
                    second: 0,
                });
            }
        }
        return timeValues;
    },
});
