export function request(ctx) {
  const { base64Image = '', mealType = '' } = ctx.args;

  const prompt = `Am I passing a fridge image in that prompt? after you answer, please print the following: ${mealType}`;

  return {
    resourcePath: `/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke`,
    method: "POST",
    params: {
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `\n\nHuman:${prompt}\n\nAssistant:`,
              },
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: "image/jpeg",
                  data: base64Image,
                },
              },
            ],
          },
        ],
      },
    },
  };
}

export function response(ctx) {
  return {
    body: ctx.result.body,
  };
}
