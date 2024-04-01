import { amplifyClient } from "./amplify-utils";

export async function generateRecipe(img: String, formData: FormData) {
  const response = await amplifyClient.queries.askBedrock({
    base64Image: img.toString(),
    mealType: formData.get("type")?.toString() || "",
  });
  console.log('base64 before parsing data', img.toString());
  const res = JSON.parse(response.data?.body!);
  console.log('response', res);
  const content = res.content[0].text;
  console.log('content', content);
  return content || "test";
}
