class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.darkModeBtn = new DarkModeBtn({
      $target
    })

    this.searchInput = new SearchInput({
      $target,
      onSearch: async keyword => {
        this.setState({
          data: null,
          isLoading: true,
          isInit: false
        })
        const { data } = await api.fetchCats(keyword);
        this.setState({
          data,
          isLoading: false,
        })
      },

      onSearchRandom: async () => {
        this.setState({
          data: null,
          isLoading: true,
          isInit: false
        })
        const { data } = await api.fetchCatRandoms();
        this.setState({
          data,
          isLoading: false,
        })
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async id => {
        const { data } = await api.fetchCatDetails(id);
        this.imageInfo.setState({
          visible: true,
          image: data
        });
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

}
