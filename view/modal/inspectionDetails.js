module.exports = {
    inspectionDetails: async (inspection_details) => {
        console.log('inspectionDetails', inspection_details)
        //     return {
        //         type: "modal",
        //         private_metadata: "{{57.id}}/{{57.name}} {{57.values.c-z7qZNaBo0l[].name}}",
        //         close: {
        //             "type": "plain_text",
        //             "text": "Close",
        //             "emoji": true
        //         },
        //         title: {
        //             "type": "plain_text",
        //             "text": "QC Inspection Details",
        //             "emoji": true
        //         },
        //         blocks: [
        //             {
        //                 "type": "header",
        //                 "text": {
        //                     "type": "plain_text",
        //                     "text": "{{57.name}}"
        //                 }
        //             },
        //             {
        //                 "type": "context",
        //                 "elements": [
        //                     {
        //                         "type": "mrkdwn",
        //                         "text": ":house: {{57.values.c-z7qZNaBo0l[].name}}"
        //                     }
        //                 ]
        //             },
        //             {
        //                 "text": {
        //                     "text": "{{replace(57.values.c-xHnkL0iqu4.name; ""; emptystring)}}",
        //                     "type": "mrkdwn"
        //                 },
        //                 "type": "section",
        //                 "accessory": {
        //                     "text": {
        //                         "text": "Add to calendar",
        //                         "type": "plain_text",
        //                         "emoji": true
        //                     },
        //                     "type": "button",
        //                     "value": "{{57.id}}",
        //                     "url": "https://calendar.google.com/calendar/u/0/r/eventedit?dates={{formatDate(57.values.c- y - UeyX2aPz; "YYYYMMDD")}}T{{formatDate(57.values.c- y - UeyX2aPz; "HHmmss")}}/{{formatDate(57.values.c - y - UeyX2aPz; "YYYYMMDD")}}T{{formatDate(addMinutes(57.values.c - y - UeyX2aPz; 15); "HHmmss")}}&text={{encodeURL(57.name + "+" + replace(57.values.c - xHnkL0iqu4.name; ""; emptystring))}}&details={{encodeURL(replace(57.values.c--Ec9H35dWl; ""; emptystring))}}"
        //                 }
        //             },
        //             {
        //                 "type": "divider"
        //             },
        //             {
        //                 "type": "section",
        //                 "fields": [
        //                     {
        //                         "type": "mrkdwn",
        //                         "text": "*GES*\n{{57.values.c - SvWB8zlvKQ.name}}"
        //                     },
        //                     {
        //                         "type": "mrkdwn",
        //                         "text": "*Date & time*\n{{formatDate(57.values.c - y - UeyX2aPz; "YYYY- MM - DD")}} {{ formatDate(57.values.c-y-UeyX2aPz; "HH: mm") }}"
        //                                 }
        //         ]
        //     },
        //     {
        //         "type": "divider"
        //     },
        //     {
        //         "type": "section",
        //         "text": {
        //             "type": "mrkdwn",
        //             "text": "*{{replace(57.values.c - _E1s89LOC3; ; emptystring)}}*\n{{replace(57.values.c-77T9SW1bqF; ; emptystring)}}"
        //         }
        //     },
        //     {
        //         "type": "divider"
        //     },
        //     {
        //         "type": "section",
        //         "text": {
        //             "type": "mrkdwn",
        //             "text": "*Inspection Purpose*\n{{replace(57.values.c--Ec9H35dWl; emptystring)}}"
        //         }
        //     },
        //     {
        //         "type": "divider"
        //     },
        //     {
        //         "type": "section",
        //         "text": {
        //             "type": "mrkdwn",
        //             "text": "<{{57.browserLink}}|Open in Coda>"
        //         },
        //         "accessory": {
        //             "type": "button",
        //             "text": {
        //                 "type": "plain_text",
        //                 "text": "Submit inspection report"
        //             },
        //             "style": "primary",
        //             "action_id": "qc_inspection_submit",
        //             "value": "inspection_report"
        //         }
        //     }
        //                     ]
        // }
    },
    problemSolving: async (payload) => { },
    generalInspection: async (payload) => { },
}