import type { DataProvider, IconLibraryInfo } from "@better-design/shared/mcp";
import {
  searchDesignSystems as apiSearchDesignSystems,
  getDesignSystem,
  getDesignSystemComponents,
  listPrinciples as apiListPrinciples,
  getPrinciple,
  searchPrinciples as apiSearchPrinciples,
  getReviewRules as apiGetReviewRules,
  searchIconLibraries as apiSearchIconLibraries,
  searchIcons as apiSearchIcons,
} from "./api-client.js";

export function createHttpDataProvider(): DataProvider {
  return {
    async searchDesignSystems(query: string, limit = 5) {
      const { results } = await apiSearchDesignSystems(query, limit);
      return results;
    },

    async getDesignSystemById(id: string) {
      const [systemRes, componentsRes] = await Promise.all([
        getDesignSystem(id),
        getDesignSystemComponents(id),
      ]);
      return {
        metadata: systemRes.metadata,
        components: componentsRes.components,
      };
    },

    async listPrinciples() {
      const { principles } = await apiListPrinciples();
      return principles;
    },

    async getPrincipleByTopic(topic: string) {
      try {
        return await getPrinciple(topic);
      } catch {
        return null;
      }
    },

    async searchPrinciples(query: string, limit = 5) {
      const { results } = await apiSearchPrinciples(query, limit);
      return results;
    },

    async getReviewRules(category = "all") {
      const { rules } = await apiGetReviewRules(category);
      return rules;
    },

    async searchIconLibraries(query: string, limit = 5) {
      const { results } = await apiSearchIconLibraries(query, limit);
      return results;
    },

    async getIconLibraryById(id: string) {
      // The search-icons endpoint handles library lookup server-side.
      // We do a lightweight search to get the library info.
      const { results } = await apiSearchIconLibraries(id, 1);
      const match = results.find((r) => r.id === id);
      if (!match) return null;
      return {
        id: match.id,
        name: match.name,
        prefix: match.prefix,
        variants: match.variants,
        defaultVariant: match.defaultVariant,
        variantFormat: null,
      };
    },

    async searchIconsInLibrary(
      query: string,
      library: IconLibraryInfo,
      variant?: string,
      limit = 15,
    ) {
      const { icons } = await apiSearchIcons(library.id, query, variant, limit);
      return icons;
    },
  };
}
