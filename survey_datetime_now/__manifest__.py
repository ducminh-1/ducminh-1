# -*- coding: utf-8 -*-
{
    'name': 'Survey: Current Time in Datetime Picker',
    'summary': 'Hiển thị giờ hiện tại (giờ + phút) làm mặc định trong datetime picker khi làm khảo sát',
    'description': """
Survey: Current Time in Datetime Picker
========================================
Mặc định Odoo 19 Community, khi mở datetime picker của câu hỏi khảo sát
(question type "Datetime") chưa có giá trị, phần giờ hiển thị là giờ hiện
tại nhưng phút luôn bị reset về 0 (ví dụ 16:47 hiển thị thành "4:00pm").

Module này patch component DateTimePicker (chỉ trong bundle
``survey.survey_assets``, tức chỉ trang làm khảo sát) để phần giờ mặc định
hiển thị đúng giờ VÀ phút hiện tại (ví dụ "4:47pm"). Khi người tham gia
chọn ngày, giờ được gán kèm cũng là giờ hiện tại thay vì 0 phút.
    """,
    'version': '19.0.1.0.0',
    'category': 'Marketing/Surveys',
    'license': 'LGPL-3',
    'author': 'ducminh-1',
    'depends': ['survey'],
    'assets': {
        'survey.survey_assets': [
            'survey_datetime_now/static/src/js/survey_datetime_now.js',
        ],
    },
    'installable': True,
    'application': False,
    'auto_install': False,
}
