class DarkModeBtn {
    constructor({ $target }) {
        const $BtnWrap = document.createElement('div');
        $BtnWrap.id = 'DarkModeBtn';
        const $Label = document.createElement('label');
        $Label.innerHTML = '다크모드'
        const $DarkModeBtn = document.createElement('input');
        $DarkModeBtn.type = 'checkbox';
        $DarkModeBtn.checked = window.matchMedia("(prefers-color-scheme:dark)").matches;
        $DarkModeBtn.addEventListener('click', e => {
            let checked = e.target.checked;
            document.body.classList.remove(checked ? 'light' : 'dark');
            document.body.classList.add(checked ? 'dark': 'light');
        })
        
        $BtnWrap.appendChild($DarkModeBtn);
        $BtnWrap.appendChild($Label);
        $target.appendChild($BtnWrap);
    }
}