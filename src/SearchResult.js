class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;
  isInit = true;
  isLoading = false;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    let lastData = localStorage.getItem('lastData');
    if(!!lastData) {
      this.data = JSON.parse(lastData);
      this.isInit = false;
      this.isLoading = false;
      this.render();
    }

    // 이벤트 위임(Event Delegation)
    this.$searchResult.addEventListener("click", (e) => {
      const { tagName } = e.target;
      if(tagName === 'IMG') {
        this.onClick(e.target.dataset.id);
      }
    });
    this.render();
  }

  setState(nextData) {
    this.isInit = nextData.isInit;
    this.data = nextData.data;
    this.isLoading = nextData.isLoading;
    localStorage.setItem('lastData', JSON.stringify(nextData.data));
    this.render();
  }

  render() {
    if (this.isInit) {
      this.$searchResult.innerHTML = '';
    } else {
      if (this.isLoading && this.data === null) {
        this.$searchResult.innerHTML = `
          <h1>잠시만 기다려 주세요.....!</h1>
        `;

      } else if (!this.isLoading) {
        if (!!this.data && this.data.length === 0) {
          this.$searchResult.innerHTML = `
          <h1>검색 결과가 없습니다.....!</h1>
        `;
        } else if(!!this.data) {
          this.$searchResult.innerHTML = this.data
            .map(
              cat => `
                <li class="item" title=${cat.name}>
                  <img data-id=${cat.id} data-src=${cat.url} alt=${cat.name} />
                </li>
              `
            )
            .join("");

          // IntersectionObserver의 options를 설정합니다.
          const options = {
            root: null,
            // 타겟 이미지 접근 전 이미지를 불러오기 위해 rootMargin을 설정했습니다.
            rootMargin: '0px 0px 30px 0px',
            threshold: 0
          }

          // IntersectionObserver 를 등록한다.
          const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              // 관찰 대상이 viewport 안에 들어온 경우 image 로드
              if (entry.isIntersecting) {
                // data-src 정보를 타켓의 src 속성에 설정
                entry.target.src = entry.target.dataset.src;
                // 이미지를 불러왔다면 타켓 엘리먼트에 대한 관찰을 멈춘다.
                observer.unobserve(entry.target);
              }
            })
          }, options)

          // 관찰할 대상을 선언하고, 해당 속성을 관찰시킨다.
          const images = document.querySelectorAll('.item img');
          images.forEach((el) => {
            io.observe(el);
          })
          
        }
      }
    }
  }
}
