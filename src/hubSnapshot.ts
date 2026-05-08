import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

interface HubHotFile {
  path: string;
  intent_count: number;
  risk_intent_count?: number;
  recent_count?: number;
}

interface HubData {
  generated_at?: string;
  dashboard?: {
    total_intents?: number;
    proposed_intents?: number;
    merged_intents?: number;
    risk_intents?: number;
    file_count?: number;
    actor_count?: number;
    hot_files?: HubHotFile[];
  };
}

export interface HubSnapshot {
  generatedAt: string;
  totalIntents: number;
  proposedIntents: number;
  mergedIntents: number;
  riskIntents: number;
  fileCount: number;
  actorCount: number;
  hotFiles: Array<{
    path: string;
    intentCount: number;
    riskIntentCount: number;
    recentCount: number;
  }>;
}

const hubDataPath = join(process.cwd(), "public", "hub", "data", "intents.json");

export function loadHubSnapshot(): HubSnapshot | null {
  if (!existsSync(hubDataPath)) {
    return null;
  }

  try {
    const data = JSON.parse(readFileSync(hubDataPath, "utf8")) as HubData;
    const dashboard = data.dashboard;
    if (!dashboard || !data.generated_at) {
      return null;
    }

    return {
      generatedAt: data.generated_at,
      totalIntents: dashboard.total_intents ?? 0,
      proposedIntents: dashboard.proposed_intents ?? 0,
      mergedIntents: dashboard.merged_intents ?? 0,
      riskIntents: dashboard.risk_intents ?? 0,
      fileCount: dashboard.file_count ?? 0,
      actorCount: dashboard.actor_count ?? 0,
      hotFiles: (dashboard.hot_files ?? []).slice(0, 5).map((file) => ({
        path: file.path,
        intentCount: file.intent_count,
        riskIntentCount: file.risk_intent_count ?? 0,
        recentCount: file.recent_count ?? 0,
      })),
    };
  } catch {
    return null;
  }
}
