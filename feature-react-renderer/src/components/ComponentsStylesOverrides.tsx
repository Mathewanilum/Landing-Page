import React, { ComponentType, useContext, useEffect, useState } from 'react'
import _ from 'lodash'
import { IStylesStore } from '@wix/thunderbolt-symbols'
import { getFullId } from '@wix/thunderbolt-commons'
import { STYLE_OVERRIDES_ID } from '../symbols'
import Context from './AppContext'

const createCssProperty = (style: Record<string, string>) =>
	Object.entries(style).reduce((styleString, [propName, propValue]) => `${styleString}${propName}:${propValue};`, '')

const createCssRule = (stylesStore: IStylesStore, compId: string) => {
	const templateCompStyleOverrides = stylesStore.get(getFullId(compId))
	const compStyleOverrides = stylesStore.get(compId)
	const style = _.omitBy({ ...templateCompStyleOverrides, ...compStyleOverrides }, _.isNil) as Record<string, string>
	if (!Object.keys(style).length) {
		return
	}
	return `#${compId}{${createCssProperty(style)}}`
}

const calculateCss = (stylesStore: IStylesStore) =>
	Object.keys(stylesStore.getEntireStore())
		.map((compId) => createCssRule(stylesStore, compId))
		.filter((style) => style)
		.join(' ')

const ComponentsStylesOverrides: ComponentType = () => {
	const { styles: stylesStore } = useContext(Context)

	const [css, setCss] = useState(() => calculateCss(stylesStore))
	useEffect(() => {
		stylesStore.subscribeToChanges(() => {
			setCss(calculateCss(stylesStore))
		})
	}, [stylesStore])
	// TODO - sanitize css, e.g. background-image: url(javascript:alert('Injected'));
	return css ? <style id={STYLE_OVERRIDES_ID} dangerouslySetInnerHTML={{ __html: css }} /> : null
}

export default ComponentsStylesOverrides
