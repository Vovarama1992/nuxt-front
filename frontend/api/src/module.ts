import { defineNuxtModule, addPlugin, createResolver, addTemplate, addImports } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  base: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '3hundred-api',
    configKey: 'api',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    base: 'https://api.3hundred.ru/'
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.alias['#api-options'] = addTemplate({
      filename: 'api-options.mjs',
      getContents: () => Object.entries(options).map(([key, value]) =>
        `export const ${key} = ${JSON.stringify(value, null, 2)}
      `).join('\n'),
    }).dst

    addImports({
      name: 'useCDN',
      as: 'useCDN',
      from: resolver.resolve('./runtime/composables')
    });

    addPlugin(resolver.resolve('./runtime/plugin'), {});
  },
})
