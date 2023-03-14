const coda = require('../../api/coda');
const message = require('../message');

module.exports = {
    submitInspectionReport: async (payload) => {
        payload.logger.info('submitInspectionReport', payload.body.type);

        const private_metadata = JSON.parse(payload.view.private_metadata);
        const values = payload.view.state.values;

        // Map values from payload to get column ID and value

        const cells = [
            {
                column: 'c-Mnmrl1Sz98',
                value: values.status_select.status_select.selected_option.value
            },
            {
                column: 'c-uh1zhqdkGw',
                value: values.report_summary.report_summary.value
            },
        ]

        const context_string = [];

        for (const column in values.checklist) {
            if (values.checklist[column].selected_option) {
                cells.push({
                    column: column,
                    value: values.checklist[column].selected_option.value
                })
                context_string.push(`${column}: ${values.checklist[column].selected_option.value}`)
            }
        }

        console.dir(cells, { depth: null });

        // Update values to Coda
        await coda.updateRow(process.env.CODA_GUEST_DOC_ID, process.env.CODA_GUEST_QC_TABLE_ID, private_metadata.id, cells);

        const text = `*${private_metadata.unit_name}* has been updated to ${values.status_select.status_select.selected_option.value} by <@${payload.body.user.id}>`
        const context = `${values.report_summary.report_summary.value}\n\n${context_string.join(', ')}`

        // Send success message
        await message.sendToChannel(payload, text, context);
    }
}