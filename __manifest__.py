{
    'name': 'Model view Relation show',
    'version': '1.0',
    'summary': 'Showing Relation what related model for Many2one, One2many, and Many2many',
    'sequence': 2,
    'description': """
    This module make field with type Many2one, One2many, and Many2many on ir.model form view shows the related model.
    """,
    'category': 'other',
    'website': 'https://www.github.com/meqhh',
    'depends': [
        'base'
    ],
    'license': 'LGPL-3',
    'data': [
        # views
        "views/ir_model_view.xml",
    ],
    'assets': {
        'point_of_sale._assets_pos': [
        ],
    },
    'installable': True,
    'application': True,
    'auto_install': True,
}
