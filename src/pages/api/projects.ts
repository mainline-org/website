import { projects } from "../../aiKnowledge";
import { json } from "./_json";

export const prerender = true;

export function GET() {
  return json({ projects });
}
