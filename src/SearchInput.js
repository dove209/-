const TEMPLATE = '<input type="text">';

class SearchInput {
  lastKeyword = [];
  $lastKeywords = null;
  constructor({ $target, onSearch, onSearchRandom }) {
    const $searchInputWrap = document.createElement('div');
    this.$lastKeywords = document.createElement('ul');
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    this.$searchInput.autofocus = true;
    $searchInputWrap.className = "searchInputWrap";
    this.$lastKeywords.className = 'lastKeywords';
    $searchInput.className = "SearchInput";
    $searchInputWrap.appendChild($searchInput);
    const $randomSearchBtn =  document.createElement('button');
    $randomSearchBtn.className = 'randomBtn';
    $randomSearchBtn.innerHTML = '랜덤';
    $searchInputWrap.appendChild($randomSearchBtn);
    $searchInputWrap.appendChild(this.$lastKeywords);

    $target.appendChild($searchInputWrap);

    $searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        if(!!e.target.value) {
          onSearch(e.target.value);
          this.lastKeyword.unshift(e.target.value)
          this.render();
        } else {
          alert('고양이 이름을 입력해 주세요~')
        }
      }
    });

    $searchInput.addEventListener('click', e => {
      if(e.target.value.length > 0) {
        e.target.value = '';
      }
    })

    $randomSearchBtn.addEventListener('click', e => {
      onSearchRandom()
    })

    this.onSearch = onSearch;
    this.render();
  }

  render() {

    this.$lastKeywords.innerHTML = this.lastKeyword
    .map((keyword, idx) => {
      if(idx < 5) {
        return`
        <li class="item">
            ${keyword}
          </li>
        `}
      }
    )
    .join("");
    this.$lastKeywords.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onSearch(this.lastKeyword[index])
      });
    });
  }
}
