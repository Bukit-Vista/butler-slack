module.exports = {
    addKnowledge: async (data) => {

        const knowledge_source_options = await data.knowledge_sources.map((knowledge_source) => {
            return {
                "text": {
                    "type": "plain_text",
                    "text": knowledge_source.name,
                    "emoji": true
                },
                "value": `${knowledge_source.id}`
            }
        });

        const view = {
            "type": "modal",
            "private_metadata": `${data.private_metadata}`,
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
                        "action_id": "tag",
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
                        "action_id": "knowledge_source",
                        "initial_option": knowledge_source_options.find(option => option.text.text === data.knowledge_source),
                        "options": knowledge_source_options
                    }
                },
                {
                    "type": "input",
                    "block_id": "object_name",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "object_name",
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
                        "action_id": "answer",
                        "multiline": true
                    }
                }
            ]
        }

        // console.log('[Views]', 'addKnowledge')
        // console.dir(view, { depth: null })
        return view
    }
}