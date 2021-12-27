import { withDependencies, named } from '@wix/thunderbolt-ioc'
import {
	PageFeatureConfigSymbol,
	MasterPageFeatureConfigSymbol,
	BrowserWindowSymbol,
	Props,
	BrowserWindow,
	IPropsStore,
	IPageDidMountHandler,
	IPageWillUnmountHandler,
	pageIdSym,
} from '@wix/thunderbolt-symbols'
import type { PageAnchorsPageConfig, PageAnchorsSiteConfig } from './types'
import { name } from './symbols'
import { createAnchorObserver } from './pageAnchorsUtils'

/**
 * This is your feature.
 * You can get your configuration written in site-assets and viewer-model injected into your feature
 */
const pageAnchorsFactory = (
	pageFeatureConfig: PageAnchorsPageConfig,
	siteFeatureConfig: PageAnchorsSiteConfig,
	window: BrowserWindow,
	propsStore: IPropsStore,
	pageId: string
): IPageDidMountHandler & IPageWillUnmountHandler => {
	const pageAnchorsObservers = pageFeatureConfig.pageAnchorsObservers.concat(siteFeatureConfig.pageAnchorsObservers)
	const activeAnchorObservers = pageFeatureConfig.activeAnchorObservers.concat(
		siteFeatureConfig.activeAnchorObservers
	)
	const observeAnchors = createAnchorObserver(
		pageAnchorsObservers,
		activeAnchorObservers,
		pageFeatureConfig,
		window,
		propsStore,
		pageId,
		siteFeatureConfig.siteOffset
	)
	let observersCleanup: () => void | undefined

	return {
		pageDidMount(): void {
			if (pageAnchorsObservers.length || activeAnchorObservers.length) {
				observersCleanup = observeAnchors()
			}
		},
		pageWillUnmount(): void {
			if (observersCleanup) {
				observersCleanup()
			}
		},
	}
}

export const PageAnchors = withDependencies(
	[
		named(PageFeatureConfigSymbol, name),
		named(MasterPageFeatureConfigSymbol, name),
		BrowserWindowSymbol,
		Props,
		pageIdSym,
	],
	pageAnchorsFactory
)
