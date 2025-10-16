/* @odoo-module */

import { patch } from "@web/core/utils/patch";
import { DebugMenuBasic } from "@web/core/debug/debug_menu_basic";
import { useService } from "@web/core/utils/hooks";
import { registry } from "@web/core/registry";
import { Dialog } from "@web/core/dialog/dialog";
import { Component, onWillStart, useState, xml } from "@odoo/owl";
import { _t } from "@web/core/l10n/translation";
import { formatMany2one } from "@web/views/fields/formatters";
import { formatDateTime, deserializeDateTime } from "@web/core/l10n/dates";

const debugRegistry = registry.category("debug");

patch(DebugMenuBasic.prototype, {

    setup() {
        super.setup();
        this.user = useService("user");
        onWillStart(async () => {
            this.isPortalBackendUser = await this.user.hasGroup('portal_backend.group_portal_backend');
        });
        console.log(debugRegistry);
        console.log('debugRegistrydebugRegistrydebugRegistry');
    },

    viewMetaData() {
        console.log(debugRegistry);
        console.log(debugRegistry.subRegistries.form.content.viewMetadata);
        const debugFunc = debugRegistry.subRegistries.form.content.viewMetaData;

    },
});

class MetadataDialog extends Component {
    setup() {
        this.orm = useService("orm");
        this.dialogService = useService("dialog");
        this.title = _t("View Metadata");
        this.state = useState({});
        onWillStart(() => this.loadMetadata());
    }

    onClickCreateXmlid() {
        const context = Object.assign({}, this.context, {
            default_module: "__custom__",
            default_res_id: this.state.id,
            default_model: this.props.resModel,
        });
        this.dialogService.add(FormViewDialog, {
            context,
            onRecordSaved: () => this.loadMetadata(),
            resModel: "ir.model.data",
        });
    }

    async toggleNoupdate() {
        await this.env.services.orm.call("ir.model.data", "toggle_noupdate", [
            this.props.resModel,
            this.state.id,
        ]);
        await this.loadMetadata();
    }

    async loadMetadata() {
        const args = [[this.props.resId]];
        const result = await this.orm.call(this.props.resModel, "get_metadata", args);
        const metadata = result[0];
        this.state.id = metadata.id;
        this.state.xmlid = metadata.xmlid;
        this.state.xmlids = metadata.xmlids;
        this.state.noupdate = metadata.noupdate;
        this.state.creator = formatMany2one(metadata.create_uid);
        this.state.lastModifiedBy = formatMany2one(metadata.write_uid);
        this.state.createDate = formatDateTime(deserializeDateTime(metadata.create_date));
        this.state.writeDate = formatDateTime(deserializeDateTime(metadata.write_date));
    }
}
MetadataDialog.template = "ir_model.MetadataDialog";
MetadataDialog.components = { Dialog };

export function Metadata({ component, env }) {
    const resId = component.model.root.resId;
    if (!resId) {
        return null;
    }
    return {
        type: "item",
        description: _t("View Metadata"),
        callback: () => {
            env.services.dialog.add(MetadataDialog, {
                resModel: component.props.resModel,
                resId,
            });
        },
        sequence: 320,
    };
}

debugRegistry.category("view").add("Metadata", Metadata);
