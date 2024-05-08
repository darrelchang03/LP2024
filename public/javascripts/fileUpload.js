FilePond.registerPlugin(FilePondPluginFileEncode);
FilePond.registerPlugin(FilePondPluginImagePreview);
FilePond.registerPlugin(FilePondPluginImageResize);

FilePond.setOptions({
    stylePanelAspectRatio: '1 : 1.5',
    maxFiles: 1,
    imageResizeTargetWidth: 100,
    imageResizeTargetHeight: 150,
    imageResizeMode: 'contain'
})

// Parse all file inputs and turn into fileponds
FilePond.parse(document.body)