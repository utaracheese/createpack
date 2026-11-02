/* ================= 4. UNDO / REDO HISTORY ================= */
function saveHistory() {
    const snap = JSON.stringify({
        layers: state.layers.map(l => ({ ...l, imgSrc: l.img.src })),
        guiLayerIndex: state.guiLayerIndex,
        selectedLayerIndex: state.selectedLayerIndex,
        guiScale: state.guiScale,
        guiWidth: state.guiWidth,
        guiHeight: state.guiHeight
    });
    lockFrame: state.lockFrame,
    state.history = state.history.slice(0, state.historyIndex + 1);
    state.history.push(snap);
    state.historyIndex = state.history.length - 1;
}
function undo() {
    if (state.historyIndex > 0) {
        state.historyIndex--;
        restoreHistory(state.history[state.historyIndex]);
    }
}

function redo() {
    if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        restoreHistory(state.history[state.historyIndex]);
    }
}

function restoreHistory(str) {
    const data = JSON.parse(str);
    state.guiLayerIndex = data.guiLayerIndex;
    state.selectedLayerIndex = data.selectedLayerIndex;
    if (data.lockFrame !== undefined) {
    state.lockFrame = data.lockFrame;
    const chk = document.getElementById('prop-lock-frame');
    if (chk) {
        chk.checked = state.lockFrame;
        const group = chk.closest('.lock-frame-group');
        if (group) group.classList.toggle('active', state.lockFrame);
        const customDims = document.getElementById('custom-frame-dims');
        if (customDims) customDims.style.display = state.lockFrame ? 'flex' : 'none';
    }
}
    if (data.guiScale) {
        state.guiScale = data.guiScale;
        state.guiWidth = data.guiWidth || (state.baseGuiWidth * state.guiScale);
        state.guiHeight = data.guiHeight || (state.baseGuiHeight * state.guiScale);
        if (typeof updateGuiScaleUI === 'function') updateGuiScaleUI();
    }

    state.layers = [];

    let loaded = 0;
    if (data.layers.length === 0) {
        renderLayersList(); updateProperties(); requestRender(); return;
    }

    data.layers.forEach((l, idx) => {
        const img = new Image();
        img.onload = () => {
            state.layers[idx] = { ...l, img };
            loaded++;
            if (loaded === data.layers.length) {
                renderLayersList(); updateProperties(); requestRender();
            }
        };
        img.src = l.imgSrc;
    });
}