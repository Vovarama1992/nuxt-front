import { defineNuxtPlugin } from '#app'
import repo from './repo';

import './types';

import { base } from '#api-options';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('api', repo(base));
})
