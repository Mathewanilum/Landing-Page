import { BILoggerFactory, commonBiLoggerFactory, frogUrlOverride } from '@wix/thunderbolt-commons'
import { PlatformEnvData, SessionServiceAPI } from '@wix/thunderbolt-symbols'

export const platformBiLoggerFactory = ({
	sessionService,
	biData,
	location,
	site,
	factory,
}: {
	sessionService: Pick<SessionServiceAPI, 'getVisitorId' | 'getSiteMemberId'>
	biData: PlatformEnvData['bi']
	location: PlatformEnvData['location']
	site: PlatformEnvData['site']
	factory: BILoggerFactory
}) => {
	const { viewerSessionId, requestId, initialTimestamp, initialRequestTimestamp, dc, is_rollout, isCached, rolloutData, pageData, viewerVersion, isjp, btype } = biData

	const biStore = {
		...frogUrlOverride(site.experiments, location.externalBaseUrl),
		msid: location.metaSiteId,
		viewerSessionId,
		requestId,
		initialTimestamp,
		initialRequestTimestamp,
		dc,
		is_rollout,
		isCached,
		rolloutData,
		pageData,
		viewerVersion,
		is_headless: isjp,
		is_headless_reason: btype,
	}

	const createBiLoggerFactory = ({ endpoint, factoryCreator, muteBi }: { endpoint?: string; factoryCreator: typeof commonBiLoggerFactory[keyof typeof commonBiLoggerFactory]; muteBi: boolean }) =>
		factoryCreator({
			biStore,
			sessionManager: sessionService,
			muteBi,
			endpoint,
			fetch: self.fetch,
			factory,
		}).updateDefaults({
			_siteOwnerId: biData.ownerId,
			_viewMode: biData.isPreview ? ('preview' as const) : ('site' as const),
		})

	return {
		/**
		 * Base BI logger factory, should be used as a basis for any BI logger in the Viewer Platform
		 *
		 * - Initialized with base defaults.
		 * - Any additional defaults should be added via specialized factories, like FedOps,
		 *   and only after making sure the BI schema supports them.
		 *
		 * Please use #bi-logger-support for any questions
		 */
		createBaseBiLoggerFactory: (endpoint?: string) =>
			createBiLoggerFactory({
				endpoint,
				factoryCreator: commonBiLoggerFactory.createBaseBiLoggerFactory,
				muteBi: biData.muteBi,
			}),
		/**
		 * BI logger factory for Viewer Platform FedOps
		 *
		 * - Initialized with base defaults + defaults which are supported by FedOps BI events
		 *   https://bo.wix.com/bi-catalog-webapp/#/sources/72
		 *
		 * - Any additional defaults should be added only after making sure the BI schema supports them
		 *
		 * Please use #bi-logger-support for any questions
		 */
		createBiLoggerFactoryForFedops: (muteBi = biData.muteFedops) =>
			createBiLoggerFactory({
				factoryCreator: commonBiLoggerFactory.createBiLoggerFactoryForFedops,
				muteBi,
			}),
	}
}
