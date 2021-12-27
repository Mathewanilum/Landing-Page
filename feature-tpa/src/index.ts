import type { ContainerModuleLoader } from '@wix/thunderbolt-ioc'
import { LifeCycle, TpaHandlerProviderSymbol, WixCodeSdkHandlersProviderSym } from '@wix/thunderbolt-symbols'
import { TpaHandlersManager } from './tpaHandlersManager'
import { TpaBroadcastManager } from './tpaBroadcastManager'
import {
	TpaModalSymbol,
	TpaEventsListenerManagerSymbol,
	TpaPopupSymbol,
	TpaPopupApiSymbol,
	TpaFullScreenModeSymbol,
	TpaSymbol,
	TpaComponentApiSymbol,
	IFrameStartedLoadingReporterSymbol,
	SiteMapSymbol,
	name,
} from './symbols'
import { handlers } from './handlers'
import { TpaEventsListenerManager } from './eventsListenerManager'
import { TpaPopupFactory } from './tpaPopup'
import { TpaPopupApiFactory } from './tpaPopupApi'
import { PublicApiTPAHandler } from './publicApiTPAHandler'
import { TpaModal } from './tpaModal'
import { SiteScrollDispatcher } from './siteScrollDispatch'
import { TpaFullScreenMode } from './tpaFullScreenMode'
import { tpaCommonConfigUpdater } from './tpaCommonConfigUpdater'
import { TpaHandlersManagerSymbol } from 'feature-tpa-commons'
import { TpaPageNavigationDispatcher } from './TpaPageNavigationDispatcher'
import { Tpa } from './tpa'
import { TpaStateManager } from './tpaStateManager'
import { UrlChangeHandlerForPage } from 'feature-router'
import { TpaCurrentCurrencyManager } from './tpaCurrentCurrencyManager'
import { TpaComponentApi } from './tpaComponentApi'
import { ComponentWillMountSymbol } from 'feature-components'
import { TpaComponentWillMount } from './tpaComponentWillMount'
import { IFrameStartedLoadingReporter } from './iframeStartedLoadingReporter'
import { SiteMap } from './siteMap'

export const page: ContainerModuleLoader = (bind) => {
	bind(TpaComponentApiSymbol).to(TpaComponentApi)
	bind(IFrameStartedLoadingReporterSymbol).to(IFrameStartedLoadingReporter)
	bind(LifeCycle.PageWillMountHandler, TpaSymbol).to(Tpa)
	bind(ComponentWillMountSymbol).to(TpaComponentWillMount)
	bind(TpaHandlersManagerSymbol).to(TpaHandlersManager)
	bind(TpaHandlerProviderSymbol, WixCodeSdkHandlersProviderSym, LifeCycle.PageWillUnmountHandler).to(
		PublicApiTPAHandler
	)
	bind(TpaEventsListenerManagerSymbol).to(TpaEventsListenerManager)
	bind(LifeCycle.AppDidLoadPageHandler).to(TpaPageNavigationDispatcher)
	bind(TpaPopupApiSymbol).to(TpaPopupApiFactory)
	bind(LifeCycle.PageDidMountHandler, LifeCycle.PageDidUnmountHandler, TpaPopupSymbol).to(TpaPopupFactory)
	bind(SiteMapSymbol).to(SiteMap)
	handlers.forEach((factory) => {
		// TODO fetch and bind only handlers we need https://jira.wixpress.com/browse/PLAT-715
		bind(TpaHandlerProviderSymbol).to(factory)
	})
	bind(LifeCycle.PageDidMountHandler, LifeCycle.PageDidUnmountHandler).to(TpaBroadcastManager)
	bind(LifeCycle.PageDidMountHandler, TpaModalSymbol).to(TpaModal)
	bind(LifeCycle.PageWillMountHandler).to(SiteScrollDispatcher)
	bind(TpaFullScreenModeSymbol).to(TpaFullScreenMode)
	bind(LifeCycle.PageWillMountHandler).to(tpaCommonConfigUpdater)
	bind(UrlChangeHandlerForPage).to(TpaStateManager)
	bind(UrlChangeHandlerForPage).to(TpaCurrentCurrencyManager)
}

export type {
	ITpaPopup,
	TpaPopupOrigin,
	TpaPopupPlacement,
	OpenModalOptions,
	BaseResponse,
	ITpaModal,
	OpenPopupOptions,
	ITpaFullScreenMode,
	ITPAEventsListenerManager,
	ISiteMapDs,
	TpaPageConfig,
	ITpa,
	TpaFeatureState,
} from './types'
export { TpaPopupSymbol, TpaEventsListenerManagerSymbol }
export { TpaModalSymbol, TpaSymbol }
export { TpaFullScreenModeSymbol }
export { SiteMapSymbol, name }
