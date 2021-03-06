import {
    getReactHOTComposeFunction
} from '../presets';
var componentPanelsPath = '{,*/}%ComponentName%/editor/panels';
export var editorBundlesConfig = {
    parts: true,
    components: true,
    host: true,
};
var panelModelWithHOTPreset = getReactHOTComposeFunction({
    internalPart: 'component',
});
export var editorConventions = {
    patterns: [{
            part: 'settingsPanel',
            path: componentPanelsPath + "/settings/%ComponentName%.settingsPanel.tsx",
            compose: [panelModelWithHOTPreset],
        },
        {
            part: 'layoutPanel',
            path: componentPanelsPath + "/layout/%ComponentName%.layoutPanel.tsx",
            compose: [panelModelWithHOTPreset],
        },
        {
            part: 'managePanel',
            path: componentPanelsPath + "/manage/%ComponentName%.managePanel.tsx",
            compose: [panelModelWithHOTPreset],
        },
        {
            part: 'backgroundPanel',
            path: componentPanelsPath + "/background/%ComponentName%.backgroundPanel.tsx",
        },
        {
            part: 'stylablePanel',
            path: componentPanelsPath + "/stylable/%ComponentName%.stylablePanel.ts",
        },
        {
            part: 'addPanel',
            path: '{,*/}%ComponentName%/editor/%ComponentName%.addPanel.ts',
        },
        {
            part: 'gfpp',
            path: '{,*/}%ComponentName%/editor/%ComponentName%.gfpp.ts',
        },
        {
            part: 'metadata',
            path: '{,*/}%ComponentName%/editor/%ComponentName%.editorMetadata.ts',
        },
        {
            part: 'translations',
            path: '{,*/}%ComponentName%/editor/%ComponentName%.translations.ts',
        },
    ],
};
//# sourceMappingURL=editor.js.map