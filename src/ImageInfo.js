class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);
    this.data = data;

    this.render();

    $imageInfo.addEventListener("click", e => {
      let className = e.target.className;
      if (className === 'ImageInfo' || className === 'close') {
        this.data.visible = false;
        this.render();
      }
    });
    document.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
        this.data.visible = false;
        this.render();
      }
    })
  }

  fadeIn(el) {
    el.style.opacity = 0;
    el.style.display = "block";
    (function fade() {
      var val = parseFloat(el.style.opacity);
      if (!((val += .1) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  };

  fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
      if ((el.style.opacity -= .1) < 0) {
        el.style.display = "none";
      } else {
        requestAnimationFrame(fade);
      }
    })();
  };

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;
      this.$imageInfo.innerHTML = `
          <div class="content-wrapper">
            <div class="title">
              <span>${name}</span>
              <div class="close">x</div>
            </div>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <div>성격: ${temperament}</div>
              <div>태생: ${origin}</div>
            </div>
          </div>`;
      this.fadeIn(this.$imageInfo);
      // this.$imageInfo.style.display = "block";
    } else {
      this.fadeOut(this.$imageInfo);
      // this.$imageInfo.style.display = "none";
    }
  }
}
