/* ================= 7. APP INITIALIZATION & NAVIGATION ================= */
window.addEventListener('DOMContentLoaded', () => {
    initWelcomeModal();
    initFolderTree();
    initViewSwitching();
    initCanvasEvents();
    initPropertyBindings();
    initPackBuilderFull();

    // Chọn GUI mặc định đầu tiên: Anvil GUI
    const firstGui = { 
        id: 'anvil', 
        name: 'anvil.png', 
        path: 'assets/minecraft/textures/gui/container/anvil.png', 
        folder: 'textures/gui/container' 
    };
    selectGui(firstGui, firstGui.folder);
    saveHistory();
});

function initWelcomeModal() {
    const modal = document.getElementById('welcome-modal');
    const startBtn = document.getElementById('start-app-btn');
    if (startBtn && modal) {
        startBtn.onclick = () => modal.style.display = 'none';
    }
}

function initViewSwitching() {
    const btnGui = document.getElementById('switch-gui-btn');
    const btnBuilder = document.getElementById('switch-builder-btn');
    const viewGui = document.getElementById('gui-editor-view');
    const viewBuilder = document.getElementById('pack-builder-view');
    const guiToolbar = document.getElementById('gui-toolbar-actions');

    if (btnGui) {
        btnGui.onclick = () => {
            btnGui.classList.add('active');
            btnBuilder.classList.remove('active');
            viewGui.classList.add('active');
            viewBuilder.classList.remove('active');
            guiToolbar.style.display = 'flex';
            fitCanvasToScreen();
            requestRender();
        };
    }

    if (btnBuilder) {
        btnBuilder.onclick = () => {
            btnBuilder.classList.add('active');
            btnGui.classList.remove('active');
            viewBuilder.classList.add('active');
            viewGui.classList.remove('active');
            guiToolbar.style.display = 'none';
            renderAllBuilderGrids();
        };
    }

    const navBtns = document.querySelectorAll('.builder-nav-btn');
    navBtns.forEach(btn => {
        btn.onclick = () => {
            navBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.builder-tab').forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            const targetTab = document.getElementById(`tab-${btn.dataset.tab}`);
            if (targetTab) targetTab.classList.add('active');
        };
    });
}