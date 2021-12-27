import _ from 'lodash'
import type { PlatformEnvData, ModelsAPI } from '@wix/thunderbolt-symbols'
import type { SsrSdkHandlers } from '../../ssr/types'

export const SsrCacheHintsManager = ({ platformEnvData, modelsApi, handlers }: { platformEnvData: PlatformEnvData; modelsApi: ModelsAPI; handlers: SsrSdkHandlers }) => {
	return {
		setSsrCacheHints: () => {
			if (!process.env.browser && platformEnvData.bi.pageData.pageNumber === 1) {
				const platformControllersOnPage = _.mapValues(modelsApi.getApplications(), (controllers) => _(controllers).mapKeys('controllerType').keys().value())
				handlers.ssr.setSsrCacheHints({ platformControllersOnPage })
			}
		},
	}
}
