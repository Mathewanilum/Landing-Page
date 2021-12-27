import { withDependencies } from '@wix/thunderbolt-ioc'
import { IAppDidLoadPageHandler } from '@wix/thunderbolt-symbols'
import type { IBackgroundScrub } from './types'
import { BackgroundScrubSymbol } from './symbols'

const backgroundScrubInitFactory = (backgroundScrub: IBackgroundScrub): IAppDidLoadPageHandler => {
	return {
		async appDidLoadPage() {
			await backgroundScrub.init()
		},
	}
}

export const BackgroundScrubInit = withDependencies([BackgroundScrubSymbol], backgroundScrubInitFactory)
