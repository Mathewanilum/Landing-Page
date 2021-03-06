import _ from 'lodash'
import 'regenerator-runtime/runtime' // dbsm expects regeneratorRuntime to be defined :/
import type { ScriptCache } from './types'
import { fetchEval } from './fetchEval'
import type { ModuleLoader } from '@wix/thunderbolt-symbols'

declare let self: DedicatedWorkerGlobalScope & {
	define?: ((nameOrDependencies: string | Array<string>, dependenciesOrFactory: Array<string> | Function, factory?: Function) => void) & { amd?: boolean }
}

export default function ({ scriptsCache }: { scriptsCache: ScriptCache }): ModuleLoader {
	return {
		loadModule: async (url) => {
			if (scriptsCache[url]) {
				return scriptsCache[url]()
			}

			const modulesToInjectToApp: any = {
				lodash: _,
				_,
				'wix-data': { default: { dsn: 'https://b58591105c1c42be95f1e7a3d5b3755e@sentry.io/286440' } },
			}

			let moduleFactory = () => null
			let moduleInstance = null

			const defineAmdSupportGlobals = () => {
				self.define = (nameOrDependencies: string | Array<string>, dependenciesOrFactory: Array<string> | Function, factory: Function | undefined) => {
					const isNamedDefine = _.isString(nameOrDependencies)
					// const moduleName = isNamedDefine ? args[0] : null
					const moduleDependencies = ((isNamedDefine ? dependenciesOrFactory : nameOrDependencies) || []) as Array<string>
					const amdModuleFactory = (isNamedDefine ? factory : dependenciesOrFactory) as Function

					moduleFactory = () => amdModuleFactory && amdModuleFactory(...moduleDependencies.map((d) => modulesToInjectToApp[d]))
					moduleInstance = moduleFactory()
				}

				self.define.amd = true
			}

			// until we require scripts to be bundled as named modules we can not make the following step async
			// https://requirejs.org/docs/whyamd.html#namedmodules
			// defineAmdSupportGlobals function is required because scripts are not bundled as named modules so they override the previously set define function
			// TODO PLAT-1018 consider fetch-eval in order to parallelize network and cpu
			try {
				await fetchEval(url, defineAmdSupportGlobals)
			} catch {
				await fetchEval(url, defineAmdSupportGlobals) // retry
			} finally {
				delete self.define
			}

			scriptsCache[url] = moduleFactory

			return moduleInstance
		},
	}
}
