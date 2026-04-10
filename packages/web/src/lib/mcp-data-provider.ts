import type { DataProvider } from "@better-design/shared/mcp";
import { searchDesignSystems, getDesignSystemById } from "@/lib/design-systems";
import {
  listFoundationalDocs,
  getPrincipleByTopic,
  searchFoundationalDocs,
  getReviewRules,
} from "@/lib/foundational-docs";
import {
  searchIconLibraries,
  getIconLibraryById,
  searchIconsInLibrary,
} from "@/lib/icon-libraries";

export function createDbDataProvider(): DataProvider {
  return {
    searchDesignSystems,

    async getDesignSystemById(id) {
      const system = await getDesignSystemById(id);
      if (!system) return null;
      return {
        metadata: {
          id: system.metadata.id,
          title: system.metadata.title,
          description: system.metadata.description,
          personality: system.metadata.personality,
          industry: system.metadata.industry,
          componentCount: system.metadata.componentCount,
          primaryColor: system.metadata.primaryColor,
          borderRadius: system.metadata.borderRadius,
          font: system.metadata.font,
        },
        components: system.components.map((c) => ({
          id: c.id,
          name: c.name,
          description: c.description,
          code: c.code,
        })),
      };
    },

    async listPrinciples() {
      const docs = await listFoundationalDocs();
      return docs.filter((d) => d.id.startsWith("principle-"));
    },

    getPrincipleByTopic,

    async searchPrinciples(query, limit = 5) {
      const results = await searchFoundationalDocs(query, limit);
      return results.map((r) => ({
        id: r.id,
        title: r.title,
        content: r.content,
        matchScore: r.matchScore,
      }));
    },

    async getReviewRules(category = "all") {
      const rules = await getReviewRules();
      if (category === "all") return rules;
      return rules.filter((r) =>
        r.id.toLowerCase().includes(category.toLowerCase()),
      );
    },

    searchIconLibraries,

    async getIconLibraryById(id) {
      const lib = await getIconLibraryById(id);
      if (!lib) return null;
      return {
        id: lib.id,
        name: lib.name,
        prefix: lib.prefix,
        variants: lib.variants,
        defaultVariant: lib.defaultVariant,
        variantFormat: lib.variantFormat,
      };
    },

    searchIconsInLibrary,
  };
}
