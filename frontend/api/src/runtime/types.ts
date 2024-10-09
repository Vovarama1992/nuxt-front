import type { Api } from './repo/Api';

interface PluginProviders {
  $api: Api<string>;
}

declare module '#app' {
  interface NuxtApp extends PluginProviders {}
}