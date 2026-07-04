import ai from "../config/gemini.js";

export const extractExpense = async (text) => {

    const prompt = `
Extract the expense details.

Return ONLY valid JSON.

Today's date is ${new Date().toISOString().split("T")[0]}.

Schema:

{
"title":"",
"amount":0,
"type":"expense",
"category":"",
"transactionDate":"YYYY-MM-DD"
}

Categories:

Food
Transport
Shopping
Entertainment
Bills
Healthcare
Education
Salary
Others

Sentence:

${text}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });
    console.log(response.text);
    const cleaned = response.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleaned);
};
export const extractExpenseFromReceipt = async (imageBuffer, mimeType) => {

    const prompt = `
Extract the expense details from this receipt.

Return ONLY valid JSON.

Today's date is ${new Date().toISOString().split("T")[0]}.

Schema:

{
"title":"",
"amount":0,
"type":"expense",
"category":"",
"transactionDate":"YYYY-MM-DD"
}

Categories:

Food
Travel
Shopping
Bills
Medical
Entertainment
Education
Salary
Investment
Other

Rules:

- title should be the main purchased item or merchant.
- amount should be the total amount paid.
- type should always be "expense".
- category must be one of the categories above.
- If the receipt date is missing, use today's date.
Return ONLY JSON.
`;

    const response = await ai.models.generateContent({

        model: "gemini-2.5-flash",

        contents: [

            {
                text: prompt
            },

            {
                inlineData: {
                    mimeType,
                    data: imageBuffer.toString("base64")
                }
            }

        ]

    });

    const cleaned = response.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    console.log(cleaned);

    return JSON.parse(cleaned);

};