module.exports = {
    addKnowledge: (data) => {
        const view = {
            "type": "modal",
            "submit": {
                "type": "plain_text",
                "text": "Submit",
                "emoji": true
            },
            "close": {
                "type": "plain_text",
                "text": "Cancel",
                "emoji": true
            },
            "title": {
                "type": "plain_text",
                "text": "Add knowledge",
                "emoji": true
            },
            "blocks": [
                {
                    "type": "input",
                    "block_id": "tag",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "plain_text_input-action",
                        "initial_value": `${data.tag}`
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "What is the topic of this question?",
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "block_id": "knowledge_source",
                    "label": {
                        "type": "plain_text",
                        "text": `Where is the best source of knowledge for ${data.tag}?`,
                        "emoji": true
                    },
                    "element": {
                        "type": "radio_buttons",
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Airbnb listing",
                                    "emoji": true
                                },
                                "value": "1"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Coda HAR guideline",
                                    "emoji": true
                                },
                                "value": "2"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Coda GES Inspection",
                                    "emoji": true
                                },
                                "value": "3"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Trello Partnership Management",
                                    "emoji": true
                                },
                                "value": "4"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Property notes",
                                    "emoji": true
                                },
                                "value": "5"
                            }
                        ]
                    }
                },
                {
                    "type": "input",
                    "block_id": "object_name",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "plain_text_input-action",
                        "initial_value": `${data.object_id}/${data.object_name}`
                    },
                    "label": {
                        "type": "plain_text",
                        "text": `What is the ${data.object_type}?`,
                        "emoji": true
                    }
                },
                {
                    "type": "input",
                    "block_id": "answer",
                    "label": {
                        "type": "plain_text",
                        "text": `${data.question}`,
                        "emoji": true
                    },
                    "element": {
                        "type": "plain_text_input",
                        "multiline": true
                    }
                }
            ]
        }
        return view;
    }
}