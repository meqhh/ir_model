{
    'name': 'Model view Relation show',
    'version': '1.0',
    'summary': 'Showing Relation what related model for Many2one, One2many, and Many2many',
    'sequence': 2,
    'description': """
    version :
    0.0.1 : This module make field with type Many2one, One2many, and Many2many on ir.model form view shows their related model.
    0.0.2 : Show \"related\" relation and store true or not.
    0.0.3 : Bypass enterprise subscription blockUI LMAO (does this count as crime?),
    """,
    'category': 'other',
    'website': 'https://www.github.com/meqhh',
    'depends': [
        'base',
        'web',
        'web_enterprise',
    ],
    'license': 'LGPL-3',
    'data': [
        # views
        "views/ir_model_view.xml",
    ],
    'assets': {
        'web.assets_backend': [
            # 'ir_model/static/lib/src/core/debug/debug_menu.js',
            # 'ir_model/static/lib/src/core/debug/debug_menu.xml',
            'ir_model/static/src/home_menu/*.js',
        ]
    },
    'installable': True,
    'application': True,
    'auto_install': True,
}
