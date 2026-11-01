/* ================= 2. GLOBAL STATE ================= */
/* ================= 2. GLOBAL STATE ================= */
const state = {
    currentGui: null,
    guiImage: new Image(),
    guiLoaded: false,

    // Kích thước chuẩn mặc định (Minecraft vanilla = 256x256)
    baseGuiWidth: 256,
    baseGuiHeight: 256,
    guiScale: 1, // Hệ số nhân tỉ lệ (x1, x2, x7,...)
    autoScaleByBg: true, // Tự động scale theo ảnh nền

    guiWidth: 256,
    guiHeight: 256,

    layers: [],
    guiLayerIndex: 0,
    selectedLayerIndex: null,

    zoom: 1, 
    panX: 0, 
    panY: 0,
    isDragging: false, 
    isResizing: false, 
    isRotating: false, 
    isPanning: false,
    activeHandle: null, 
    dragStart: { x: 0, y: 0 }, 
    transformStart: {},

    history: [], 
    historyIndex: -1,

    packIconDataUrl: null,
    builderAssets: {
        items: [],
        blocks: [],
        guisContainer: [],
        guisRoot: [],
        skybox: []
    }
};